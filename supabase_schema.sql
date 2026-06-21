-- Supabase Database Schema Migration
-- Navjyoti Multispeciality Hospital Backend
-- Author: Senior Supabase & PostgreSQL Architect

-- Enable pgcrypto extension for gen_random_uuid() if not already enabled
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

---------------------------------------------------------
-- 1. Site Settings Table
---------------------------------------------------------
-- Represents general hospital parameters, biography assets, leadership messages,
-- medical registration logs, and custom empanelled cashless health systems.
CREATE TABLE IF NOT EXISTS public.site_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    logo_url TEXT,
    hero_title TEXT NOT NULL DEFAULT 'Caring Hearts. Expert Hands.',
    hero_subtitle TEXT NOT NULL DEFAULT 'Navjyoti Multispeciality Hospital, located in Basti, Uttar Pradesh, is committed to delivering modern, affordable, and deeply compassionate healthcare.',
    hero_image_url TEXT,
    
    -- Sliders & Nested JSONB configuration schema.
    -- Stores structured content safely to support instant NoSQL structures inside PostgreSQL.
    -- Structure: {
    --   "slides": [{ "image": "...", "title": "...", "subtitle": "..." }],
    --   "aboutPhotoUrl": "...", -- Biography/accreditation section photograph
    --   "directorName": "...", "directorPhotoUrl": "...", "directorQualification": "...", "directorBio": "...",
    --   "chairmanName": "...", "chairmanPhotoUrl": "...", "chairmanQualification": "...", "chairmanBio": "...",
    --   "credentials": [{ "id": "...", "title": "...", "fileUrl": "...", "date": "..." }], -- Accreditations & Certificates
    --   "gallery": [{ "id": "...", "title": "...", "type": "image|video", "url": "..." }], -- Photo/Video Tour Assets
    --   "tpaFacilities": [{ "id": "...", "name": "...", "description": "...", "logoUrl": "..." }], -- TPA Cashless partner lists
    --   "announcementPopup": { "enabled": true|false, "title": "...", "message": "...", "badgeText": "...", ... }
    -- }
    sliders JSONB DEFAULT '{"slides": [], "credentials": [], "gallery": [], "tpaFacilities": [], "announcementPopup": {"enabled": false}}'::jsonb,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Row Level Security (RLS)
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Site Settings Policies
DROP POLICY IF EXISTS "Allow public read access to site settings" ON public.site_settings;
CREATE POLICY "Allow public read access to site settings" 
ON public.site_settings FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow authenticated/admin write access to site settings" ON public.site_settings;
CREATE POLICY "Allow authenticated/admin write access to site settings" 
ON public.site_settings FOR ALL USING (id IS NOT NULL) WITH CHECK (hero_title IS NOT NULL);

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
DROP POLICY IF EXISTS "Allow public read access to doctors" ON public.doctors;
CREATE POLICY "Allow public read access to doctors" 
ON public.doctors FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow authenticated/admin write access to doctors" ON public.doctors;
CREATE POLICY "Allow authenticated/admin write access to doctors" 
ON public.doctors FOR ALL USING (id IS NOT NULL) WITH CHECK (name IS NOT NULL);

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
DROP POLICY IF EXISTS "Allow public read access to specialties" ON public.specialties;
CREATE POLICY "Allow public read access to specialties" 
ON public.specialties FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow authenticated/admin write access to specialties" ON public.specialties;
CREATE POLICY "Allow authenticated/admin write access to specialties" 
ON public.specialties FOR ALL USING (id IS NOT NULL) WITH CHECK (title IS NOT NULL);

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
DROP POLICY IF EXISTS "Allow public read and insert access to appointments" ON public.appointments;
CREATE POLICY "Allow public read and insert access to appointments" 
ON public.appointments FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public insert to appointments" ON public.appointments;
CREATE POLICY "Allow public insert to appointments" 
ON public.appointments FOR INSERT WITH CHECK (patient_name IS NOT NULL);

DROP POLICY IF EXISTS "Allow authenticated/admin modification to appointments" ON public.appointments;
CREATE POLICY "Allow authenticated/admin modification to appointments" 
ON public.appointments FOR ALL USING (id IS NOT NULL) WITH CHECK (patient_name IS NOT NULL);

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
DROP POLICY IF EXISTS "Allow public insert and read access to inquiries" ON public.inquiries;
CREATE POLICY "Allow public insert and read access to inquiries" 
ON public.inquiries FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public insert to inquiries" ON public.inquiries;
CREATE POLICY "Allow public insert to inquiries" 
ON public.inquiries FOR INSERT WITH CHECK (name IS NOT NULL);

DROP POLICY IF EXISTS "Allow authenticated/admin modification to inquiries" ON public.inquiries;
CREATE POLICY "Allow authenticated/admin modification to inquiries" 
ON public.inquiries FOR ALL USING (id IS NOT NULL) WITH CHECK (name IS NOT NULL);

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
DROP POLICY IF EXISTS "Allow public read access to feedbacks" ON public.feedbacks;
CREATE POLICY "Allow public read access to feedbacks" 
ON public.feedbacks FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public insert to feedbacks" ON public.feedbacks;
CREATE POLICY "Allow public insert to feedbacks" 
ON public.feedbacks FOR INSERT WITH CHECK (name IS NOT NULL);

DROP POLICY IF EXISTS "Allow authenticated/admin modification to feedbacks" ON public.feedbacks;
CREATE POLICY "Allow authenticated/admin modification to feedbacks" 
ON public.feedbacks FOR ALL USING (id IS NOT NULL) WITH CHECK (name IS NOT NULL);

---------------------------------------------------------
-- 6.5. News and Events Table
---------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.news_events (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    post TEXT NOT NULL,
    date_time TEXT NOT NULL,
    location TEXT NOT NULL,
    photo_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Row Level Security (RLS)
ALTER TABLE public.news_events ENABLE ROW LEVEL SECURITY;

-- News Events Policies
DROP POLICY IF EXISTS "Allow public read access to news_events" ON public.news_events;
CREATE POLICY "Allow public read access to news_events" 
ON public.news_events FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow authenticated/admin write access to news_events" ON public.news_events;
CREATE POLICY "Allow authenticated/admin write access to news_events" 
ON public.news_events FOR ALL USING (id IS NOT NULL) WITH CHECK (title IS NOT NULL);

---------------------------------------------------------
-- 7. Realtime Synchronization Config
---------------------------------------------------------
-- Safely add tables to publication without duplication errors
DO $$
DECLARE
    pub_name text := 'supabase_realtime';
    tables_to_add text[] := ARRAY[
        'public.site_settings', 
        'public.doctors', 
        'public.specialties', 
        'public.appointments', 
        'public.inquiries', 
        'public.feedbacks',
        'public.news_events'
    ];
    t text;
BEGIN
    -- Ensure publication exists
    IF NOT EXISTS (SELECT 1 FROM pg_publication WHERE pubname = pub_name) THEN
        EXECUTE format('CREATE PUBLICATION %I', pub_name);
    END IF;

    -- Add each table to publication, ignore if already present
    FOREACH t IN ARRAY tables_to_add LOOP
        BEGIN
            EXECUTE format('ALTER PUBLICATION %I ADD TABLE %s', pub_name, t);
            RAISE NOTICE 'Added table % to % publication.', t, pub_name;
        EXCEPTION
            WHEN duplicate_object THEN
                -- Already added, do nothing
                RAISE NOTICE 'Table % already in % publication.', t, pub_name;
        END;
    END LOOP;
END $$;

---------------------------------------------------------
-- 8. Security Definer Protection
---------------------------------------------------------
-- Revoke PUBLIC/anon/authenticated execution permissions on the security definer function
-- 'rls_auto_enable' to resolve Supabase Security Advisor warnings safely.
DO $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM pg_proc p 
        JOIN pg_namespace n ON p.pronamespace = n.oid 
        WHERE p.proname = 'rls_auto_enable' AND n.nspname = 'public'
    ) THEN
        REVOKE EXECUTE ON FUNCTION public.rls_auto_enable() FROM PUBLIC, anon, authenticated;
    END IF;
END $$;
