import { Router } from 'express';
import { authController } from '../controllers/authController';
import { authenticateToken } from '../auth/authMiddleware';

const router = Router();

// Public auth endpoints
router.post('/login', authController.login);
router.post('/register', authController.register);

// Protected auth endpoints
router.get('/me', authenticateToken, authController.getProfile);
router.put('/profile', authenticateToken, authController.updateProfile);

export default router;
