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

const AuthContext = createContext<AuthContextValue>({
  user: null,
  loading: true,
  login: async () => {},
  logout: () => {},
  signup: async () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<MockUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load user from localStorage on mount
    const stored = localStorage.getItem('auth_user');
    if (stored) {
      setUser(JSON.parse(stored));
    }
    setLoading(false);
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

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
