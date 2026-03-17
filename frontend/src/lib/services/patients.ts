// ============================================================
// Patient Records Service
// MOCK → SUPABASE: supabase.from('patient_records')...
// ============================================================
import type { PatientRecord } from '@/types';
import { MOCK_PATIENT_RECORDS } from '@/lib/mock-data';

export async function getPatientRecord(appointmentId: string): Promise<PatientRecord | null> {
  await delay();
  return MOCK_PATIENT_RECORDS.find(r => r.appointment_id === appointmentId) ?? null;
}

export async function savePatientRecord(record: Partial<PatientRecord> & { appointment_id: string }): Promise<PatientRecord> {
  await delay();
  const existing = MOCK_PATIENT_RECORDS.find(r => r.appointment_id === record.appointment_id);
  if (existing) {
    Object.assign(existing, record, { updated_at: new Date().toISOString() });
    return existing;
  }
  const newRecord: PatientRecord = {
    record_id: `rec-${Date.now()}`,
    vitals: {},
    medical_tests: {},
    physical_assessment: {},
    is_finalized: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    ...record,
  };
  MOCK_PATIENT_RECORDS.push(newRecord);
  return newRecord;
}

export async function finalizeRecord(recordId: string, signature: string): Promise<void> {
  await delay();
  const record = MOCK_PATIENT_RECORDS.find(r => r.record_id === recordId);
  if (record) {
    record.is_finalized = true;
    record.digital_signature = signature;
    record.updated_at = new Date().toISOString();
  }
}

function delay(ms = 80) { return new Promise(r => setTimeout(r, ms)); }
