import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import { getProgress, mergeProgress } from './storage';

const url = process.env.EXPO_PUBLIC_SUPABASE_URL;
const anonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;
export const cloudConfigured = Boolean(url && anonKey);
export const supabase = cloudConfigured ? createClient(url!, anonKey!, {
  auth: { storage: AsyncStorage, autoRefreshToken: true, persistSession: true, detectSessionInUrl: false }
}) : null;

export async function requestParentCode(email: string) {
  if (!supabase) throw new Error('Cloud sync is not configured yet. Add the Supabase URL and anon key.');
  const { error } = await supabase.auth.signInWithOtp({ email: email.trim() });
  if (error) throw error;
}
export async function confirmParentCode(email: string, token: string) {
  if (!supabase) throw new Error('Cloud sync is not configured yet.');
  const { error } = await supabase.auth.verifyOtp({ email: email.trim(), token: token.trim(), type: 'email' });
  if (error) throw error;
}
export async function signOutParent() {
  if (!supabase) return;
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}
export async function syncProgressToCloud() {
  if (!supabase) throw new Error('Cloud sync is not configured yet.');
  const { data: { user }, error: userError } = await supabase.auth.getUser();
  if (userError) throw userError;
  if (!user) throw new Error('Sign in with the parent email first.');
  const { data: remoteRows, error: downloadError } = await supabase.from('lesson_progress').select('lesson_id,score,total,completed_at').eq('user_id', user.id);
  if (downloadError) throw downloadError;
  if (remoteRows?.length) await mergeProgress(remoteRows);
  const localRows = await getProgress();
  if (localRows.length === 0) return 0;
  const rows = localRows.map(row => ({ user_id: user.id, lesson_id: row.lesson_id, score: row.score, total: row.total, completed_at: row.completed_at }));
  const { error } = await supabase.from('lesson_progress').upsert(rows, { onConflict: 'user_id,lesson_id' });
  if (error) throw error;
  return rows.length;
}
