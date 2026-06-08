
-- Roles
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role public.app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

CREATE POLICY "Users read own roles"
ON public.user_roles FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Admins read all roles"
ON public.user_roles FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Enquiries
CREATE TYPE public.enquiry_status AS ENUM ('pending', 'confirmed', 'completed', 'cancelled');

CREATE TABLE public.enquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  service_type TEXT NOT NULL,
  pickup TEXT NOT NULL,
  drop_location TEXT,
  travel_date DATE,
  travel_time TEXT,
  passengers INTEGER,
  notes TEXT,
  status public.enquiry_status NOT NULL DEFAULT 'pending'
);

GRANT SELECT ON public.enquiries TO anon;
GRANT INSERT ON public.enquiries TO anon, authenticated;
GRANT SELECT, UPDATE, DELETE ON public.enquiries TO authenticated;
GRANT ALL ON public.enquiries TO service_role;

ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit an enquiry"
ON public.enquiries FOR INSERT
TO anon, authenticated
WITH CHECK (true);

CREATE POLICY "Admins can view enquiries"
ON public.enquiries FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update enquiries"
ON public.enquiries FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete enquiries"
ON public.enquiries FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE INDEX enquiries_created_at_idx ON public.enquiries (created_at DESC);
CREATE INDEX enquiries_status_idx ON public.enquiries (status);
