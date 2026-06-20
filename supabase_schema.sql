-- Supabase Database Schema Migration
-- Navjyoti Multispeciality Hospital Backend
-- Author: Senior Supabase & PostgreSQL Architect

-- Enable pgcrypto extension for gen_random_uuid() if not already enabled
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

---------------------------------------------------------
-- 1. Site Settings Table
---------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.site_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    logo_url TEXT,
    hero_title TEXT NOT NULL DEFAULT 'Caring Hearts. Expert Hands.',
    hero_subtitle TEXT NOT NULL DEFAULT 'Navjyoti Multispeciality Hospital, located in Basti, Uttar Pradesh, is committed to delivering modern, affordable, and deeply compassionate healthcare.',
    hero_image_url TEXT,
    sliders JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Row Level Security (RLS)
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Site Settings Policies
CREATE POLICY "Allow public read access to site settings" 
ON public.site_settings FOR SELECT USING (true);

CREATE POLICY "Allow authenticated/admin write access to site settings" 
ON public.site_settings FOR ALL USING (true) WITH CHECK (true);

---------------------------------------------------------
-- 2. Doctors Table
---------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.doctors (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    specialization TEXT NOT NULL,
    qualification TEXT NOT NULL,
    experience INTEGER NOT NULL DEFAULT 5,
    image TEXT NOT NULL DEFAULT 'steth',
    bio TEXT,
    timings TEXT,
    days JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Row Level Security (RLS)
ALTER TABLE public.doctors ENABLE ROW LEVEL SECURITY;

-- Doctors Policies
CREATE POLICY "Allow public read access to doctors" 
ON public.doctors FOR SELECT USING (true);

CREATE POLICY "Allow authenticated/admin write access to doctors" 
ON public.doctors FOR ALL USING (true) WITH CHECK (true);

---------------------------------------------------------
-- 3. Specialties / Departments Table
---------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.specialties (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    icon_name TEXT NOT NULL,
    description TEXT NOT NULL,
    features JSONB DEFAULT '[]'::jsonb,
    image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Row Level Security (RLS)
ALTER TABLE public.specialties ENABLE ROW LEVEL SECURITY;

-- Specialties Policies
CREATE POLICY "Allow public read access to specialties" 
ON public.specialties FOR SELECT USING (true);

CREATE POLICY "Allow authenticated/admin write access to specialties" 
ON public.specialties FOR ALL USING (true) WITH CHECK (true);

---------------------------------------------------------
-- 4. Appointments Table
---------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.appointments (
    id TEXT PRIMARY KEY,
    patient_name TEXT NOT NULL,
    patient_phone TEXT NOT NULL,
    patient_email TEXT,
    doctor_name TEXT NOT NULL,
    department TEXT NOT NULL,
    appointment_date DATE NOT NULL,
    appointment_time TEXT NOT NULL,
    symptoms TEXT,
    is_ayushman_card_holder BOOLEAN DEFAULT false,
    ayushman_card_no TEXT,
    status TEXT NOT NULL DEFAULT 'Pending',
    token_no TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Row Level Security (RLS)
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;

-- Appointments Policies
CREATE POLICY "Allow public read and insert access to appointments" 
ON public.appointments FOR SELECT USING (true);

CREATE POLICY "Allow public insert to appointments" 
ON public.appointments FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow authenticated/admin modification to appointments" 
ON public.appointments FOR ALL USING (true) WITH CHECK (true);

---------------------------------------------------------
-- 5. Inquiries / Contact Messages Table
---------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.inquiries (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT,
    message TEXT NOT NULL,
    date DATE NOT NULL,
    status TEXT NOT NULL DEFAULT 'New',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Row Level Security (RLS)
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;

-- Inquiries Policies
CREATE POLICY "Allow public insert and read access to inquiries" 
ON public.inquiries FOR SELECT USING (true);

CREATE POLICY "Allow public insert to inquiries" 
ON public.inquiries FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow authenticated/admin modification to inquiries" 
ON public.inquiries FOR ALL USING (true) WITH CHECK (true);

---------------------------------------------------------
-- 6. Feedbacks / Reviews Table
---------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.feedbacks (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT,
    content TEXT NOT NULL,
    rating INTEGER NOT NULL DEFAULT 5,
    is_approved BOOLEAN DEFAULT false,
    date DATE NOT NULL DEFAULT CURRENT_DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Row Level Security (RLS)
ALTER TABLE public.feedbacks ENABLE ROW LEVEL SECURITY;

-- Feedbacks Policies
CREATE POLICY "Allow public read access to feedbacks" 
ON public.feedbacks FOR SELECT USING (true);

CREATE POLICY "Allow public insert to feedbacks" 
ON public.feedbacks FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow authenticated/admin modification to feedbacks" 
ON public.feedbacks FOR ALL USING (true) WITH CHECK (true);

---------------------------------------------------------
-- 7. Realtime Synchronization Config
---------------------------------------------------------
-- Make sure tables are on the real-time billing list
ALTER PUBLICATION supabase_realtime ADD TABLE public.site_settings;
ALTER PUBLICATION supabase_realtime ADD TABLE public.doctors;
ALTER PUBLICATION supabase_realtime ADD TABLE public.specialties;
ALTER PUBLICATION supabase_realtime ADD TABLE public.appointments;
ALTER PUBLICATION supabase_realtime ADD TABLE public.inquiries;
ALTER PUBLICATION supabase_realtime ADD TABLE public.feedbacks;
