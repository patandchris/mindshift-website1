-- Add missing RLS policies to user_roles table to prevent privilege escalation
-- Only admins can grant, modify, or revoke roles

-- Prevent unauthorized role creation
CREATE POLICY "Only admins can insert roles"
ON public.user_roles
FOR INSERT
TO authenticated
WITH CHECK (public.is_admin(auth.uid()));

-- Prevent unauthorized role modifications
CREATE POLICY "Only admins can update roles"
ON public.user_roles
FOR UPDATE
TO authenticated
USING (public.is_admin(auth.uid()));

-- Prevent unauthorized role deletion
CREATE POLICY "Only admins can delete roles"
ON public.user_roles
FOR DELETE
TO authenticated
USING (public.is_admin(auth.uid()));