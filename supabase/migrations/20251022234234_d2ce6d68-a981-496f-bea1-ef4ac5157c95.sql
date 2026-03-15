-- Create storage bucket for testimonial videos
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'testimonials',
  'testimonials',
  true,
  52428800, -- 50MB in bytes
  ARRAY['video/mp4', 'video/quicktime', 'video/x-msvideo', 'video/webm']
);

-- Allow public read access to testimonial videos
CREATE POLICY "Public can view testimonial videos"
ON storage.objects
FOR SELECT
USING (bucket_id = 'testimonials');

-- Allow authenticated users to upload testimonial videos
CREATE POLICY "Authenticated users can upload testimonial videos"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'testimonials');

-- Allow authenticated users to update their testimonial videos
CREATE POLICY "Authenticated users can update testimonial videos"
ON storage.objects
FOR UPDATE
TO authenticated
USING (bucket_id = 'testimonials');

-- Allow authenticated users to delete testimonial videos
CREATE POLICY "Authenticated users can delete testimonial videos"
ON storage.objects
FOR DELETE
TO authenticated
USING (bucket_id = 'testimonials');