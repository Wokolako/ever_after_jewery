import { NextRequest, NextResponse } from 'next/server';
import { db, BookingData } from '../../../../backend/data/db';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get('email');
    let bookings = db.getBookings();

    if (email) {
      bookings = bookings.filter((b) => b.email.toLowerCase() === email.toLowerCase());
    }

    return NextResponse.json({ success: true, count: bookings.length, data: bookings });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: 'Failed to retrieve bookings.' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { serviceId, serviceTitle, date, time, clientName, companyName, email, phone, specificInquiry } = body;

    if (!serviceTitle || !date || !time || !clientName || !email) {
      return NextResponse.json(
        { success: false, error: 'Service title, appointment date, time, client name, and email are required.' },
        { status: 400 }
      );
    }

    const referenceNumber = `SA-VAULT-${Math.floor(1000 + Math.random() * 9000)}`;
    const newBooking: BookingData = {
      id: `BK-${Date.now()}`,
      serviceId: serviceId || 'vault-consultation',
      serviceTitle: serviceTitle.trim(),
      date: date.trim(),
      time: time.trim(),
      clientName: clientName.trim(),
      companyName: (companyName || 'Private Collector / Atelier').trim(),
      email: email.trim().toLowerCase(),
      phone: (phone || '').trim(),
      specificInquiry: (specificInquiry || '').trim(),
      status: 'Confirmed',
      referenceNumber,
      createdAt: new Date().toISOString()
    };

    const bookings = db.getBookings();
    bookings.unshift(newBooking);
    db.saveBookings(bookings);

    return NextResponse.json(
      {
        success: true,
        message: 'Consultation appointment scheduled and confirmed.',
        data: newBooking
      },
      { status: 201 }
    );
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: 'Failed to create booking.', details: err?.message },
      { status: 500 }
    );
  }
}
