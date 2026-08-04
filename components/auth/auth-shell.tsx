'use client';

import { useState, type ReactNode } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabase-client';
import { cn } from '@/lib/utils';

interface AuthShellProps {
  title: string;
  subtitle: string;
  children: ReactNode;
  altLink: { text: string; href: string; label: string };
  type: 'login' | 'signup' | 'forgot';
}

export function AuthShell({ title, subtitle, children, altLink, type }: AuthShellProps) {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-cream-100 py-20">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 top-1/4 h-96 w-96 rounded-full bg-gold-400/10 blur-[120px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 bottom-1/4 h-96 w-96 rounded-full bg-ink-900/5 blur-[120px]"
      />
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full max-w-md px-5"
      >
        <Link
          href="/"
          className="block text-center font-serif text-2xl tracking-[0.3em] text-ink-900"
        >
          BLOSSEA<span className="text-gold-400">·</span>
        </Link>
        <div className="mt-10 rounded-md border border-ink-900/10 bg-cream-50 p-8 md:p-10">
          <h1 className="font-serif text-3xl font-medium">{title}</h1>
          <p className="mt-2 text-sm text-warmgray">{subtitle}</p>
          <div className="mt-7">{children}</div>
          <p className="mt-7 text-center text-sm text-warmgray">
            {altLink.text}{' '}
            <Link href={altLink.href} className="text-ink-900 underline-offset-4 hover:underline">
              {altLink.label}
            </Link>
          </p>
        </div>
        <p className="mt-6 text-center text-[10px] uppercase tracking-widest-2 text-warmgray">
          {type === 'login' ? 'Members get early access to drops' : type === 'signup' ? 'Join the house in seconds' : 'We\'ll get you back in'}
        </p>
      </motion.div>
    </section>
  );
}

export function AuthField({
  label,
  type = 'text',
  value,
  onChange,
  required,
  placeholder,
}: {
  label: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="text-[10px] uppercase tracking-widest-2 text-warmgray">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        placeholder={placeholder}
        className="mt-1.5 w-full border border-ink-900/15 bg-cream-100 py-3 text-sm focus:border-gold-400 focus:outline-none"
      />
    </label>
  );
}

export function AuthButton({ children, loading, onClick }: { children: ReactNode; loading?: boolean; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className={cn('btn-primary w-full', loading && 'opacity-60')}
    >
      {loading ? 'Please wait…' : children}
    </button>
  );
}

export function AuthError({ message }: { message: string | null }) {
  if (!message) return null;
  return <p className="rounded-md bg-red-50 px-4 py-3 text-xs text-red-700">{message}</p>;
}

export function useAuthRedirect() {
  const router = useRouter();
  return (path: string) => router.push(path);
}

export { supabase };
