'use client';

import { useState } from 'react';
import { AuthShell, AuthField, AuthButton, AuthError, supabase } from '@/components/auth/auth-shell';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/login`,
    });
    setLoading(false);
    if (error) setError(error.message);
    else setSent(true);
  };

  return (
    <AuthShell
      title="Reset password"
      subtitle="Enter your email and we'll send a reset link."
      type="forgot"
      altLink={{ text: 'Remembered it?', href: '/login', label: 'Back to sign in' }}
    >
      <form onSubmit={handleReset} className="space-y-4">
        <AuthError message={error} />
        {sent && (
          <p className="rounded-md bg-gold-400/10 px-4 py-3 text-xs text-gold-600">
            Check your inbox — a reset link is on its way.
          </p>
        )}
        <AuthField label="Email" type="email" value={email} onChange={setEmail} required placeholder="you@example.com" />
        <AuthButton loading={loading}>Send Reset Link</AuthButton>
      </form>
    </AuthShell>
  );
}
