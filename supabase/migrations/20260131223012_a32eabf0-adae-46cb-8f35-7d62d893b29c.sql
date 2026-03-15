-- Create member status enum for HubSpot-compatible categorization
CREATE TYPE public.member_status AS ENUM ('not_started', 'in_progress', 'completed');

-- Create week1_members table for tracking member access and progress
CREATE TABLE public.week1_members (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
    email TEXT NOT NULL,
    status public.member_status NOT NULL DEFAULT 'not_started',
    progress_percentage INTEGER NOT NULL DEFAULT 0 CHECK (progress_percentage >= 0 AND progress_percentage <= 100),
    registered_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    started_at TIMESTAMP WITH TIME ZONE,
    completed_at TIMESTAMP WITH TIME ZONE,
    last_activity_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    -- HubSpot-compatible fields
    hubspot_contact_id TEXT,
    hubspot_sync_status TEXT DEFAULT 'pending',
    hubspot_last_synced_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create week1_content table for the 8 content items (6 audio + 2 documents)
CREATE TABLE public.week1_content (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    content_type TEXT NOT NULL CHECK (content_type IN ('audio', 'pdf', 'document')),
    file_url TEXT,
    display_order INTEGER NOT NULL,
    duration_seconds INTEGER, -- for audio files
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create member_content_progress table for tracking individual content completion
CREATE TABLE public.member_content_progress (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    member_id UUID REFERENCES public.week1_members(id) ON DELETE CASCADE NOT NULL,
    content_id UUID REFERENCES public.week1_content(id) ON DELETE CASCADE NOT NULL,
    is_completed BOOLEAN NOT NULL DEFAULT false,
    playback_position INTEGER DEFAULT 0, -- for audio: seconds played
    started_at TIMESTAMP WITH TIME ZONE,
    completed_at TIMESTAMP WITH TIME ZONE,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE(member_id, content_id)
);

-- Enable Row Level Security
ALTER TABLE public.week1_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.week1_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.member_content_progress ENABLE ROW LEVEL SECURITY;

-- RLS Policies for week1_members
CREATE POLICY "Users can view their own member record"
ON public.week1_members
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own member record"
ON public.week1_members
FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own member record"
ON public.week1_members
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can view all member records"
ON public.week1_members
FOR SELECT
USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can update all member records"
ON public.week1_members
FOR UPDATE
USING (public.is_admin(auth.uid()));

-- RLS Policies for week1_content (public read for authenticated users)
CREATE POLICY "Authenticated users can view content"
ON public.week1_content
FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Admins can manage content"
ON public.week1_content
FOR ALL
USING (public.is_admin(auth.uid()));

-- RLS Policies for member_content_progress
CREATE POLICY "Users can view their own progress"
ON public.member_content_progress
FOR SELECT
USING (member_id IN (SELECT id FROM public.week1_members WHERE user_id = auth.uid()));

CREATE POLICY "Users can update their own progress"
ON public.member_content_progress
FOR UPDATE
USING (member_id IN (SELECT id FROM public.week1_members WHERE user_id = auth.uid()));

CREATE POLICY "Users can insert their own progress"
ON public.member_content_progress
FOR INSERT
WITH CHECK (member_id IN (SELECT id FROM public.week1_members WHERE user_id = auth.uid()));

CREATE POLICY "Admins can view all progress"
ON public.member_content_progress
FOR SELECT
USING (public.is_admin(auth.uid()));

-- Create function to update member status based on progress
CREATE OR REPLACE FUNCTION public.update_member_status()
RETURNS TRIGGER AS $$
DECLARE
    total_content INTEGER;
    completed_content INTEGER;
    member_record RECORD;
    new_percentage INTEGER;
    new_status public.member_status;
BEGIN
    -- Get the member record
    SELECT * INTO member_record FROM public.week1_members WHERE id = NEW.member_id;
    
    -- Count total and completed content
    SELECT COUNT(*) INTO total_content FROM public.week1_content;
    SELECT COUNT(*) INTO completed_content 
    FROM public.member_content_progress 
    WHERE member_id = NEW.member_id AND is_completed = true;
    
    -- Calculate percentage
    IF total_content > 0 THEN
        new_percentage := (completed_content * 100) / total_content;
    ELSE
        new_percentage := 0;
    END IF;
    
    -- Determine status
    IF completed_content = 0 THEN
        new_status := 'not_started';
    ELSIF completed_content >= total_content THEN
        new_status := 'completed';
    ELSE
        new_status := 'in_progress';
    END IF;
    
    -- Update member record
    UPDATE public.week1_members
    SET 
        progress_percentage = new_percentage,
        status = new_status,
        started_at = CASE 
            WHEN started_at IS NULL AND new_status != 'not_started' THEN now()
            ELSE started_at
        END,
        completed_at = CASE 
            WHEN new_status = 'completed' AND completed_at IS NULL THEN now()
            ELSE completed_at
        END,
        last_activity_at = now(),
        updated_at = now(),
        hubspot_sync_status = 'pending'
    WHERE id = NEW.member_id;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Create trigger for automatic status updates
CREATE TRIGGER update_member_status_trigger
AFTER INSERT OR UPDATE ON public.member_content_progress
FOR EACH ROW
EXECUTE FUNCTION public.update_member_status();

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_week1_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_week1_members_updated_at
BEFORE UPDATE ON public.week1_members
FOR EACH ROW
EXECUTE FUNCTION public.update_week1_updated_at();

-- Insert initial Week 1 content items (6 audio + 2 documents)
INSERT INTO public.week1_content (title, description, content_type, display_order) VALUES
('Introduction to Beliefs', 'Understanding how beliefs shape your reality and drive your results', 'audio', 1),
('The Formation of Limiting Beliefs', 'Discover where your unconscious programming originated', 'audio', 2),
('Guided Hypnosis Session', 'Deep relaxation session to begin reprogramming your unconscious mind', 'audio', 3),
('Belief Awareness Meditation', 'A guided meditation to identify hidden limiting beliefs', 'audio', 4),
('NLP Change Pattern Audio', 'Neuro-linguistic programming technique for belief transformation', 'audio', 5),
('Integration & Next Steps', 'Consolidating your learning and preparing for Week 2', 'audio', 6),
('Week 1 Workbook', 'Complete PDF workbook with exercises and reflection prompts', 'pdf', 7),
('Belief Mapping Template', 'Document template for mapping your belief systems', 'document', 8);

-- Create storage bucket for week1 content files
INSERT INTO storage.buckets (id, name, public) 
VALUES ('week1-content', 'week1-content', false)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for week1-content bucket
CREATE POLICY "Authenticated users can view week1 content files"
ON storage.objects
FOR SELECT
TO authenticated
USING (bucket_id = 'week1-content');

CREATE POLICY "Admins can upload week1 content files"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'week1-content' AND public.is_admin(auth.uid()));

CREATE POLICY "Admins can update week1 content files"
ON storage.objects
FOR UPDATE
TO authenticated
USING (bucket_id = 'week1-content' AND public.is_admin(auth.uid()));

CREATE POLICY "Admins can delete week1 content files"
ON storage.objects
FOR DELETE
TO authenticated
USING (bucket_id = 'week1-content' AND public.is_admin(auth.uid()));