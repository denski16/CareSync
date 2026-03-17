import { supabase } from '@/lib/supabase';
import type { Appointment, AppointmentStatus, AppointmentPurpose } from '@/types';

// ============================================================
// Appointments Service
// SUPABASE VERSION: Fetches real data from the database
// ============================================================

export async function getAppointmentsByPatient(patientId: string): Promise<Appointment[]> {
  const { data, error } = await supabase
    .from('appointments')
    .select('*, patient:profiles(*)')
    .eq('patient_id', patientId)
    .order('scheduled_date', { ascending: false });

  if (error) {
    console.error('Error fetching patient appointments:', error.message);
    throw error;
  }

  return (data || []) as unknown as Appointment[];
}

export async function getUpcomingAppointment(patientId: string): Promise<Appointment | null> {
  const { data, error } = await supabase
    .from('appointments')
    .select('*, patient:profiles(*)')
    .eq('patient_id', patientId)
    .in('status', ['Pending', 'Checked-In'])
    .order('scheduled_date', { ascending: true })
    .limit(1)
    .single();

  if (error && error.code !== 'PGRST116') { // PGRST116 is "no rows found"
    console.error('Error fetching upcoming appointment:', error.message);
    throw error;
  }

  return data as unknown as Appointment | null;
}

export async function createAppointment(
  data: { patient_id: string; scheduled_date: string; purpose: AppointmentPurpose }
): Promise<Appointment> {
  const qrHash = `QR-${Math.random().toString(36).substring(2, 9).toUpperCase()}-${Date.now()}`;
  
  const { data: newAppt, error } = await supabase
    .from('appointments')
    .insert({
      patient_id: data.patient_id,
      scheduled_date: data.scheduled_date,
      purpose: data.purpose,
      qr_code_hash: qrHash,
      status: 'Pending'
    })
    .select('*, patient:profiles(*)')
    .single();

  if (error) {
    console.error('Error creating appointment:', error.message);
    throw error;
  }

  return newAppt as unknown as Appointment;
}

export async function updateAppointmentStatus(
  appointmentId: string,
  status: AppointmentStatus
): Promise<void> {
  const { error } = await supabase
    .from('appointments')
    .update({ status })
    .eq('appointment_id', appointmentId);

  if (error) {
    console.error('Error updating appointment status:', error.message);
    throw error;
  }
}

export async function getAllAppointments(): Promise<Appointment[]> {
  const { data, error } = await supabase
    .from('appointments')
    .select('*, patient:profiles(*)')
    .order('scheduled_date', { ascending: false });

  if (error) {
    console.error('Error fetching all appointments:', error.message);
    throw error;
  }

  return (data || []) as unknown as Appointment[];
}
