import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../../../../backend/data/db';
import { extractBearerToken, verifyToken } from '../../../../../backend/auth/jwt';

export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get('authorization') || undefined;
    const token = extractBearerToken(authHeader);

    if (!token) {
      return NextResponse.json(
        { success: false, error: 'Authentication required. Bearer token missing.' },
        { status: 401 }
      );
    }

    const payload = verifyToken(token);
    if (!payload) {
      return NextResponse.json(
        { success: false, error: 'Invalid or expired authentication token.' },
        { status: 403 }
      );
    }

    const users = db.getUsers();
    const user = users.find((u) => u.id === payload.userId);

    if (!user) {
      return NextResponse.json(
        { success: false, error: 'User account not found.' },
        { status: 404 }
      );
    }

    const { passwordHash: _, ...safeUser } = user;
    return NextResponse.json({ success: true, user: safeUser });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: 'Failed to retrieve profile.' },
      { status: 500 }
    );
  }
}
