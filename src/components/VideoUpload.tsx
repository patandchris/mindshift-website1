import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Upload, Loader2 } from 'lucide-react';

export const VideoUpload = () => {
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = event.target.files?.[0];
      if (!file) return;

      // Validate file type
      if (!file.type.startsWith('video/')) {
        toast({
          title: "Invalid file type",
          description: "Please upload a video file",
          variant: "destructive"
        });
        return;
      }

      // Validate file size (50MB)
      if (file.size > 50 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please upload a video smaller than 50MB",
          variant: "destructive"
        });
        return;
      }

      setUploading(true);

      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = fileName;

      const { error: uploadError } = await supabase.storage
        .from('testimonials')
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      toast({
        title: "Success!",
        description: "Video uploaded successfully",
      });

      // Clear the input
      event.target.value = '';
    } catch (error: any) {
      toast({
        title: "Upload failed",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 p-8 border-2 border-dashed border-border rounded-lg">
      <Upload className="w-12 h-12 text-muted-foreground" />
      <div className="text-center">
        <h3 className="font-semibold mb-1">Upload Testimonial Video</h3>
        <p className="text-sm text-muted-foreground">MP4, MOV, AVI, or WebM (max 50MB)</p>
      </div>
      <Button disabled={uploading} className="relative">
        {uploading ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Uploading...
          </>
        ) : (
          'Choose File'
        )}
        <input
          type="file"
          accept="video/*"
          onChange={handleFileUpload}
          disabled={uploading}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
      </Button>
    </div>
  );
};
