import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Download, ExternalLink, CheckCircle, File } from 'lucide-react';

interface DocumentCardProps {
  id: string;
  title: string;
  description: string;
  fileUrl: string | null;
  contentType: string;
  isCompleted: boolean;
  onComplete: (completed: boolean) => void;
}

const DocumentCard = ({
  id,
  title,
  description,
  fileUrl,
  contentType,
  isCompleted,
  onComplete,
}: DocumentCardProps) => {
  const isPdf = contentType === 'pdf';
  const Icon = isPdf ? FileText : File;

  const handleOpen = () => {
    if (fileUrl) {
      window.open(fileUrl, '_blank');
      onComplete(true);
    }
  };

  const handleDownload = () => {
    if (fileUrl) {
      const link = document.createElement('a');
      link.href = fileUrl;
      link.download = title;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      onComplete(true);
    }
  };

  return (
    <Card className={`bg-card border-border transition-all duration-300 ${isCompleted ? 'border-accent/50' : 'hover:border-accent/30'}`}>
      <CardContent className="p-4 md:p-6">
        <div className="flex items-start gap-4">
          {/* Icon */}
          <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${isCompleted ? 'bg-accent/20' : 'bg-secondary'}`}>
            {isCompleted ? (
              <CheckCircle className="w-6 h-6 text-accent" />
            ) : (
              <Icon className="w-6 h-6 text-muted-foreground" />
            )}
          </div>

          <div className="flex-1 min-w-0">
            {/* Title and Description */}
            <div className="mb-4">
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-semibold text-foreground">{title}</h3>
                {isCompleted && (
                  <span className="text-xs bg-accent/20 text-accent px-2 py-1 rounded-full flex-shrink-0">
                    Viewed
                  </span>
                )}
              </div>
              <p className="text-sm text-muted-foreground mt-1">{description}</p>
              <span className="inline-block text-xs text-muted-foreground bg-secondary px-2 py-0.5 rounded mt-2">
                {isPdf ? 'PDF Document' : 'Word Document'}
              </span>
            </div>

            {/* Action Buttons */}
            {fileUrl ? (
              <div className="flex flex-wrap gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleOpen}
                  className="text-sm"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Open
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleDownload}
                  className="text-sm"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
              </div>
            ) : (
              <div className="bg-secondary/50 rounded-lg p-3 text-center">
                <p className="text-sm text-muted-foreground">Document coming soon</p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DocumentCard;
