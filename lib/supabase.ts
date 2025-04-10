import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

// Replace these with your Supabase project URL and anon key
const supabaseUrl = 'https://akbzpxkogziabdwrfahl.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFrYnpweGtvZ3ppYWJkd3JmYWhsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQxMTgxMDgsImV4cCI6MjA1OTY5NDEwOH0.N9ppSqK6hHOLJW160EYYyRUxlEPsIgcB9trh1SpuL_o';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
  realtime: {
    params: {
      eventsPerSecond: 10,
    },
  },
}); 