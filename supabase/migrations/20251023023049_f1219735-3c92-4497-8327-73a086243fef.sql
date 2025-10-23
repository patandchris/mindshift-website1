-- Storage policies for admin-only uploads to 'testimonials' bucket
-- 1) Clean up any previous conflicting policies (safe if they don't exist)
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'storage' 
      AND tablename = 'objects' 
      AND policyname = 'Public can view testimonials'
  ) THEN
    DROP POLICY "Public can view testimonials" ON storage.objects;
  END IF;
  IF EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'storage' 
      AND tablename = 'objects' 
      AND policyname = 'Admins can upload testimonials'
  ) THEN
    DROP POLICY "Admins can upload testimonials" ON storage.objects;
  END IF;
  IF EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'storage' 
      AND tablename = 'objects' 
      AND policyname = 'Admins can update testimonials'
  ) THEN
    DROP POLICY "Admins can update testimonials" ON storage.objects;
  END IF;
  IF EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'storage' 
      AND tablename = 'objects' 
      AND policyname = 'Admins can delete testimonials'
  ) THEN
    DROP POLICY "Admins can delete testimonials" ON storage.objects;
  END IF;
END
$$;

-- 2) Public read (bucket marked public) - anyone can view
CREATE POLICY "Public can view testimonials"
ON storage.objects
FOR SELECT
USING (bucket_id = 'testimonials');

-- 3) Admin-only write operations
-- INSERT
CREATE POLICY "Admins can upload testimonials"
ON storage.objects
FOR INSERT TO authenticated
WITH CHECK (
  bucket_id = 'testimonials'
  AND public.is_admin(auth.uid())
);

-- UPDATE
CREATE POLICY "Admins can update testimonials"
ON storage.objects
FOR UPDATE TO authenticated
USING (
  bucket_id = 'testimonials'
  AND public.is_admin(auth.uid())
)
WITH CHECK (
  bucket_id = 'testimonials'
  AND public.is_admin(auth.uid())
);

-- DELETE
CREATE POLICY "Admins can delete testimonials"
ON storage.objects
FOR DELETE TO authenticated
USING (
  bucket_id = 'testimonials'
  AND public.is_admin(auth.uid())
);
