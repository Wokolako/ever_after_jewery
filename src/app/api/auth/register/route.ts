import { NextRequest, NextResponse } from 'next/server';
import { db, UserData } from '../../../../../backend/data/db';
import { hashPassword } from '../../../../../backend/auth/password';
import { generateToken } from '../../../../../backend/auth/jwt';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password, clientName, companyName, phone, address } = body;

    if (!email || !password || !clientName || !companyName) {
      return NextResponse.json(
        { success: false, error: 'Email, password, client name, and company name are required.' },
        { status: 400 }
      );
    }

    const users = db.getUsers();
    const existing = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (existing) {
      return NextResponse.json(
        { success: false, error: 'An account with this email address already exists.' },
        { status: 409 }
      );
    }

    const hashedPassword = await hashPassword(password);
    const generatedMemberId = `YM-TRADE-${Math.floor(1000 + Math.random() * 9000)}`;

    const newUser: UserData = {
      id: `usr-${Date.now()}`,
      email: email.trim().toLowerCase(),
      passwordHash: hashedPassword,
      clientName: clientName.trim(),
      companyName: companyName.trim(),
      memberId: generatedMemberId,
      accountRole: 'trade_partner',
      tier: 'Registered Trade Partner',
      creditLineUSD: 250000,
      phone: phone || '',
      address: address || '',
      isVerifiedTrade: true,
      createdAt: new Date().toISOString(),
      savedStoneIds: [],
      preferences: {
        notifyDrops: true,
        notifyMemos: true
      }
    };

    users.push(newUser);
    db.saveUsers(users);

    const token = generateToken({
      userId: newUser.id,
      email: newUser.email,
      memberId: newUser.memberId,
      accountRole: newUser.accountRole,
      companyName: newUser.companyName
    });

    const { passwordHash: _, ...safeUser } = newUser;

    return NextResponse.json(
      {
        success: true,
        message: 'Trade partner registration approved.',
        token,
        user: safeUser
      },
      { status: 201 }
    );
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: 'Registration failed.', details: err?.message },
      { status: 500 }
    );
  }
}
