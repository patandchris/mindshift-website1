import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Progress } from '@/components/ui/progress';
import { Loader2, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AudioLessonCard from '@/components/week1/AudioLessonCard';
import DocumentCard from '@/components/week1/DocumentCard';
import mindshiftLogo from '@/assets/mindshift-logo-new.png';
import type { User } from '@supabase/supabase-js';

interface ContentItem {
  id: string;
  title: string;
  description: string | null;
  content_type: string;
  file_url: string | null;
  display_order: number;
  duration_seconds: number | null;
}

interface ProgressItem {
  content_id: string;
  is_completed: boolean;
  playback_position: number;
}

interface MemberData {
  id: string;
  progress_percentage: number;
  status: string;
}

const WeekOneContent = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState<ContentItem[]>([]);
  const [progress, setProgress] = useState<Record<string, ProgressItem>>({});
  const [memberData, setMemberData] = useState<MemberData | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/week-one-access');
        return;
      }
      setUser(session.user);
      await loadContent(session.user.id);
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        navigate('/week-one-access');
      } else {
        setUser(session.user);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const loadContent = async (userId: string) => {
    try {
      // Load content items
      const { data: contentData, error: contentError } = await supabase
        .from('week1_content')
        .select('*')
        .order('display_order');

      if (contentError) throw contentError;
      setContent(contentData || []);

      // Load or create member record
      let { data: member, error: memberError } = await supabase
        .from('week1_members')
        .select('*')
        .eq('user_id', userId)
        .maybeSingle();

      if (memberError && memberError.code !== 'PGRST116') throw memberError;

      if (!member) {
        // Get user email
        const { data: { user } } = await supabase.auth.getUser();
        const { data: newMember, error: insertError } = await supabase
          .from('week1_members')
          .insert({
            user_id: userId,
            email: user?.email || '',
            status: 'not_started',
          })
          .select()
          .single();

        if (insertError) throw insertError;
        member = newMember;
      }

      setMemberData(member);

      // Load progress
      const { data: progressData, error: progressError } = await supabase
        .from('member_content_progress')
        .select('*')
        .eq('member_id', member.id);

      if (progressError) throw progressError;

      const progressMap: Record<string, ProgressItem> = {};
      progressData?.forEach(p => {
        progressMap[p.content_id] = {
          content_id: p.content_id,
          is_completed: p.is_completed,
          playback_position: p.playback_position || 0,
        };
      });
      setProgress(progressMap);
    } catch (error: any) {
      toast({
        title: "Error loading content",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateProgress = async (contentId: string, isCompleted: boolean, playbackPosition?: number) => {
    if (!memberData) return;

    try {
      const { error } = await supabase
        .from('member_content_progress')
        .upsert({
          member_id: memberData.id,
          content_id: contentId,
          is_completed: isCompleted,
          playback_position: playbackPosition || 0,
          started_at: new Date().toISOString(),
          completed_at: isCompleted ? new Date().toISOString() : null,
          updated_at: new Date().toISOString(),
        }, {
          onConflict: 'member_id,content_id',
        });

      if (error) throw error;

      // Update local state
      setProgress(prev => ({
        ...prev,
        [contentId]: {
          content_id: contentId,
          is_completed: isCompleted,
          playback_position: playbackPosition || prev[contentId]?.playback_position || 0,
        }
      }));

      // Reload member data to get updated percentage
      const { data: updatedMember } = await supabase
        .from('week1_members')
        .select('*')
        .eq('id', memberData.id)
        .single();

      if (updatedMember) {
        setMemberData(updatedMember);
      }
    } catch (error: any) {
      toast({
        title: "Error saving progress",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/week-one-access');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-accent" />
      </div>
    );
  }

  const audioContent = content.filter(c => c.content_type === 'audio');
  const documentContent = content.filter(c => c.content_type === 'pdf' || c.content_type === 'document');

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card/50 border-b border-border sticky top-0 z-50 backdrop-blur-lg">
        <div className="container-premium py-6">
          <div className="flex items-center justify-between">
            <div className="w-48" /> {/* Spacer for balance */}
            <img src={mindshiftLogo} alt="MindShift System" className="h-20 md:h-24" />
            <div className="flex items-center gap-6">
              <Button variant="premium" size="lg" className="h-12 px-6" onClick={() => window.open('https://calendly.com/patandchris/30min', '_blank')}>
                Get Access to Weeks 2-11
              </Button>
              <Button variant="ghost" size="sm" onClick={handleLogout} className="text-muted-foreground hover:text-foreground">
                <LogOut className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Sign Out</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container-premium py-8">
        {/* Week Title */}
        <h1 className="font-semibold mb-6">
          <span className="text-accent">Week 1:</span>{' '}
          <span className="text-muted-foreground">The Invisible Ceiling</span>
        </h1>

        {/* Progress Section */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-base font-semibold text-accent">Your Progress</h2>
            <span className="text-accent font-bold">{memberData?.progress_percentage || 0}%</span>
          </div>
          <div className="flex flex-col items-center justify-center gap-2 py-2">
            <Progress value={memberData?.progress_percentage || 0} className="h-3 w-full" />
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            {memberData?.progress_percentage === 100 
              ? "🎉 Congratulations! You've completed Week 1!"
              : memberData?.progress_percentage && memberData.progress_percentage > 0
                ? "Keep going! You're making great progress."
                : "Start your first lesson to begin your transformation."}
          </p>
        </div>

        {/* Audio Lessons */}
        <section className="mb-10">
          <h2 className="font-semibold text-accent mb-6">Audio Lessons</h2>
          <div className="space-y-4">
            {audioContent.map((item) => (
              <AudioLessonCard
                key={item.id}
                id={item.id}
                title={item.title}
                description={item.description || ''}
                fileUrl={item.file_url}
                duration={item.duration_seconds}
                isCompleted={progress[item.id]?.is_completed || false}
                playbackPosition={progress[item.id]?.playback_position || 0}
                onComplete={(completed) => updateProgress(item.id, completed)}
                onProgressUpdate={(position) => updateProgress(item.id, progress[item.id]?.is_completed || false, position)}
              />
            ))}
          </div>
        </section>

        {/* Documents */}
        <section>
          <h2 className="font-semibold text-accent mb-6">Resources & Documents</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {documentContent.map((item) => (
              <DocumentCard
                key={item.id}
                id={item.id}
                title={item.title}
                description={item.description || ''}
                fileUrl={item.file_url}
                contentType={item.content_type}
                isCompleted={progress[item.id]?.is_completed || false}
                onComplete={(completed) => updateProgress(item.id, completed)}
              />
            ))}
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="mt-12 flex justify-center">
          <Button variant="premium" size="lg" className="h-14 px-8 text-lg" onClick={() => window.open('https://calendly.com/patandchris/30min', '_blank')}>
            Get Access to Weeks 2-11
          </Button>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-12">
        <div className="container-premium py-6">
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} Pat & Chris Coaching. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default WeekOneContent;
