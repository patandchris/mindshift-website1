-- Create RPC function for checking admin status
-- This provides server-side validation that cannot be bypassed on the client
CREATE OR REPLACE FUNCTION public.check_is_admin()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT public.is_admin(auth.uid());
$$;

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION public.check_is_admin() TO authenticated;