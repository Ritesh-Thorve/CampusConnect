import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, ExternalLink } from 'lucide-react';

interface Update {
  id: string;
  title: string;
  type: 'hackathon' | 'news' | 'internship' | 'job';
  detail: string;        
  description: string;  
  link: string;          
  createdAt: string;    
  time?: string;         
}

// Map update types to CSS class names for badge background styling
const typeStyles: Record<Update['type'], string> = {
  hackathon: 'bg-gradient-to-r from-purple-500 to-purple-600 text-white',
  news: 'bg-gradient-to-r from-blue-500 to-blue-600 text-white',
  internship: 'bg-gradient-to-r from-green-500 to-green-600 text-white',
  job: 'bg-gradient-to-r from-orange-500 to-orange-600 text-white',
};

// Function to format a date string into a readable format (e.g., "January 1, 2023")
const formatDate = (dateStr: string) =>
  new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

interface Props {
  selectedUpdate: Update | null; 
  onClose: () => void;          
}

export const UpdateDetailsDialog = ({ selectedUpdate, onClose }: Props) => (
  // Dialog is open if `selectedUpdate` is not null
  <Dialog open={!!selectedUpdate} onOpenChange={onClose}>

    {/* Dialog content container with max width and max height with vertical scroll */}
    <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
      {/* Render details only if there is a selected update */}
      {selectedUpdate && (
        <>
          {/* Dialog header contains badge for type, title, and date/time info */}
          <DialogHeader className="space-y-4">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <Badge className={typeStyles[selectedUpdate.type]}>
                  {selectedUpdate.type.charAt(0).toUpperCase() + selectedUpdate.type.slice(1)}
                </Badge>

                {/* Title of the update */}
                <DialogTitle className="text-2xl font-bold">
                  {selectedUpdate.title}
                </DialogTitle>
              </div>
            </div>

            {/* Container for date and optional time */}
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              {/* Created date with calendar icon */}
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(selectedUpdate.createdAt)}</span>
              </div>

              {/* Optional time with clock icon */}
              {selectedUpdate.time && (
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{selectedUpdate.time}</span>
                </div>
              )}
            </div>
          </DialogHeader>

          {/* Main content section with detailed text and optional external link */}
          <div className="mt-6 space-y-4">
            <p className="text-gray-700 whitespace-pre-wrap">
              {selectedUpdate.detail}
            </p>

            {/* External link displayed if provided */}
            {selectedUpdate.link && (
              <div className="pt-4 border-t">
                <a
                  href={selectedUpdate.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-semibold"
                >
                  <ExternalLink className="w-4 h-4" />
                  Visit Link
                </a>
              </div>
            )}
          </div>
        </>
      )}
    </DialogContent>
  </Dialog>
);
