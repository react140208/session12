// import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import 'react-native-url-polyfill/auto';


const supabaseUrl = "https://wjjvldfpainusaockocg.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndqanZsZGZwYWludXNhb2Nrb2NnIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTEzMjY4ODksImV4cCI6MjAwNjkwMjg4OX0.TAnTzVbvUl2qsA-xtDteLzTII2iYn6ilV6CNxtu7EgY"

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
        // storage: AsyncStorage,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
    },
})