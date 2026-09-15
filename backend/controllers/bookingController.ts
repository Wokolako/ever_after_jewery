import { Request, Response } from 'express';
import { db, BookingData } from '../data/db';

export const bookingController = {
  createBooking(req: Request, res: Response): void {
    try {
      const {
        serviceId,
        serviceTitle,
        date,
        time,
        clientName,
        companyName,
        email,
        phone,
        specificInquiry
      } = req.body;

      if (!serviceTitle || !date || !time || !clientName || !email) {
        res.status(400).json({
          success: false,
          error: 'Service title, appointment date, time, client name, and email are required.'
        });
        return;
      }

      const referenceNumber = `SA-VAULT-${Math.floor(1000 + Math.random() * 9000)}`;
      const newBooking: BookingData = {
        id: `BK-${Date.now()}`,
        serviceId: serviceId || 'vault-consultation',
        serviceTitle: serviceTitle.trim(),
        date: date.trim(),
        time: time.trim(),
        clientName: clientName.trim(),
        companyName: (companyName || 'Private Collector / Independent Atelier').trim(),
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

      res.status(201).json({
        success: true,
        message: 'Consultation appointment scheduled and confirmed.',
        data: newBooking
      });
    } catch (err: any) {
      res.status(500).json({
        success: false,
        error: 'Failed to create booking.',
        details: err?.message
      });
    }
  },

  getBookings(req: Request, res: Response): void {
    try {
      const { email, status } = req.query;
      let bookings = db.getBookings();

      if (email) {
        bookings = bookings.filter((b) => b.email.toLowerCase() === String(email).toLowerCase());
      }

      if (status) {
        bookings = bookings.filter((b) => b.status.toLowerCase() === String(status).toLowerCase());
      }

      res.status(200).json({
        success: true,
        count: bookings.length,
        data: bookings
      });
    } catch (err: any) {
      res.status(500).json({ success: false, error: 'Failed to retrieve bookings.' });
    }
  },

  getBookingById(req: Request, res: Response): void {
    try {
      const { id } = req.params;
      const bookings = db.getBookings();
      const booking = bookings.find((b) => b.id === id || b.referenceNumber === id);

      if (!booking) {
        res.status(404).json({ success: false, error: 'Booking appointment not found.' });
        return;
      }

      res.status(200).json({ success: true, data: booking });
    } catch (err: any) {
      res.status(500).json({ success: false, error: 'Failed to fetch booking.' });
    }
  },

  cancelBooking(req: Request, res: Response): void {
    try {
      const { id } = req.params;
      const bookings = db.getBookings();
      const index = bookings.findIndex((b) => b.id === id || b.referenceNumber === id);

      if (index === -1) {
        res.status(404).json({ success: false, error: 'Booking appointment not found.' });
        return;
      }

      bookings[index].status = 'Cancelled';
      db.saveBookings(bookings);

      res.status(200).json({
        success: true,
        message: 'Appointment cancelled successfully.',
        data: bookings[index]
      });
    } catch (err: any) {
      res.status(500).json({ success: false, error: 'Failed to cancel appointment.' });
    }
  },

  getAvailableSlots(req: Request, res: Response): void {
    try {
      const date = String(req.query.date || '2026-09-18');
      const standardSlots = [
        '10:00 AM BST',
        '11:30 AM BST',
        '02:00 PM BST',
        '03:30 PM BST',
        '05:00 PM BST'
      ];

      const bookings = db.getBookings();
      const bookedSlots = bookings
        .filter((b) => b.date === date && b.status !== 'Cancelled')
        .map((b) => b.time);

      const available = standardSlots.map((slot) => ({
        time: slot,
        isAvailable: !bookedSlots.includes(slot)
      }));

      res.status(200).json({
        success: true,
        date,
        slots: available
      });
    } catch (err: any) {
      res.status(500).json({ success: false, error: 'Failed to retrieve available slots.' });
    }
  }
};
