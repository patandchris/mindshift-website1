-- Update the progress calculation trigger to account for 6 lessons + 1 hypnosis
CREATE OR REPLACE FUNCTION public.update_member_progress()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $$
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
    
    -- Total = 7 items for 100% (6 audio lessons + 1 hypnosis milestone)
    -- display_order 1-6 = 6 regular audio lessons
    -- display_order 7-8 = hypnosis files (only one needs to be completed)
    total_items := 7;
    
    -- Count completed items for display_order 1-6 (first 6 audio lessons)
    SELECT COUNT(*) INTO completed_items
    FROM public.member_content_progress mcp
    JOIN public.week1_content wc ON mcp.content_id = wc.id
    WHERE mcp.member_id = COALESCE(NEW.member_id, OLD.member_id)
    AND mcp.is_completed = true
    AND wc.content_type = 'audio'
    AND wc.display_order BETWEEN 1 AND 6;
    
    -- Check if either hypnosis file (display_order 7 or 8) is completed
    SELECT EXISTS (
        SELECT 1
        FROM public.member_content_progress mcp
        JOIN public.week1_content wc ON mcp.content_id = wc.id
        WHERE mcp.member_id = COALESCE(NEW.member_id, OLD.member_id)
        AND mcp.is_completed = true
        AND wc.content_type = 'audio'
        AND wc.display_order IN (7, 8)
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
$$;

-- Reset all progress to 0 so it recalculates properly
UPDATE public.week1_members SET progress_percentage = 0, status = 'not_started';