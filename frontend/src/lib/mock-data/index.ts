import type {
  Profile, Appointment, QueueLog, PatientRecord,
  Payment, InventoryItem, EquipmentMaintenance
} from '@/types';

// ── Profiles / Staff ──────────────────────────────────────────
export const MOCK_PROFILES: Profile[] = [
  { id: 'patient-1', role: 'Patient',  full_name: 'Alex Driver',       contact_info: '09171234567', created_at: '2025-01-01T00:00:00Z', updated_at: '2025-01-01T00:00:00Z' },
  { id: 'patient-2', role: 'Patient',  full_name: 'Robert Johnson',    contact_info: '09189876543', created_at: '2025-01-02T00:00:00Z', updated_at: '2025-01-02T00:00:00Z' },
  { id: 'patient-3', role: 'Patient',  full_name: 'Elena Martinez',    contact_info: '09201112233', created_at: '2025-01-03T00:00:00Z', updated_at: '2025-01-03T00:00:00Z' },
  { id: 'patient-4', role: 'Patient',  full_name: 'William Kim',       contact_info: '09264445566', created_at: '2025-01-04T00:00:00Z', updated_at: '2025-01-04T00:00:00Z' },
  { id: 'patient-5', role: 'Patient',  full_name: 'Sarah Adams',       contact_info: '09337778899', created_at: '2025-01-05T00:00:00Z', updated_at: '2025-01-05T00:00:00Z' },
  { id: 'doctor-1',  role: 'Doctor',   full_name: 'Dr. Pedro Santos',  contact_info: 'santos@caresync.ph', created_at: '2025-01-01T00:00:00Z', updated_at: '2025-01-01T00:00:00Z' },
  { id: 'staff-1',   role: 'Staff',    full_name: 'Juan Dela Cruz',    contact_info: 'juan@caresync.ph',   created_at: '2025-01-01T00:00:00Z', updated_at: '2025-01-01T00:00:00Z' },
  { id: 'admin-1',   role: 'Admin',    full_name: 'System Admin',      contact_info: 'admin@caresync.ph',  created_at: '2025-01-01T00:00:00Z', updated_at: '2025-01-01T00:00:00Z' },
];

// ── Appointments ─────────────────────────────────────────────
export const MOCK_APPOINTMENTS: Appointment[] = [
  { appointment_id: 'appt-1', patient_id: 'patient-1', scheduled_date: '2026-10-24T10:30:00Z', qr_code_hash: 'QR-ALEX-001', status: 'Checked-In',  purpose: 'Student',          created_at: '2026-10-20T00:00:00Z' },
  { appointment_id: 'appt-2', patient_id: 'patient-2', scheduled_date: '2026-10-23T09:00:00Z', qr_code_hash: 'QR-ROB-002',  status: 'Checked-In',  purpose: 'Non-Professional', created_at: '2026-10-21T00:00:00Z' },
  { appointment_id: 'appt-3', patient_id: 'patient-3', scheduled_date: '2026-10-23T09:15:00Z', qr_code_hash: 'QR-ELE-003',  status: 'Checked-In',  purpose: 'Professional',     created_at: '2026-10-21T00:00:00Z' },
  { appointment_id: 'appt-4', patient_id: 'patient-4', scheduled_date: '2026-10-23T09:30:00Z', qr_code_hash: 'QR-WIL-004',  status: 'Checked-In',  purpose: 'Student',          created_at: '2026-10-21T00:00:00Z' },
  { appointment_id: 'appt-5', patient_id: 'patient-5', scheduled_date: '2026-10-23T09:45:00Z', qr_code_hash: 'QR-SAR-005',  status: 'Pending',     purpose: 'Conversion',       created_at: '2026-10-22T00:00:00Z' },
  { appointment_id: 'appt-6', patient_id: 'patient-1', scheduled_date: '2026-09-12T09:00:00Z', qr_code_hash: 'QR-ALEX-006', status: 'Completed',   purpose: 'Student',          created_at: '2026-09-10T00:00:00Z' },
  { appointment_id: 'appt-7', patient_id: 'patient-1', scheduled_date: '2026-08-05T10:00:00Z', qr_code_hash: 'QR-ALEX-007', status: 'Completed',   purpose: 'Student',          created_at: '2026-08-03T00:00:00Z' },
  { appointment_id: 'appt-8', patient_id: 'patient-1', scheduled_date: '2026-07-18T11:00:00Z', qr_code_hash: 'QR-ALEX-008', status: 'Completed',   purpose: 'Student',          created_at: '2026-07-16T00:00:00Z' },
];

// ── Queue Logs ────────────────────────────────────────────────
export const MOCK_QUEUE: QueueLog[] = [
  { log_id: 'q-1', appointment_id: 'appt-2', patient_id: 'patient-2', queue_number: 1, status: 'Waiting',         checked_in_at: '2026-10-23T09:12:00Z', created_at: '2026-10-23T09:12:00Z', updated_at: '2026-10-23T09:12:00Z' },
  { log_id: 'q-2', appointment_id: 'appt-3', patient_id: 'patient-3', queue_number: 2, status: 'At Lab',          checked_in_at: '2026-10-23T09:25:00Z', created_at: '2026-10-23T09:25:00Z', updated_at: '2026-10-23T09:30:00Z' },
  { log_id: 'q-3', appointment_id: 'appt-4', patient_id: 'patient-4', queue_number: 3, status: 'Waiting',         checked_in_at: '2026-10-23T09:30:00Z', created_at: '2026-10-23T09:30:00Z', updated_at: '2026-10-23T09:30:00Z' },
  { log_id: 'q-4', appointment_id: 'appt-5', patient_id: 'patient-5', queue_number: 4, status: 'Waiting',         checked_in_at: '2026-10-23T09:45:00Z', created_at: '2026-10-23T09:45:00Z', updated_at: '2026-10-23T09:45:00Z' },
];

// ── Patient Records ───────────────────────────────────────────
export const MOCK_PATIENT_RECORDS: PatientRecord[] = [
  {
    record_id: 'rec-1', appointment_id: 'appt-2',
    vitals: { height_cm: 182, weight_kg: 78, blood_pressure: '120/80', heart_rate_bpm: 72, temperature_c: 36.6 },
    medical_tests: { visual_acuity_right: '20/20', visual_acuity_left: '20/25', color_blindness_result: 'Normal', auditory_test_result: 'Normal' },
    physical_assessment: { extremities_complete: true, remarks: 'No abnormalities noted.' },
    is_finalized: false, created_at: '2026-10-23T09:15:00Z', updated_at: '2026-10-23T09:15:00Z',
  },
];

// ── Payments ──────────────────────────────────────────────────
export const MOCK_PAYMENTS: Payment[] = [
  { payment_id: 'pay-1', appointment_id: 'appt-6', estimated_amount: 550, final_amount: 600,  discount_type: 'None',   receipt_url: '/receipts/rec-001.pdf', is_finalized: true,  created_at: '2026-09-12T10:00:00Z', updated_at: '2026-09-12T11:00:00Z' },
  { payment_id: 'pay-2', appointment_id: 'appt-7', estimated_amount: 550, final_amount: 440,  discount_type: 'Senior', receipt_url: '/receipts/rec-002.pdf', is_finalized: true,  created_at: '2026-08-05T10:00:00Z', updated_at: '2026-08-05T11:00:00Z' },
  { payment_id: 'pay-3', appointment_id: 'appt-8', estimated_amount: 550, final_amount: 550,  discount_type: 'None',   receipt_url: '/receipts/rec-003.pdf', is_finalized: true,  created_at: '2026-07-18T10:00:00Z', updated_at: '2026-07-18T11:00:00Z' },
  { payment_id: 'pay-4', appointment_id: 'appt-2', estimated_amount: 550,                     discount_type: 'None',                                        is_finalized: false, created_at: '2026-10-23T09:12:00Z', updated_at: '2026-10-23T09:12:00Z' },
];

// ── Inventory ─────────────────────────────────────────────────
export const MOCK_INVENTORY: InventoryItem[] = [
  { item_id: 'inv-1',  name: 'Snellen Eye Chart',         category: 'Vision Testing',   stock_level: 12, reorder_threshold: 5,  created_at: '2025-01-01T00:00:00Z', updated_at: '2025-01-01T00:00:00Z' },
  { item_id: 'inv-2',  name: 'Ishihara Color Plates',     category: 'Vision Testing',   stock_level: 3,  reorder_threshold: 5,  created_at: '2025-01-01T00:00:00Z', updated_at: '2025-01-01T00:00:00Z' },
  { item_id: 'inv-3',  name: 'Blood Pressure Monitor',    category: 'Vitals',           stock_level: 8,  reorder_threshold: 4,  created_at: '2025-01-01T00:00:00Z', updated_at: '2025-01-01T00:00:00Z' },
  { item_id: 'inv-4',  name: 'Stethoscope',               category: 'Vitals',           stock_level: 6,  reorder_threshold: 3,  created_at: '2025-01-01T00:00:00Z', updated_at: '2025-01-01T00:00:00Z' },
  { item_id: 'inv-5',  name: 'Disposable Gloves (box)',   category: 'Consumable',       stock_level: 2,  reorder_threshold: 10, created_at: '2025-01-01T00:00:00Z', updated_at: '2025-01-01T00:00:00Z' },
  { item_id: 'inv-6',  name: 'Medical Certificate Paper', category: 'Consumable',       stock_level: 200, reorder_threshold: 50, created_at: '2025-01-01T00:00:00Z', updated_at: '2025-01-01T00:00:00Z' },
  { item_id: 'inv-7',  name: 'Audiometer',                category: 'Auditory Testing', stock_level: 2,  reorder_threshold: 1,  created_at: '2025-01-01T00:00:00Z', updated_at: '2025-01-01T00:00:00Z' },
  { item_id: 'inv-8',  name: 'Weighing Scale',            category: 'Vitals',           stock_level: 4,  reorder_threshold: 2,  created_at: '2025-01-01T00:00:00Z', updated_at: '2025-01-01T00:00:00Z' },
];

// ── Equipment Maintenance ─────────────────────────────────────
export const MOCK_MAINTENANCE: EquipmentMaintenance[] = [
  { equipment_id: 'eq-1', name: 'Digital Audiometer',       last_maintenance_date: '2026-08-01', next_calibration_date: '2026-11-01', log_details: 'Calibration passed. Firmware updated.',    created_at: '2026-01-01T00:00:00Z', updated_at: '2026-08-01T00:00:00Z' },
  { equipment_id: 'eq-2', name: 'Blood Pressure Monitor',   last_maintenance_date: '2026-09-15', next_calibration_date: '2027-03-15', log_details: 'No issues found during inspection.',        created_at: '2026-01-01T00:00:00Z', updated_at: '2026-09-15T00:00:00Z' },
  { equipment_id: 'eq-3', name: 'Snellen Projector',        last_maintenance_date: '2026-07-20', next_calibration_date: '2026-10-20', log_details: 'Bulb replaced. Alignment calibrated.',       created_at: '2026-01-01T00:00:00Z', updated_at: '2026-07-20T00:00:00Z' },
  { equipment_id: 'eq-4', name: 'Electronic Height Scale',  last_maintenance_date: '2026-10-01', next_calibration_date: '2027-04-01', log_details: 'Battery replaced. Scale re-zeroed.',         created_at: '2026-01-01T00:00:00Z', updated_at: '2026-10-01T00:00:00Z' },
];
