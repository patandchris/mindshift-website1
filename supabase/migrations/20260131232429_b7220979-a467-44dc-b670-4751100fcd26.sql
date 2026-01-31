-- Add unique constraint for member_content_progress upsert
ALTER TABLE public.member_content_progress 
ADD CONSTRAINT member_content_progress_member_content_unique 
UNIQUE (member_id, content_id);

-- Make week1-content bucket public so authenticated users can access files
UPDATE storage.buckets SET public = true WHERE id = 'week1-content';

-- Add RLS policy for public read access to week1-content bucket
CREATE POLICY "Authenticated users can read week1 content"
ON storage.objects FOR SELECT
USING (bucket_id = 'week1-content' AND auth.role() = 'authenticated');

-- Insert the Week 1 content items into the database
INSERT INTO public.week1_content (title, description, content_type, file_url, display_order, duration_seconds)
VALUES 
  ('The MindShift Coaching Program Introduction', 'Welcome to the MindShift System. Learn what to expect from your transformation journey.', 'audio', 'https://onbxflybhvpksyxpsdxm.supabase.co/storage/v1/object/public/week1-content/1-mindshift-introduction.mp3', 1, 660),
  ('Week 1 Plan', 'Your roadmap for Week 1. Understand the structure and goals of this week''s program.', 'audio', 'https://onbxflybhvpksyxpsdxm.supabase.co/storage/v1/object/public/week1-content/2-week-1-plan.mp3', 2, 240),
  ('Introduction to Hypnosis', 'Discover how hypnosis works and why it''s a powerful tool for transformation.', 'audio', 'https://onbxflybhvpksyxpsdxm.supabase.co/storage/v1/object/public/week1-content/3-introduction-to-hypnosis.mp3', 3, 360),
  ('Success Fundamental: Beliefs', 'Explore how your beliefs shape your reality and learn to identify limiting beliefs.', 'audio', 'https://onbxflybhvpksyxpsdxm.supabase.co/storage/v1/object/public/week1-content/4-success-fundamental-beliefs.mp3', 4, 600),
  ('Hypnosis: Motivation & Confidence (Daytime)', 'A daytime hypnosis session to boost your motivation and confidence. Listen during the day.', 'audio', 'https://onbxflybhvpksyxpsdxm.supabase.co/storage/v1/object/public/week1-content/8-hypnosis-motivation-daytime.mp3', 5, 840),
  ('Hypnosis: Motivation & Confidence (Nighttime)', 'An evening hypnosis session. Listen 5+ nights per week when going to bed.', 'audio', 'https://onbxflybhvpksyxpsdxm.supabase.co/storage/v1/object/public/week1-content/9-hypnosis-motivation-nighttime.mp3', 6, 780),
  ('Week 1 Instructions', 'Your complete guide for Week 1 with step-by-step instructions and mindset focus.', 'pdf', 'https://onbxflybhvpksyxpsdxm.supabase.co/storage/v1/object/public/week1-content/instructions-week-1.pdf', 7, NULL),
  ('Beliefs Questionnaire', 'Complete this questionnaire to uncover your limiting beliefs about success and money.', 'document', 'https://onbxflybhvpksyxpsdxm.supabase.co/storage/v1/object/public/week1-content/5-beliefs-questionnaire.docx', 8, NULL);