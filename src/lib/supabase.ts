import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL');
  throw new Error('Missing environment variable: NEXT_PUBLIC_SUPABASE_URL');
}

if (!supabaseKey) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_ANON_KEY');
  throw new Error('Missing environment variable: NEXT_PUBLIC_SUPABASE_ANON_KEY');
}

console.log('Initializing Supabase client with URL:', supabaseUrl);

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
  db: {
    schema: 'public'
  },
  global: {
    headers: {
      'Content-Type': 'application/json'
    }
  }
});

// Test the connection immediately
supabase
  .from('tariffs')
  .select('count')
  .limit(1)
  .then(({ data, error }) => {
    if (error) {
      console.error('Supabase connection test failed:', error);
    } else {
      console.log('Supabase connection test successful:', data);
    }
  });

// Type definitions for our Supabase tables
export type Tariff = {
  id: string;
  country: string;
  tariff_name: string;
  tariff_rate: number;
  description: string | null;
  effective_date: string;
  status: 'active' | 'inactive' | 'implemented' | 'threatened';
  created_at: string;
}; 