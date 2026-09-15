import { Request, Response } from 'express';
import { db, UserData } from '../data/db';
import { hashPassword, comparePassword } from '../auth/password';
import { generateToken } from '../auth/jwt';
import { AuthenticatedRequest } from '../auth/authMiddleware';

export const authController = {
  async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        res.status(400).json({
          success: false,
          error: 'Email and password are required.'
        });
        return;
      }

      const users = db.getUsers();
      const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase());

      if (!user) {
        res.status(401).json({
          success: false,
          error: 'Invalid credentials. No trade account found for this email address.'
        });
        return;
      }

      const isMatch = await comparePassword(password, user.passwordHash);
      if (!isMatch) {
        res.status(401).json({
          success: false,
          error: 'Invalid email or password.'
        });
        return;
      }

      const token = generateToken({
        userId: user.id,
        email: user.email,
        memberId: user.memberId,
        accountRole: user.accountRole,
        companyName: user.companyName
      });

      const { passwordHash: _, ...safeUser } = user;

      res.status(200).json({
        success: true,
        message: 'Authentication successful. Welcome to the Somuchaura Trade Vault.',
        token,
        user: safeUser
      });
    } catch (err: any) {
      res.status(500).json({
        success: false,
        error: 'Internal server error during authentication.',
        details: err?.message
      });
    }
  },

  async register(req: Request, res: Response): Promise<void> {
    try {
      const {
        email,
        password,
        clientName,
        companyName,
        phone,
        address
      } = req.body;

      if (!email || !password || !clientName || !companyName) {
        res.status(400).json({
          success: false,
          error: 'Email, password, client name, and company name are required.'
        });
        return;
      }

      const users = db.getUsers();
      const existing = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
      if (existing) {
        res.status(409).json({
          success: false,
          error: 'An account with this email address already exists.'
        });
        return;
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

      res.status(201).json({
        success: true,
        message: 'Trade partner registration approved.',
        token,
        user: safeUser
      });
    } catch (err: any) {
      res.status(500).json({
        success: false,
        error: 'Registration failed.',
        details: err?.message
      });
    }
  },

  async getProfile(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      if (!req.user) {
        res.status(401).json({ success: false, error: 'Unauthorized.' });
        return;
      }

      const users = db.getUsers();
      const user = users.find((u) => u.id === req.user?.userId);

      if (!user) {
        res.status(404).json({ success: false, error: 'User not found.' });
        return;
      }

      const { passwordHash: _, ...safeUser } = user;
      res.status(200).json({
        success: true,
        user: safeUser
      });
    } catch (err: any) {
      res.status(500).json({ success: false, error: 'Failed to retrieve profile.' });
    }
  },

  async updateProfile(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      if (!req.user) {
        res.status(401).json({ success: false, error: 'Unauthorized.' });
        return;
      }

      const users = db.getUsers();
      const index = users.findIndex((u) => u.id === req.user?.userId);

      if (index === -1) {
        res.status(404).json({ success: false, error: 'User not found.' });
        return;
      }

      const currentUser = users[index];
      const { phone, address, preferences, savedStoneIds } = req.body;

      if (phone !== undefined) currentUser.phone = phone;
      if (address !== undefined) currentUser.address = address;
      if (preferences !== undefined) currentUser.preferences = { ...currentUser.preferences, ...preferences };
      if (Array.isArray(savedStoneIds)) currentUser.savedStoneIds = savedStoneIds;

      users[index] = currentUser;
      db.saveUsers(users);

      const { passwordHash: _, ...safeUser } = currentUser;
      res.status(200).json({
        success: true,
        message: 'Profile updated successfully.',
        user: safeUser
      });
    } catch (err: any) {
      res.status(500).json({ success: false, error: 'Failed to update profile.' });
    }
  }
};
