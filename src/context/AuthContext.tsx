'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';

const TOKEN_KEY = 'yosenamora_token';

export interface AuthUser {
  id: string;
  email: string;
  clientName: string;
  companyName: string;
  memberId: string;
  accountRole: 'trade_partner' | 'admin' | 'jeweller';
  tier: string;
  creditLineUSD: number;
  phone: string;
  address: string;
  isVerifiedTrade: boolean;
  createdAt: string;
  savedStoneIds: string[];
  preferences: {
    notifyDrops: boolean;
    notifyMemos: boolean;
  };
}

export interface SignUpFields {
  clientName: string;
  companyName: string;
  email: string;
  password: string;
  phone?: string;
  address?: string;
}

/**
 * Flat rather than a discriminated union: the project compiles with
 * `strict: false`, and without strictNullChecks TypeScript will not narrow a
 * boolean-literal discriminant, so `error` has to be readable on both outcomes.
 */
export interface AuthResult {
  ok: boolean;
  error?: string;
}

interface AuthContextType {
  user: AuthUser | null;
  token: string | null;
  /** True while the stored session is being restored on first load. */
  isRestoring: boolean;
  signIn: (email: string, password: string) => Promise<AuthResult>;
  signUp: (fields: SignUpFields) => Promise<AuthResult>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const readStoredToken = (): string | null => {
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
};

const persistToken = (token: string | null) => {
  try {
    if (token) localStorage.setItem(TOKEN_KEY, token);
    else localStorage.removeItem(TOKEN_KEY);
  } catch {
    // Ignore in restricted environments
  }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isRestoring, setIsRestoring] = useState(true);

  // Restore a stored session by validating the token against the API.
  useEffect(() => {
    const stored = readStoredToken();
    if (!stored) {
      setIsRestoring(false);
      return;
    }

    let cancelled = false;

    (async () => {
      try {
        const res = await fetch('/api/auth/me', {
          headers: { Authorization: `Bearer ${stored}` },
        });
        const data = await res.json();

        if (cancelled) return;

        if (res.ok && data?.success && data.user) {
          setUser(data.user);
          setToken(stored);
        } else {
          // Expired or rejected — clear it rather than leaving a dead token around.
          persistToken(null);
        }
      } catch {
        if (!cancelled) persistToken(null);
      } finally {
        if (!cancelled) setIsRestoring(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const authenticate = useCallback(
    async (
      endpoint: string,
      payload: SignUpFields | { email: string; password: string }
    ): Promise<AuthResult> => {
      try {
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        const data = await res.json();

        if (!res.ok || !data?.success) {
          return { ok: false, error: data?.error ?? 'Something went wrong. Please try again.' };
        }

        setUser(data.user);
        setToken(data.token);
        persistToken(data.token);
        return { ok: true };
      } catch {
        return { ok: false, error: 'Could not reach the trade desk. Check your connection.' };
      }
    },
    []
  );

  const signIn = useCallback(
    (email: string, password: string) => authenticate('/api/auth/login', { email, password }),
    [authenticate]
  );

  const signUp = useCallback(
    (fields: SignUpFields) => authenticate('/api/auth/register', fields),
    [authenticate]
  );

  const signOut = useCallback(() => {
    setUser(null);
    setToken(null);
    persistToken(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, isRestoring, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
