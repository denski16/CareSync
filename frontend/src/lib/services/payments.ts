// ============================================================
// Payments Service
// MOCK → SUPABASE: supabase.from('payments')...
// ============================================================
import type { Payment, DiscountType } from '@/types';
import { MOCK_PAYMENTS } from '@/lib/mock-data';

export async function getPaymentByAppointment(appointmentId: string): Promise<Payment | null> {
  await delay();
  return MOCK_PAYMENTS.find(p => p.appointment_id === appointmentId) ?? null;
}

export async function getAllPayments(): Promise<Payment[]> {
  await delay();
  return [...MOCK_PAYMENTS];
}

export async function createPayment(
  appointmentId: string,
  estimated: number,
  discount: DiscountType = 'None'
): Promise<Payment> {
  await delay();
  const payment: Payment = {
    payment_id: `pay-${Date.now()}`,
    appointment_id: appointmentId,
    estimated_amount: estimated,
    discount_type: discount,
    is_finalized: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
  MOCK_PAYMENTS.push(payment);
  return payment;
}

export async function finalizePayment(
  paymentId: string,
  finalAmount: number,
  receiptUrl: string
): Promise<void> {
  await delay();
  const pay = MOCK_PAYMENTS.find(p => p.payment_id === paymentId);
  if (pay) {
    pay.final_amount = finalAmount;
    pay.receipt_url = receiptUrl;
    pay.is_finalized = true;
    pay.updated_at = new Date().toISOString();
  }
}

function delay(ms = 80) { return new Promise(r => setTimeout(r, ms)); }
