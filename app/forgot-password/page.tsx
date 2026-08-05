'use client';

import { useState } from 'react';
import { AuthShell, AuthField, AuthButton, AuthError } from '@/components/auth/auth-shell';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!email) {
      setError('Please enter your email');
      return;
    }
    setLoading(true);
    // Demo: Simulate reset email
    setTimeout(() => {
      setSent(true);
      setLoading(false);
    }, 1000);
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
