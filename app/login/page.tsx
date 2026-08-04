'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AuthShell, AuthField, AuthButton, AuthError, supabase } from '@/components/auth/auth-shell';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      setError(error.message);
    } else {
      router.push('/account');
    }
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
