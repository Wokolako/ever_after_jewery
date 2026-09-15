import { Router } from 'express';
import { bookingController } from '../controllers/bookingController';
import { authenticateToken, requireRole } from '../auth/authMiddleware';

const router = Router();

// Public consultation booking endpoints
router.post('/', bookingController.createBooking);
router.get('/slots', bookingController.getAvailableSlots);
router.get('/:id', bookingController.getBookingById);
router.post('/:id/cancel', bookingController.cancelBooking);

// Protected trade desk inspection appointments
router.get('/', authenticateToken, bookingController.getBookings);

export default router;
