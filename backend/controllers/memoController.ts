import { Response } from 'express';
import { db, MemoData } from '../data/db';
import { AuthenticatedRequest } from '../auth/authMiddleware';

export const memoController = {
  getMemberMemos(req: AuthenticatedRequest, res: Response): void {
    try {
      const memos = db.getMemos();
      // If user is authenticated, filter by memberId or userId unless admin
      if (req.user && req.user.accountRole !== 'admin') {
        const userMemos = memos.filter(
          (m) => m.userId === req.user?.userId || m.memberId === req.user?.memberId
        );
        res.status(200).json({
          success: true,
          count: userMemos.length,
          data: userMemos
        });
        return;
      }

      res.status(200).json({
        success: true,
        count: memos.length,
        data: memos
      });
    } catch (err: any) {
      res.status(500).json({ success: false, error: 'Failed to retrieve memo consignments.' });
    }
  },

  requestMemo(req: AuthenticatedRequest, res: Response): void {
    try {
      const { stoneId, notes } = req.body;

      if (!stoneId) {
        res.status(400).json({
          success: false,
          error: 'Gemstone ID (stoneId) is required to issue a consignment memo.'
        });
        return;
      }

      const stones = db.getGemstones();
      const stone = stones.find((s) => s.id === stoneId);

      if (!stone) {
        res.status(404).json({ success: false, error: 'Gemstone not found in vault.' });
        return;
      }

      if (stone.status === 'On Memo') {
        res.status(409).json({
          success: false,
          error: 'This gemstone is currently on active memo with another trade atelier.'
        });
        return;
      }

      const memoId = `MEMO-${Math.floor(8000 + Math.random() * 2000)}`;
      const trackingCode = `FER-${Math.floor(1000000 + Math.random() * 9000000)}-UK`;

      const newMemo: MemoData = {
        id: memoId,
        userId: req.user?.userId || 'usr-atelier-01',
        memberId: req.user?.memberId || 'YM-ATELIER-7741',
        companyName: req.user?.companyName || 'Atelier Sterling & Co.',
        stoneId: stone.id,
        stoneName: stone.name,
        dateDispatched: new Date().toISOString().split('T')[0],
        daysRemaining: 14,
        courier: 'Ferrari Logistics (Armored Courier)',
        tracking: trackingCode,
        declaredValueUSD: stone.priceUSD,
        status: 'Consignment Approved - Dispatching',
        notes: notes || 'Inspection memo requested for client presentation.',
        createdAt: new Date().toISOString()
      };

      // Update stone status
      stone.status = 'On Memo';
      db.saveGemstones(stones);

      // Save memo
      const memos = db.getMemos();
      memos.unshift(newMemo);
      db.saveMemos(memos);

      res.status(201).json({
        success: true,
        message: 'Memo consignment request confirmed. Armored logistics dispatched.',
        data: newMemo
      });
    } catch (err: any) {
      res.status(500).json({ success: false, error: 'Failed to process memo request.' });
    }
  },

  updateMemoStatus(req: AuthenticatedRequest, res: Response): void {
    try {
      const { id } = req.params;
      const { status, notes } = req.body;

      if (!status) {
        res.status(400).json({ success: false, error: 'Status is required.' });
        return;
      }

      const memos = db.getMemos();
      const index = memos.findIndex((m) => m.id === id);

      if (index === -1) {
        res.status(404).json({ success: false, error: 'Memo not found.' });
        return;
      }

      memos[index].status = status;
      if (notes) memos[index].notes = notes;

      // If memo settled or returned, release stone
      if (status === 'Returned to Vault') {
        const stones = db.getGemstones();
        const stone = stones.find((s) => s.id === memos[index].stoneId);
        if (stone) {
          stone.status = 'In Vault';
          db.saveGemstones(stones);
        }
      }

      db.saveMemos(memos);

      res.status(200).json({
        success: true,
        message: `Memo ${id} updated to '${status}'.`,
        data: memos[index]
      });
    } catch (err: any) {
      res.status(500).json({ success: false, error: 'Failed to update memo status.' });
    }
  }
};
