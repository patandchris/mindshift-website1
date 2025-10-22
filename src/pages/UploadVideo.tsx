import { VideoUpload } from '@/components/VideoUpload';

const UploadVideo = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold mb-2 text-center">Upload Testimonial Video</h1>
          <p className="text-muted-foreground text-center mb-8">
            Share your success story with us
          </p>
          <VideoUpload />
        </div>
      </div>
    </div>
  );
};

export default UploadVideo;
