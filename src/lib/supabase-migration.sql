-- ====================================================================
-- INDOCHINE REMOTE — DATABASE SCHEMA & ROW LEVEL SECURITY (RLS)
-- Target Database: PostgreSQL 15+ / Supabase
-- Author: Antigravity Architect
-- ====================================================================

-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. ENUMS
CREATE TYPE user_role AS ENUM ('admin', 'client');
CREATE TYPE order_status AS ENUM ('pending', 'paid', 'failed', 'refunded');
CREATE TYPE payment_gateway AS ENUM ('prodamus', 'lava', 'cryptomus', 'viet_qr', 'manual');
CREATE TYPE project_stage AS ENUM (
  'questionnaire_completed',
  'research_in_progress',
  'plan_ready',
  'in_progress',
  'completed'
);
CREATE TYPE noise_status AS ENUM ('verified_quiet', 'acceptable_minor_traffic', 'high_construction_risk');

-- 3. PROFILES / USERS TABLE
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  phone TEXT,
  telegram_handle TEXT,
  role user_role DEFAULT 'client' NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 4. ORDERS & PAYMENT TRANSACTIONS
CREATE TABLE IF NOT EXISTS public.orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  order_number TEXT UNIQUE NOT NULL,
  tier_id TEXT NOT NULL, -- 'tier1', 'tier2', 'tier3', 'tier4'
  amount_usd NUMERIC(10, 2) NOT NULL,
  amount_settled NUMERIC(15, 2),
  currency TEXT DEFAULT 'USD' NOT NULL,
  gateway payment_gateway NOT NULL,
  gateway_order_id TEXT,
  gateway_tx_hash TEXT,
  status order_status DEFAULT 'pending' NOT NULL,
  paid_at TIMESTAMPTZ,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 5. CLIENT RELOCATION PROJECTS
CREATE TABLE IF NOT EXISTS public.client_projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID UNIQUE REFERENCES public.profiles(id) ON DELETE CASCADE,
  order_id UUID REFERENCES public.orders(id) ON DELETE SET NULL,
  status project_stage DEFAULT 'questionnaire_completed' NOT NULL,
  tier_id TEXT NOT NULL,
  recommended_city_id TEXT DEFAULT 'danang',
  recommended_city_why JSONB DEFAULT '{"en": "", "ru": ""}'::jsonb,
  overall_founder_note JSONB DEFAULT '{"en": "", "ru": ""}'::jsonb,
  user_current_budget JSONB DEFAULT '{"accommodation": 500, "food": 400, "coworking": 100, "transportation": 80, "entertainment": 150}'::jsonb,
  questionnaire_data JSONB NOT NULL,
  sla_deadline TIMESTAMPTZ,
  has_unpublished_changes BOOLEAN DEFAULT FALSE NOT NULL,
  last_published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 6. VERIFIED HOUSING OPTIONS (Added by Founder)
CREATE TABLE IF NOT EXISTS public.verified_housing (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID REFERENCES public.client_projects(id) ON DELETE CASCADE,
  condo_name TEXT NOT NULL,
  city_id TEXT NOT NULL,
  district TEXT NOT NULL,
  address_snippet TEXT NOT NULL,
  monthly_price_usd NUMERIC(10, 2) NOT NULL,
  monthly_price_vnd BIGINT NOT NULL,
  evn_tariff_vnd_per_kwh INTEGER NOT NULL DEFAULT 2800,
  is_direct_evn_meter BOOLEAN DEFAULT TRUE NOT NULL,
  deposit_terms JSONB NOT NULL,
  realtor_contact JSONB,
  noise_audit JSONB NOT NULL,
  fiber_internet_speed JSONB NOT NULL,
  child_friendly_features TEXT[],
  photo_urls TEXT[] DEFAULT ARRAY[]::TEXT[],
  video_tour_url TEXT,
  founder_review JSONB NOT NULL,
  contract_audited BOOLEAN DEFAULT TRUE NOT NULL,
  is_top_pick BOOLEAN DEFAULT FALSE NOT NULL,
  published_to_client BOOLEAN DEFAULT FALSE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 7. ROADMAP TASKS
CREATE TABLE IF NOT EXISTS public.roadmap_tasks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID REFERENCES public.client_projects(id) ON DELETE CASCADE,
  phase TEXT NOT NULL, -- 'before_arrival', 'arrival_week', 'first_month'
  title JSONB NOT NULL,
  description JSONB NOT NULL,
  completed BOOLEAN DEFAULT FALSE NOT NULL,
  order_index INTEGER DEFAULT 0 NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ====================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- Strict Isolation: Clients only access their own data, Founder accesses all
-- ====================================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.client_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.verified_housing ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.roadmap_tasks ENABLE ROW LEVEL SECURITY;

-- Helper function: Check if current authenticated user is Admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Profiles Policies
CREATE POLICY "Users can view their own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id OR public.is_admin());

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id OR public.is_admin());

-- Orders Policies
CREATE POLICY "Clients can view their own orders"
  ON public.orders FOR SELECT
  USING (user_id = auth.uid() OR public.is_admin());

CREATE POLICY "Admin full access to orders"
  ON public.orders FOR ALL
  USING (public.is_admin());

-- Client Projects Policies
CREATE POLICY "Clients can view their own relocation project"
  ON public.client_projects FOR SELECT
  USING (user_id = auth.uid() OR public.is_admin());

CREATE POLICY "Admin full access to client projects"
  ON public.client_projects FOR ALL
  USING (public.is_admin());

-- Verified Housing Policies
CREATE POLICY "Clients can view only PUBLISHED housing for their project"
  ON public.verified_housing FOR SELECT
  USING (
    public.is_admin() OR
    (published_to_client = TRUE AND project_id IN (
      SELECT id FROM public.client_projects WHERE user_id = auth.uid()
    ))
  );

CREATE POLICY "Admin full access to verified housing"
  ON public.verified_housing FOR ALL
  USING (public.is_admin());

-- Roadmap Tasks Policies
CREATE POLICY "Clients can view their roadmap tasks"
  ON public.roadmap_tasks FOR SELECT
  USING (
    public.is_admin() OR
    project_id IN (
      SELECT id FROM public.client_projects WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Clients can toggle task completion"
  ON public.roadmap_tasks FOR UPDATE
  USING (
    project_id IN (
      SELECT id FROM public.client_projects WHERE user_id = auth.uid()
    )
  )
  WITH CHECK (
    project_id IN (
      SELECT id FROM public.client_projects WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Admin full access to roadmap tasks"
  ON public.roadmap_tasks FOR ALL
  USING (public.is_admin());

-- ====================================================================
-- INDEXES FOR PERFORMANCE
-- ====================================================================
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON public.orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON public.orders(status);
CREATE INDEX IF NOT EXISTS idx_projects_user_id ON public.client_projects(user_id);
CREATE INDEX IF NOT EXISTS idx_housing_project_id ON public.verified_housing(project_id);
CREATE INDEX IF NOT EXISTS idx_roadmap_project_id ON public.roadmap_tasks(project_id);
