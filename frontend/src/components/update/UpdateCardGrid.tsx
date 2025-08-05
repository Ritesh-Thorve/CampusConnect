'use client';

import { Calendar, ExternalLink } from 'lucide-react';
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Update {
  id: string;
  title: string;
  type: 'hackathon' | 'news' | 'internship' | 'job';
  detail: string;
  description: string;
  link: string;
  createdAt: string;
}

interface Props {
  updates: Update[];
  onSelect: (update: Update) => void;
}

const typeStyles: Record<Update['type'], string> = {
  hackathon: 'bg-gradient-to-r from-purple-500 to-purple-600 text-white',
  news: 'bg-gradient-to-r from-blue-500 to-blue-600 text-white',
  internship: 'bg-gradient-to-r from-green-500 to-green-600 text-white',
  job: 'bg-gradient-to-r from-orange-500 to-orange-600 text-white',
};

const formatDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export const UpdateCardGrid = ({ updates, onSelect }: Props) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {updates.map((update) => (
      <Card
        key={update.id}
        className="hover:shadow-md transition-shadow cursor-pointer"
        onClick={() => onSelect(update)}
      >
        <CardHeader>
          <div className="flex justify-between items-start">
            <Badge className={typeStyles[update.type]}>
              {update.type.charAt(0).toUpperCase() + update.type.slice(1)}
            </Badge>
            <div className="text-sm text-muted-foreground flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {formatDate(update.createdAt)}
            </div>
          </div>
          <CardTitle className="mt-2 text-lg">{update.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
            {update.description}
          </p>
          {update.link && (
            <div className="flex justify-end">
              <a
                href={update.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
                onClick={(e) => e.stopPropagation()}
              >
                Visit Link <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          )}
        </CardContent>
      </Card>
    ))}
  </div>
);
