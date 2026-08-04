'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AuthShell, AuthField, AuthButton, AuthError, supabase } from '@/components/auth/auth-shell';

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: name } },
    });
    setLoading(false);
    if (error) {
      setError(error.message);
    } else {
      setDone(true);
      setTimeout(() => router.push('/account'), 1500);
    }
  };

  return (
    <AuthShell
      title="Join the house"
      subtitle="Create your account in seconds."
      type="signup"
      altLink={{ text: 'Already a member?', href: '/login', label: 'Sign in' }}
    >
      <form onSubmit={handleSignup} className="space-y-4">
        <AuthError message={error} />
        {done && (
          <p className="rounded-md bg-gold-400/10 px-4 py-3 text-xs text-gold-600">
            Welcome to the house. Redirecting to your account…
          </p>
        )}
        <AuthField label="Full Name" value={name} onChange={setName} required placeholder="Your name" />
        <AuthField label="Email" type="email" value={email} onChange={setEmail} required placeholder="you@example.com" />
        <AuthField label="Password" type="password" value={password} onChange={setPassword} required placeholder="At least 6 characters" />
        <AuthButton loading={loading}>Create Account</AuthButton>
      </form>
    </AuthShell>
  );
}
