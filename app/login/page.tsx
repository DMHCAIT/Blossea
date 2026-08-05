'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/providers/auth-context';
import { AuthShell, AuthField, AuthButton, AuthError } from '@/components/auth/auth-shell';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState('demo@example.com');
  const [password, setPassword] = useState('password123');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await login(email, password);
      router.push('/account');
    } catch (err) {
      setError((err as Error).message);
    }
    setLoading(false);
  };

  return (
    <AuthShell
      title="Welcome back"
      subtitle="Sign in to your house account."
      type="login"
      altLink={{ text: 'New to Blossea?', href: '/signup', label: 'Create an account' }}
    >
      <form onSubmit={handleLogin} className="space-y-4">
        <AuthError message={error} />
        <AuthField label="Email" type="email" value={email} onChange={setEmail} required placeholder="you@example.com" />
        <AuthField label="Password" type="password" value={password} onChange={setPassword} required placeholder="••••••••" />
        <div className="flex justify-end">
          <a href="/forgot-password" className="text-[11px] uppercase tracking-widest-2 text-warmgray hover:text-ink-900">
            Forgot password?
          </a>
        </div>
        <AuthButton loading={loading}>Sign In</AuthButton>
      </form>
    </AuthShell>
  );
}
