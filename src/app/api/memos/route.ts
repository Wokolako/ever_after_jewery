import { NextRequest, NextResponse } from 'next/server';
import { db, MemoData } from '../../../../backend/data/db';
import { extractBearerToken, verifyToken } from '../../../../backend/auth/jwt';

export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get('authorization') || undefined;
    const token = extractBearerToken(authHeader);
    const payload = token ? verifyToken(token) : null;

    const memos = db.getMemos();
    if (payload && payload.accountRole !== 'admin') {
      const userMemos = memos.filter(
        (m) => m.userId === payload.userId || m.memberId === payload.memberId
      );
      return NextResponse.json({ success: true, count: userMemos.length, data: userMemos });
    }

    return NextResponse.json({ success: true, count: memos.length, data: memos });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: 'Failed to retrieve memos.' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get('authorization') || undefined;
    const token = extractBearerToken(authHeader);
    const payload = token ? verifyToken(token) : null;

    const body = await req.json();
    const { stoneId, notes } = body;

    if (!stoneId) {
      return NextResponse.json(
        { success: false, error: 'Gemstone ID is required.' },
        { status: 400 }
      );
    }

    const stones = db.getGemstones();
    const stone = stones.find((s) => s.id === stoneId);

    if (!stone) {
      return NextResponse.json({ success: false, error: 'Gemstone not found.' }, { status: 404 });
    }

    const memoId = `MEMO-${Math.floor(8000 + Math.random() * 2000)}`;
    const trackingCode = `FER-${Math.floor(1000000 + Math.random() * 9000000)}-UK`;

    const newMemo: MemoData = {
      id: memoId,
      userId: payload?.userId || 'usr-atelier-01',
      memberId: payload?.memberId || 'YM-ATELIER-7741',
      companyName: payload?.companyName || 'Atelier Sterling & Co.',
      stoneId: stone.id,
      stoneName: stone.name,
      dateDispatched: new Date().toISOString().split('T')[0],
      daysRemaining: 14,
      courier: 'Ferrari Logistics (Armored Courier)',
      tracking: trackingCode,
      declaredValueUSD: stone.priceUSD,
      status: 'Consignment Approved - Dispatching',
      notes: notes || 'Inspection memo requested for client presentation.',
      createdAt: new Date().toISOString()
    };

    stone.status = 'On Memo';
    db.saveGemstones(stones);

    const memos = db.getMemos();
    memos.unshift(newMemo);
    db.saveMemos(memos);

    return NextResponse.json(
      {
        success: true,
        message: 'Memo consignment request confirmed. Armored logistics dispatched.',
        data: newMemo
      },
      { status: 201 }
    );
  } catch (err: any) {
    return NextResponse.json({ success: false, error: 'Failed to process memo request.' }, { status: 500 });
  }
}
