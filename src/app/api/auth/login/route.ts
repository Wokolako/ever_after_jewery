import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../../../../backend/data/db';
import { comparePassword } from '../../../../../backend/auth/password';
import { generateToken } from '../../../../../backend/auth/jwt';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: 'Email and password are required.' },
        { status: 400 }
      );
    }

    const users = db.getUsers();
    const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase());

    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Invalid credentials. No trade account found for this email.' },
        { status: 401 }
      );
    }

    const isMatch = await comparePassword(password, user.passwordHash);
    if (!isMatch) {
      return NextResponse.json(
        { success: false, error: 'Invalid email or password.' },
        { status: 401 }
      );
    }

    const token = generateToken({
      userId: user.id,
      email: user.email,
      memberId: user.memberId,
      accountRole: user.accountRole,
      companyName: user.companyName
    });

    const { passwordHash: _, ...safeUser } = user;

    return NextResponse.json({
      success: true,
      message: 'Authentication successful. Welcome to the Somuchaura Trade Vault.',
      token,
      user: safeUser
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: 'Authentication failed.', details: err?.message },
      { status: 500 }
    );
  }
}
