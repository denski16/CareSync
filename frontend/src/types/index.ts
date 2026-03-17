// ============================================================
// CareSync TypeScript Types — mirrors the Supabase DB schema
// Swap the service layer (lib/services/*) to go live
// ============================================================

export type UserRole = 'Admin' | 'Doctor' | 'Nurse' | 'Staff' | 'Patient';

export interface Profile {
  id: string;
  role: UserRole;
  full_name: string;
  contact_info?: string;
  created_at: string;
  updated_at: string;
}

export type AppointmentStatus = 'Pending' | 'Checked-In' | 'Completed' | 'Cancelled';
export type AppointmentPurpose = 'Student' | 'Non-Professional' | 'Professional' | 'Conversion';

export interface Appointment {
  appointment_id: string;
  patient_id: string;
  patient?: Profile;
  scheduled_date: string;       // ISO timestamp
  qr_code_hash: string;
  status: AppointmentStatus;
  purpose: AppointmentPurpose;
  created_at: string;
}

export type QueueStatus = 'Waiting' | 'In Triage' | 'In Consultation' | 'At Lab' | 'Completed';

export interface QueueLog {
  log_id: string;
  appointment_id: string;
  appointment?: Appointment;
  patient?: Profile;
  patient_id?: string;
  queue_number: number;
  status: QueueStatus;
  checked_in_at: string;
  created_at: string;
  updated_at: string;
}

export interface Vitals {
  height_cm?: number;
  weight_kg?: number;
  blood_pressure?: string;   // e.g. "120/80"
  heart_rate_bpm?: number;
  temperature_c?: number;
}

export interface MedicalTests {
  visual_acuity_right?: string;
  visual_acuity_left?: string;
  color_blindness_result?: 'Normal' | 'Deficient';
  auditory_test_result?: 'Normal' | 'Deficient';
}

export interface PhysicalAssessment {
  extremities_complete?: boolean;
  remarks?: string;
}

export interface PatientRecord {
  record_id: string;
  appointment_id: string;
  appointment?: Appointment;
  vitals: Vitals;
  medical_tests: MedicalTests;
  physical_assessment: PhysicalAssessment;
  digital_signature?: string;
  is_finalized: boolean;
  created_at: string;
  updated_at: string;
}

export type DiscountType = 'None' | 'Senior' | 'PWD' | 'Employee';

export interface Payment {
  payment_id: string;
  appointment_id: string;
  appointment?: Appointment;
  estimated_amount: number;
  final_amount?: number;
  discount_type: DiscountType;
  receipt_url?: string;
  is_finalized: boolean;
  created_at: string;
  updated_at: string;
}

export interface InventoryItem {
  item_id: string;
  name: string;
  category: string;
  stock_level: number;
  reorder_threshold: number;
  created_at: string;
  updated_at: string;
}

export interface EquipmentMaintenance {
  equipment_id: string;
  name: string;
  last_maintenance_date?: string;
  next_calibration_date?: string;
  log_details?: string;
  created_at: string;
  updated_at: string;
}

// Auth types
export interface AuthUser extends Profile {
  email: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}
