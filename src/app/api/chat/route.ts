import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';
import { buildSiteKnowledge, SYSTEM_PROMPT } from '../../../lib/siteKnowledge';

// The concierge reads live site data at request time, so never cache this route.
export const dynamic = 'force-dynamic';

const MODEL = 'gemini-2.5-flash';
const MAX_TURNS = 12;
const MAX_CHARS = 1500;
const RETRY_DELAYS_MS = [400, 1200];
/** Upstream states that clear on their own: overloaded, rate limited, internal blip. */
const TRANSIENT_STATUSES = new Set([429, 500, 502, 503, 504]);

interface IncomingMessage {
  role: 'user' | 'model';
  text: string;
}

export async function POST(req: NextRequest) {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      {
        success: false,
        error: 'The concierge is not configured. Set GEMINI_API_KEY in .env.local.',
      },
      { status: 503 }
    );
  }

  let messages: IncomingMessage[];
  try {
    const body = await req.json();
    messages = Array.isArray(body?.messages) ? body.messages : [];
  } catch {
    return NextResponse.json({ success: false, error: 'Malformed request.' }, { status: 400 });
  }

  // Keep only well-formed turns, cap length, and keep the tail of the conversation.
  const history = messages
    .filter(
      (m): m is IncomingMessage =>
        !!m && (m.role === 'user' || m.role === 'model') && typeof m.text === 'string' && m.text.trim().length > 0
    )
    .slice(-MAX_TURNS)
    .map((m) => ({ role: m.role, parts: [{ text: m.text.slice(0, MAX_CHARS) }] }));

  if (history.length === 0 || history[history.length - 1].role !== 'user') {
    return NextResponse.json(
      { success: false, error: 'A visitor message is required.' },
      { status: 400 }
    );
  }

  try {
    const ai = new GoogleGenAI({ apiKey });

    const response = await withRetry(() =>
      ai.models.generateContent({
        model: MODEL,
        contents: history,
        config: {
          systemInstruction: `${SYSTEM_PROMPT}\n\n=== SITE DATA ===\n${buildSiteKnowledge()}`,
          temperature: 0.4,
          maxOutputTokens: 800,
        },
      })
    );

    const reply = response.text?.trim();

    if (!reply) {
      // Model returned nothing usable (a safety stop, or an empty candidate).
      return NextResponse.json({
        success: true,
        reply:
          'I am not able to answer that one from our listings. Our trade desk can help you directly on WhatsApp.',
        handoff: true,
      });
    }

    return NextResponse.json({ success: true, reply, handoff: looksLikeHandoff(reply) });
  } catch (err) {
    console.error('[concierge] Gemini request failed:', err);
    return NextResponse.json(
      {
        success: false,
        error: 'The concierge is unavailable right now. Please message our trade desk on WhatsApp.',
      },
      { status: 502 }
    );
  }
}

/**
 * Retries the model call through transient upstream states (Gemini returns 503
 * "high demand" often enough that a single blip should not reach the visitor).
 * Anything else — a bad key, a rejected request — throws on the first attempt.
 */
async function withRetry<T>(call: () => Promise<T>): Promise<T> {
  let lastErr: unknown;

  for (let attempt = 0; attempt <= RETRY_DELAYS_MS.length; attempt++) {
    try {
      return await call();
    } catch (err) {
      lastErr = err;
      const status = (err as { status?: number })?.status;
      if (!status || !TRANSIENT_STATUSES.has(status) || attempt === RETRY_DELAYS_MS.length) {
        throw err;
      }
      await new Promise((r) => setTimeout(r, RETRY_DELAYS_MS[attempt]));
    }
  }

  throw lastErr;
}

/** Surfaces the WhatsApp button when the reply points the visitor at the desk. */
function looksLikeHandoff(reply: string): boolean {
  const t = reply.toLowerCase();
  return (
    t.includes('whatsapp') ||
    t.includes('trade desk') ||
    t.includes('not in the current') ||
    t.includes('not currently') ||
    t.includes("don't have") ||
    t.includes('do not have') ||
    t.includes('not listed')
  );
}
