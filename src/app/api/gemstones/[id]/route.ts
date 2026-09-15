import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../../../../backend/data/db';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const stones = db.getGemstones();
    const stone = stones.find((s) => s.id === id);

    if (!stone) {
      return NextResponse.json(
        { success: false, error: `Gemstone '${id}' not found.` },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: stone });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: 'Failed to retrieve gemstone.' },
      { status: 500 }
    );
  }
}
