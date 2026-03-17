-- CareSync / Teriyaki Database Schema
-- Run this in your Supabase SQL Editor

-- Clean start (Optional: Uncomment these if you want to wipe existing data and start fresh)
DROP TABLE IF EXISTS public.equipment_maintenance CASCADE;
DROP TABLE IF EXISTS public.inventory CASCADE;
DROP TABLE IF EXISTS public.payments CASCADE;
DROP TABLE IF EXISTS public.patient_records CASCADE;
DROP TABLE IF EXISTS public.queue_logs CASCADE;
DROP TABLE IF EXISTS public.appointments CASCADE;
DROP TABLE IF EXISTS public.profiles CASCADE;

-- 1. Users/Profiles Table (Extends Supabase Auth)
CREATE TABLE public.profiles (
    id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
    role TEXT NOT NULL CHECK (role IN ('Admin', 'Doctor', 'Nurse', 'Staff', 'Patient')),
    full_name TEXT NOT NULL,
    contact_info TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS for Profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own profile" 
  ON public.profiles FOR SELECT 
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" 
  ON public.profiles FOR UPDATE 
  USING (auth.uid() = id);

-- 2. Appointments Table
CREATE TABLE public.appointments (
    appointment_id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    patient_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    scheduled_date TIMESTAMPTZ NOT NULL,
    qr_code_hash TEXT UNIQUE NOT NULL,
    purpose TEXT NOT NULL DEFAULT 'General' CHECK (purpose IN ('Student', 'Non-Professional', 'Professional', 'Conversion', 'General')),
    status TEXT NOT NULL DEFAULT 'Pending' CHECK (status IN ('Pending', 'Checked-In', 'Completed', 'Cancelled')),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS for Appointments
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;

-- 3. Queue_Logs Table (Live Queue)
CREATE TABLE public.queue_logs (
    log_id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    appointment_id UUID REFERENCES public.appointments(appointment_id) ON DELETE CASCADE,
    patient_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    queue_number INTEGER NOT NULL,
    status TEXT NOT NULL CHECK (status IN ('Waiting', 'In Triage', 'In Consultation', 'Completed')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.queue_logs ENABLE ROW LEVEL SECURITY;

-- 4. Patient_Records Table (EHR)
CREATE TABLE public.patient_records (
    record_id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    appointment_id UUID REFERENCES public.appointments(appointment_id) ON DELETE CASCADE,
    vitals JSONB DEFAULT '{}'::jsonb,
    medical_tests JSONB DEFAULT '{}'::jsonb,
    physical_assessment JSONB DEFAULT '{}'::jsonb,
    digital_signature TEXT,
    is_finalized BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.patient_records ENABLE ROW LEVEL SECURITY;

-- 5. Payments Table
CREATE TABLE public.payments (
    payment_id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    appointment_id UUID REFERENCES public.appointments(appointment_id) ON DELETE CASCADE,
    estimated_amount NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
    final_amount NUMERIC(10, 2),
    discount_type TEXT DEFAULT 'None',
    receipt_url TEXT,
    is_finalized BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;

-- 6. Inventory Table
CREATE TABLE public.inventory (
    item_id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    category TEXT,
    stock_level INTEGER NOT NULL DEFAULT 0,
    reorder_threshold INTEGER NOT NULL DEFAULT 10,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.inventory ENABLE ROW LEVEL SECURITY;

-- 7. Maintenance Table
CREATE TABLE public.equipment_maintenance (
    equipment_id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    last_maintenance_date DATE,
    next_calibration_date DATE,
    log_details TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.equipment_maintenance ENABLE ROW LEVEL SECURITY;

-- Function to handle timestamp updates
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for updated_at
CREATE TRIGGER update_profiles_modtime BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_queue_logs_modtime BEFORE UPDATE ON public.queue_logs FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_patient_records_modtime BEFORE UPDATE ON public.patient_records FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_payments_modtime BEFORE UPDATE ON public.payments FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_inventory_modtime BEFORE UPDATE ON public.inventory FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_maintenance_modtime BEFORE UPDATE ON public.equipment_maintenance FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 8. Automatically create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
    COALESCE(NEW.raw_user_meta_data->>'role', 'Patient')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
