-- Drop existing trigger and function
DROP TRIGGER IF EXISTS update_member_progress_trigger ON public.member_content_progress;
DROP FUNCTION IF EXISTS public.update_member_progress();

-- Create new function that only counts audio content
-- and treats the two hypnosis files (display_order 5 and 6) as one item
CREATE OR REPLACE FUNCTION public.update_member_progress()
RETURNS TRIGGER AS $$
DECLARE
    member_record RECORD;
    total_items INTEGER;
    completed_items INTEGER;
    new_percentage INTEGER;
    new_status TEXT;
    hypnosis_completed BOOLEAN;
BEGIN
    -- Get member info
    SELECT * INTO member_record FROM public.week1_members WHERE id = COALESCE(NEW.member_id, OLD.member_id);
    
    -- Count total audio content items (excluding one hypnosis since they count as one)
    -- display_order 1-4 = 4 items, display_order 5-6 = 1 item (hypnosis counts as one)
    -- Total = 5 items for 100%
    total_items := 5;
    
    -- Count completed items for display_order 1-4 (first 4 audio lessons)
    SELECT COUNT(*) INTO completed_items
    FROM public.member_content_progress mcp
    JOIN public.week1_content wc ON mcp.content_id = wc.id
    WHERE mcp.member_id = COALESCE(NEW.member_id, OLD.member_id)
    AND mcp.is_completed = true
    AND wc.content_type = 'audio'
    AND wc.display_order BETWEEN 1 AND 4;
    
    -- Check if either hypnosis file (display_order 5 or 6) is completed
    SELECT EXISTS (
        SELECT 1
        FROM public.member_content_progress mcp
        JOIN public.week1_content wc ON mcp.content_id = wc.id
        WHERE mcp.member_id = COALESCE(NEW.member_id, OLD.member_id)
        AND mcp.is_completed = true
        AND wc.content_type = 'audio'
        AND wc.display_order IN (5, 6)
    ) INTO hypnosis_completed;
    
    -- Add 1 if hypnosis is completed
    IF hypnosis_completed THEN
        completed_items := completed_items + 1;
    END IF;
    
    -- Calculate percentage
    IF total_items > 0 THEN
        new_percentage := ROUND((completed_items::NUMERIC / total_items::NUMERIC) * 100);
    ELSE
        new_percentage := 0;
    END IF;
    
    -- Determine status
    IF new_percentage = 0 THEN
        new_status := 'not_started';
    ELSIF new_percentage = 100 THEN
        new_status := 'completed';
    ELSE
        new_status := 'in_progress';
    END IF;
    
    -- Update member record
    UPDATE public.week1_members
    SET 
        progress_percentage = new_percentage,
        status = new_status::member_status,
        last_activity_at = NOW(),
        started_at = COALESCE(started_at, CASE WHEN new_percentage > 0 THEN NOW() ELSE NULL END),
        completed_at = CASE WHEN new_percentage = 100 THEN NOW() ELSE NULL END,
        updated_at = NOW()
    WHERE id = COALESCE(NEW.member_id, OLD.member_id);
    
    RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Create trigger
CREATE TRIGGER update_member_progress_trigger
AFTER INSERT OR UPDATE OR DELETE ON public.member_content_progress
FOR EACH ROW
EXECUTE FUNCTION public.update_member_progress();

-- Reset all existing member progress to 0 so it recalculates correctly
UPDATE public.week1_members SET progress_percentage = 0, status = 'not_started';