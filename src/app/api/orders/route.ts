import { NextRequest, NextResponse } from 'next/server';
import { db, OrderData } from '../../../../backend/data/db';
import { extractBearerToken, verifyToken } from '../../../../backend/auth/jwt';

export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get('authorization') || undefined;
    const token = extractBearerToken(authHeader);
    const payload = token ? verifyToken(token) : null;

    const orders = db.getOrders();
    if (payload && payload.accountRole !== 'admin') {
      const userOrders = orders.filter((o) => o.userId === payload.userId || o.email === payload.email);
      return NextResponse.json({ success: true, count: userOrders.length, data: userOrders });
    }

    return NextResponse.json({ success: true, count: orders.length, data: orders });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: 'Failed to retrieve orders.' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get('authorization') || undefined;
    const token = extractBearerToken(authHeader);
    const payload = token ? verifyToken(token) : null;

    const body = await req.json();
    const { items, clientName, companyName, email, paymentMethod, shippingService } = body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ success: false, error: 'Cart items array cannot be empty.' }, { status: 400 });
    }

    if (!clientName || !email) {
      return NextResponse.json({ success: false, error: 'Client name and email are required.' }, { status: 400 });
    }

    const totalUSD = items.reduce(
      (sum: number, item: any) => sum + (Number(item.priceUSD || 0) * Number(item.quantity || 1)),
      0
    );

    const orderId = `ORD-2026-${Math.floor(100 + Math.random() * 900)}`;
    const newOrder: OrderData = {
      id: orderId,
      userId: payload?.userId,
      memberId: payload?.memberId,
      clientName: String(clientName).trim(),
      companyName: (companyName || 'Independent Fine Jeweller').trim(),
      email: String(email).trim().toLowerCase(),
      items: items.map((it: any) => ({
        gemstoneId: it.gemstoneId || it.id,
        name: it.name,
        carat: Number(it.carat),
        priceUSD: Number(it.priceUSD),
        quantity: Number(it.quantity || 1)
      })),
      totalUSD,
      paymentMethod: paymentMethod || 'Wire Transfer (Escrow)',
      shippingService: shippingService || 'Ferrari Armored High-Value Courier',
      status: 'Settlement Escrow Awaiting Verification',
      createdAt: new Date().toISOString()
    };

    const orders = db.getOrders();
    orders.unshift(newOrder);
    db.saveOrders(orders);

    return NextResponse.json(
      {
        success: true,
        message: 'High-value acquisition order registered.',
        data: newOrder
      },
      { status: 201 }
    );
  } catch (err: any) {
    return NextResponse.json({ success: false, error: 'Failed to create order.' }, { status: 500 });
  }
}
