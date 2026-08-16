CREATE TABLE public.mindshift_applications (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  focus_area text NOT NULL,
  situation text NOT NULL,
  duration_stuck text NOT NULL,
  tried_before text NOT NULL,
  why_now text NOT NULL,
  commitment_score integer NOT NULL,
  will_participate text NOT NULL,
  financial_fit text NOT NULL,
  qualified boolean NOT NULL DEFAULT false,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_content text,
  utm_term text,
  fbclid text,
  landing_url text,
  referrer text,
  ip_hash text,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

GRANT ALL ON public.mindshift_applications TO service_role;
GRANT SELECT ON public.mindshift_applications TO authenticated;

ALTER TABLE public.mindshift_applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view applications"
ON public.mindshift_applications
FOR SELECT
TO authenticated
USING (public.is_admin(auth.uid()));

CREATE INDEX idx_mindshift_applications_created_at ON public.mindshift_applications (created_at DESC);
CREATE INDEX idx_mindshift_applications_ip_hash ON public.mindshift_applications (ip_hash, created_at DESC);