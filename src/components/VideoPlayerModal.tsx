import { Dialog, DialogContent } from "@/components/ui/dialog";
import { X } from "lucide-react";

interface VideoPlayerModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl: string;
}

const VideoPlayerModal = ({ isOpen, onClose, videoUrl }: VideoPlayerModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-full p-0 bg-black border-gold/20">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-50 rounded-full bg-black/80 p-2 hover:bg-black transition-colors border border-gold/30"
        >
          <X className="h-5 w-5 text-gold" />
        </button>
        <div className="relative aspect-video w-full">
          <video
            src={videoUrl}
            controls
            autoPlay
            className="w-full h-full"
            controlsList="nodownload"
          >
            Your browser does not support the video tag.
          </video>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VideoPlayerModal;
