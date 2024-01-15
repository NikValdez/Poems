import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ogrenpytgypgmcmtskna.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9ncmVucHl0Z3lwZ21jbXRza25hIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDUyNzA2OTMsImV4cCI6MjAyMDg0NjY5M30.rRGZRgR7_kAHztA7CPO0d-PD-uMRgBsh3l033Zayoxc';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
