-- Create a trigger function to automatically grant admin role to test@test.com
CREATE OR REPLACE FUNCTION public.auto_grant_admin_for_test_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Check if the new user is test@test.com
  IF NEW.email = 'test@test.com' THEN
    -- Insert admin role for this user
    INSERT INTO public.user_roles (user_id, role)
    VALUES (NEW.id, 'admin')
    ON CONFLICT (user_id, role) DO NOTHING;
  END IF;
  RETURN NEW;
END;
$$;

-- Create trigger on auth.users to auto-grant admin role
-- Note: We create a trigger on the week1_members table instead since we can't attach triggers to auth.users
-- When test@test.com signs up, they'll be added to week1_members, so we trigger off that

CREATE OR REPLACE FUNCTION public.auto_grant_admin_for_test_member()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Check if the new member is test@test.com
  IF NEW.email = 'test@test.com' THEN
    -- Insert admin role for this user
    INSERT INTO public.user_roles (user_id, role)
    VALUES (NEW.user_id, 'admin')
    ON CONFLICT (user_id, role) DO NOTHING;
  END IF;
  RETURN NEW;
END;
$$;

-- Create trigger on week1_members table
DROP TRIGGER IF EXISTS auto_admin_test_user_trigger ON public.week1_members;
CREATE TRIGGER auto_admin_test_user_trigger
  AFTER INSERT ON public.week1_members
  FOR EACH ROW
  EXECUTE FUNCTION public.auto_grant_admin_for_test_member();