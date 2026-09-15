import { Router } from 'express';
import { memoController } from '../controllers/memoController';
import { authenticateToken } from '../auth/authMiddleware';

const router = Router();

// Memo consignments are exclusive to verified trade partner members
router.use(authenticateToken);

router.get('/', memoController.getMemberMemos);
router.post('/request', memoController.requestMemo);
router.patch('/:id/status', memoController.updateMemoStatus);

export default router;
