-- Create enum for user roles
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- Create user_roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE (user_id, role)
);

-- Enable RLS
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check admin role
CREATE OR REPLACE FUNCTION public.is_admin(_user_id UUID)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = 'admin'
  )
$$;

-- Allow users to view their own roles
CREATE POLICY "Users can view their own roles"
ON public.user_roles
FOR SELECT
USING (auth.uid() = user_id);

-- Drop existing storage policies for testimonials bucket
DROP POLICY IF EXISTS "Public can view testimonial videos" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload testimonial videos" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update testimonial videos" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete testimonial videos" ON storage.objects;

-- Create new admin-only storage policies
CREATE POLICY "Admins can upload testimonial videos"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'testimonials' AND 
  public.is_admin(auth.uid())
);

CREATE POLICY "Admins can update testimonial videos"
ON storage.objects
FOR UPDATE
TO authenticated
USING (
  bucket_id = 'testimonials' AND 
  public.is_admin(auth.uid())
);

CREATE POLICY "Admins can delete testimonial videos"
ON storage.objects
FOR DELETE
TO authenticated
USING (
  bucket_id = 'testimonials' AND 
  public.is_admin(auth.uid())
);

CREATE POLICY "Anyone can view testimonial videos"
ON storage.objects
FOR SELECT
USING (bucket_id = 'testimonials');