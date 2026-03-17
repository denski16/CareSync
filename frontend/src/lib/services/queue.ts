import { supabase } from '@/lib/supabase';
import type { QueueLog, QueueStatus } from '@/types';

// ============================================================
// Queue Service
// SUPABASE VERSION: Fetches real-time data from the database
// ============================================================

export async function getActiveQueue(): Promise<QueueLog[]> {
  const { data, error } = await supabase
    .from('queue_logs')
    .select('*, appointment:appointments(*, patient:profiles(*))')
    .neq('status', 'Completed')
    .order('queue_number', { ascending: true });

  if (error) {
    console.error('Error fetching active queue:', error.message);
    throw error;
  }

  return (data || []) as unknown as QueueLog[];
}

export async function getFullQueue(): Promise<QueueLog[]> {
  const { data, error } = await supabase
    .from('queue_logs')
    .select('*, appointment:appointments(*, patient:profiles(*))')
    .order('queue_number', { ascending: true });

  if (error) {
    console.error('Error fetching full queue:', error.message);
    throw error;
  }

  return (data || []) as unknown as QueueLog[];
}

export async function updateQueueStatus(logId: string, status: QueueStatus): Promise<void> {
  const { error } = await supabase
    .from('queue_logs')
    .update({ status, updated_at: new Date().toISOString() })
    .eq('log_id', logId);

  if (error) {
    console.error('Error updating queue status:', error.message);
    throw error;
  }
}

export async function callNextPatient(logId: string): Promise<void> {
  await updateQueueStatus(logId, 'In Consultation');
}

export async function addToQueue(appointmentId: string, patientId: string): Promise<QueueLog> {
  // Get max queue number for today (simple approach)
  const { data: maxEntry } = await supabase
    .from('queue_logs')
    .select('queue_number')
    .order('queue_number', { ascending: false })
    .limit(1)
    .single();

  const nextNumber = (maxEntry?.queue_number || 0) + 1;

  const { data, error } = await supabase
    .from('queue_logs')
    .insert({
      appointment_id: appointmentId,
      patient_id: patientId,
      queue_number: nextNumber,
      status: 'Waiting',
      checked_in_at: new Date().toISOString()
    })
    .select('*, appointment:appointments(*, patient:profiles(*))')
    .single();

  if (error) {
    console.error('Error adding to queue:', error.message);
    throw error;
  }

  return data as unknown as QueueLog;
}
