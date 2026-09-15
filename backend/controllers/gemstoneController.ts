import { Request, Response } from 'express';
import { db, GemstoneData } from '../data/db';

export const gemstoneController = {
  getAllGemstones(req: Request, res: Response): void {
    try {
      let stones = db.getGemstones();
      const { category, shape, minCarat, maxCarat, minPrice, maxPrice, status, search, featured } = req.query;

      if (category && category !== 'All') {
        stones = stones.filter((s) => s.category.toLowerCase() === String(category).toLowerCase());
      }

      if (shape) {
        stones = stones.filter((s) => s.shape.toLowerCase() === String(shape).toLowerCase());
      }

      if (minCarat) {
        stones = stones.filter((s) => s.carat >= parseFloat(String(minCarat)));
      }

      if (maxCarat) {
        stones = stones.filter((s) => s.carat <= parseFloat(String(maxCarat)));
      }

      if (minPrice) {
        stones = stones.filter((s) => s.priceUSD >= parseFloat(String(minPrice)));
      }

      if (maxPrice) {
        stones = stones.filter((s) => s.priceUSD <= parseFloat(String(maxPrice)));
      }

      if (status) {
        stones = stones.filter((s) => s.status.toLowerCase() === String(status).toLowerCase());
      }

      if (featured !== undefined) {
        const isFeatured = String(featured) === 'true';
        stones = stones.filter((s) => !!s.featured === isFeatured);
      }

      if (search) {
        const query = String(search).toLowerCase();
        stones = stones.filter((s) =>
          s.name.toLowerCase().includes(query) ||
          s.origin.toLowerCase().includes(query) ||
          s.color.toLowerCase().includes(query) ||
          s.clarity.toLowerCase().includes(query) ||
          s.certNumber.toLowerCase().includes(query) ||
          s.description.toLowerCase().includes(query)
        );
      }

      res.status(200).json({
        success: true,
        count: stones.length,
        data: stones
      });
    } catch (err: any) {
      res.status(500).json({
        success: false,
        error: 'Failed to retrieve gemstones.',
        details: err?.message
      });
    }
  },

  getGemstoneById(req: Request, res: Response): void {
    try {
      const { id } = req.params;
      const stones = db.getGemstones();
      const stone = stones.find((s) => s.id === id);

      if (!stone) {
        res.status(404).json({
          success: false,
          error: `Gemstone with id '${id}' not found in vault.`
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: stone
      });
    } catch (err: any) {
      res.status(500).json({
        success: false,
        error: 'Failed to retrieve gemstone details.',
        details: err?.message
      });
    }
  },

  getFeatured(req: Request, res: Response): void {
    try {
      const stones = db.getGemstones();
      const featured = stones.filter((s) => s.featured);

      res.status(200).json({
        success: true,
        count: featured.length,
        data: featured
      });
    } catch (err: any) {
      res.status(500).json({
        success: false,
        error: 'Failed to retrieve featured gemstones.'
      });
    }
  },

  updateStatus(req: Request, res: Response): void {
    try {
      const { id } = req.params;
      const { status } = req.body;

      if (!['In Vault', 'On Memo', 'Reserved'].includes(status)) {
        res.status(400).json({
          success: false,
          error: "Invalid status. Must be 'In Vault', 'On Memo', or 'Reserved'."
        });
        return;
      }

      const stones = db.getGemstones();
      const index = stones.findIndex((s) => s.id === id);

      if (index === -1) {
        res.status(404).json({ success: false, error: 'Gemstone not found.' });
        return;
      }

      stones[index].status = status;
      db.saveGemstones(stones);

      res.status(200).json({
        success: true,
        message: `Gemstone ${id} status updated to ${status}.`,
        data: stones[index]
      });
    } catch (err: any) {
      res.status(500).json({ success: false, error: 'Failed to update gemstone status.' });
    }
  },

  createGemstone(req: Request, res: Response): void {
    try {
      const newStoneData: GemstoneData = req.body;

      if (!newStoneData.name || !newStoneData.category || !newStoneData.carat || !newStoneData.priceUSD) {
        res.status(400).json({
          success: false,
          error: 'Name, category, carat, and priceUSD are required.'
        });
        return;
      }

      const stones = db.getGemstones();
      const stoneId = newStoneData.id || `gem-${Date.now()}`;
      const stone: GemstoneData = {
        ...newStoneData,
        id: stoneId,
        status: newStoneData.status || 'In Vault',
        pricePerCarat: Math.round(newStoneData.priceUSD / newStoneData.carat)
      };

      stones.push(stone);
      db.saveGemstones(stones);

      res.status(201).json({
        success: true,
        message: 'Gemstone added to vault inventory.',
        data: stone
      });
    } catch (err: any) {
      res.status(500).json({ success: false, error: 'Failed to create gemstone.' });
    }
  }
};
