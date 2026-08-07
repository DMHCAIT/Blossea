'use client';

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

interface MockUser {
  id: string;
  email: string;
  name?: string;
}

interface AuthContextValue {
  user: MockUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  signup: (email: string, password: string, name: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<MockUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    // Load user from localStorage on mount
    try {
      const stored = localStorage.getItem('auth_user');
      if (stored) {
        setUser(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Failed to load auth user:', error);
    }
    setLoading(false);
    setHydrated(true);
  }, []);

  const login = async (email: string, password: string) => {
    if (!email || !password) throw new Error('Email and password required');
    const mockUser: MockUser = { id: `user_${Date.now()}`, email, name: email.split('@')[0] };
    localStorage.setItem('auth_user', JSON.stringify(mockUser));
    setUser(mockUser);
  };

  const signup = async (email: string, password: string, name: string) => {
    if (!email || !password || !name) throw new Error('All fields required');
    const mockUser: MockUser = { id: `user_${Date.now()}`, email, name };
    localStorage.setItem('auth_user', JSON.stringify(mockUser));
    setUser(mockUser);
  };

  const logout = () => {
    localStorage.removeItem('auth_user');
    setUser(null);
  };

  const value: AuthContextValue = {
    user,
    loading,
    login,
    logout,
    signup,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
