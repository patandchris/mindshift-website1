-- Fix 1: Create a secure view for week1_members that hides sensitive fields
-- This view excludes email and HubSpot integration details from regular users
CREATE VIEW public.week1_members_public
WITH (security_invoker=on) AS
SELECT 
  id, 
  user_id, 
  status, 
  progress_percentage, 
  registered_at, 
  started_at, 
  completed_at, 
  last_activity_at,
  created_at,
  updated_at
FROM public.week1_members;
-- Excludes: email, hubspot_contact_id, hubspot_sync_status, hubspot_last_synced_at

-- Grant access to the view for authenticated users
GRANT SELECT ON public.week1_members_public TO authenticated;

-- Fix 2: Update week1_content policy to require enrollment
-- Drop the overly permissive policy
DROP POLICY IF EXISTS "Authenticated users can view content" ON public.week1_content;

-- Create new policy that checks for enrollment in week1_members
CREATE POLICY "Enrolled members can view content"
ON public.week1_content FOR SELECT
TO authenticated
USING (
  -- Check if user is an enrolled member
  EXISTS (
    SELECT 1 FROM public.week1_members
    WHERE user_id = auth.uid()
  )
  OR public.is_admin(auth.uid())
);