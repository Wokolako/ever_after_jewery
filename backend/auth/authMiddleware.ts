import { Request, Response, NextFunction } from 'express';
import { verifyToken, extractBearerToken, TokenPayload } from './jwt';
import { db } from '../data/db';

export interface AuthenticatedRequest extends Request {
  user?: TokenPayload;
}

export function authenticateToken(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void {
  const authHeader = req.headers.authorization;
  const token = extractBearerToken(authHeader);

  if (!token) {
    res.status(401).json({
      success: false,
      error: 'Authentication required. Please provide a valid Bearer token in the Authorization header.'
    });
    return;
  }

  const payload = verifyToken(token);
  if (!payload) {
    res.status(403).json({
      success: false,
      error: 'Invalid or expired authentication token. Please sign in again.'
    });
    return;
  }

  // Ensure user still exists in database
  const users = db.getUsers();
  const userExists = users.some((u) => u.id === payload.userId);
  if (!userExists) {
    res.status(401).json({
      success: false,
      error: 'User account not found or revoked.'
    });
    return;
  }

  req.user = payload;
  next();
}

export function requireRole(allowedRoles: Array<'trade_partner' | 'admin' | 'jeweller'>) {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({
        success: false,
        error: 'Unauthorized. Authentication token is missing.'
      });
      return;
    }

    if (!allowedRoles.includes(req.user.accountRole)) {
      res.status(403).json({
        success: false,
        error: `Forbidden. This action requires one of the following roles: ${allowedRoles.join(', ')}`
      });
      return;
    }

    next();
  };
}
