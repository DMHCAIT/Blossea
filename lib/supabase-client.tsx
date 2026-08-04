'use client';

import { createClient, SupabaseClient } from '@supabase/supabase-js';

let client: SupabaseClient | null = null;

function getEnv(name: string): string {
  if (typeof process !== 'undefined') {
    return process.env?.[name] || '';
  }
  return '';
}

function createSupabase(): SupabaseClient {
  const url = getEnv('NEXT_PUBLIC_SUPABASE_URL');
  const anon = getEnv('NEXT_PUBLIC_SUPABASE_ANON_KEY');
  if (!url || !anon) {
    return createNoopClient();
  }
  return createClient(url, anon, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  });
}

function createNoopClient(): SupabaseClient {
  const noop = () => Promise.resolve({ data: null, error: { message: 'Supabase is not configured yet. Add your credentials to .env to enable accounts.' } });
  const noopAuth = {
    getSession: () => Promise.resolve({ data: { session: null }, error: null }),
    onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
    signInWithPassword: noop,
    signUp: noop,
    signOut: noop,
    resetPasswordForEmail: noop,
  };
  return {
    auth: noopAuth,
    from: () => ({
      select: () => ({ eq: () => ({ maybeSingle: noop, single: noop }), data: null, error: null }),
      insert: noop,
      update: noop,
      delete: noop,
    }),
  } as unknown as SupabaseClient;
}

export const supabase: SupabaseClient = new Proxy({} as SupabaseClient, {
  get(_target, prop) {
    if (!client) client = createSupabase();
    return Reflect.get(client, prop);
  },
});
