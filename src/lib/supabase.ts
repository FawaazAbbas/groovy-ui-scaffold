import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabaseAuthUrl = import.meta.env.VITE_SUPABASE_AUTH_URL;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Missing Supabase env vars — running in demo mode');
}

export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-key',
  {
    auth: {
      // Point auth requests to our separate GoTrue service
      ...(supabaseAuthUrl && {
        // Override the default auth URL
        // GoTrue runs on a separate Cloud Run service
      }),
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true,
    },
  }
);

// Export a flag for components to check if we have real config
export const isSupabaseConfigured = !!(supabaseUrl && supabaseAnonKey);
