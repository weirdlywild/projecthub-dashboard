import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Check if Supabase environment variables are available
export const isSupabaseConfigured = !!(supabaseUrl && supabaseAnonKey);

let supabase: any;

if (isSupabaseConfigured) {
  supabase = createClient(supabaseUrl!, supabaseAnonKey!, {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true
    }
  });
} else {
  console.warn('Supabase environment variables not found. Running in mock mode.');
  // Create a mock client for development
  supabase = {
    auth: {
      getSession: () => Promise.resolve({ data: { session: null }, error: null }),
      signInWithPassword: () => Promise.resolve({ data: null, error: { message: 'Supabase not configured' } }),
      signOut: () => Promise.resolve({ error: null }),
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
      resetPasswordForEmail: () => Promise.resolve({ error: null })
    },
    from: () => ({
      select: () => ({
        eq: () => ({
          single: () => Promise.resolve({ data: null, error: { message: 'Supabase not configured' } })
        })
      }),
      update: () => ({
        eq: () => ({
          select: () => ({
            single: () => Promise.resolve({ data: null, error: { message: 'Supabase not configured' } })
          })
        })
      })
    })
  };
}

export { supabase };
export default supabase;