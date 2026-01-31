import { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Play, Pause, SkipBack, SkipForward } from 'lucide-react';

interface AudioLessonCardProps {
  id: string;
  title: string;
  description: string;
  fileUrl: string | null;
  duration: number | null;
  isCompleted: boolean;
  playbackPosition: number;
  onComplete: (completed: boolean) => void;
  onProgressUpdate: (position: number) => void;
}

const AudioLessonCard = ({
  id,
  title,
  description,
  fileUrl,
  duration,
  isCompleted,
  playbackPosition,
  onComplete,
  onProgressUpdate,
}: AudioLessonCardProps) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(playbackPosition);
  const [audioDuration, setAudioDuration] = useState(duration || 0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleLoadedMetadata = () => {
      setAudioDuration(audio.duration);
      setIsLoaded(true);
      if (playbackPosition > 0) {
        audio.currentTime = playbackPosition;
      }
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      onComplete(true);
      onProgressUpdate(audio.duration);
    };

    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [onComplete, onProgressUpdate, playbackPosition]);

  // Save progress periodically
  useEffect(() => {
    if (!isPlaying) return;
    
    const interval = setInterval(() => {
      if (audioRef.current) {
        onProgressUpdate(Math.floor(audioRef.current.currentTime));
      }
    }, 10000); // Save every 10 seconds

    return () => clearInterval(interval);
  }, [isPlaying, onProgressUpdate]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
      onProgressUpdate(Math.floor(audioRef.current.currentTime));
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (value: number[]) => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = value[0];
    setCurrentTime(value[0]);
  };

  const handleRestart = () => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = 0;
    setCurrentTime(0);
  };

  const handleSkipToEnd = () => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = audioRef.current.duration;
    setCurrentTime(audioRef.current.duration);
    onComplete(true);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progressPercentage = audioDuration > 0 ? (currentTime / audioDuration) * 100 : 0;

  return (
    <Card className={`bg-card border-border transition-all duration-300 ${isCompleted ? 'border-accent/50' : 'hover:border-accent/30'}`}>
      <CardContent className="p-4 md:p-6">
        <div className="flex-1 min-w-0">
          {/* Title and Description */}
          <div className="flex items-start justify-between gap-2 mb-2">
            <div>
              <h3 className="font-semibold text-accent">{title}</h3>
              <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{description}</p>
            </div>
            {isCompleted && (
              <span className="text-xs bg-green-600/20 text-green-500 border border-green-500/50 px-2 py-1 rounded-full flex-shrink-0">
                ✓ Completed
              </span>
            )}
          </div>

          {/* Audio Player */}
          {fileUrl ? (
            <>
              <audio ref={audioRef} src={fileUrl} preload="metadata" />
              
              {/* Progress Bar */}
              <div className="mb-3">
                <Slider
                  value={[currentTime]}
                  max={audioDuration || 100}
                  step={1}
                  onValueChange={handleSeek}
                  className="cursor-pointer"
                />
                <div className="flex justify-between text-base text-muted-foreground mt-1 font-medium">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(audioDuration)}</span>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center justify-center gap-3">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleRestart}
                  className="h-9 w-9 text-muted-foreground hover:text-foreground"
                  title="Restart"
                >
                  <SkipBack className="w-4 h-4" />
                </Button>

                <Button
                  variant="default"
                  size="icon"
                  onClick={togglePlay}
                  className="h-12 w-12 bg-accent hover:bg-accent/90"
                >
                  {isPlaying ? (
                    <Pause className="w-6 h-6" />
                  ) : (
                    <Play className="w-6 h-6 ml-0.5" />
                  )}
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleSkipToEnd}
                  className="h-9 w-9 text-muted-foreground hover:text-foreground"
                  title="Skip to end"
                >
                  <SkipForward className="w-4 h-4" />
                </Button>
              </div>

              {!isCompleted && progressPercentage > 90 && (
                <div className="flex justify-center mt-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onComplete(true)}
                    className="text-xs"
                  >
                    Mark Complete
                  </Button>
                </div>
              )}
            </>
          ) : (
            <div className="bg-secondary/50 rounded-lg p-4 text-center">
              <p className="text-sm text-muted-foreground">Audio file coming soon</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AudioLessonCard;
