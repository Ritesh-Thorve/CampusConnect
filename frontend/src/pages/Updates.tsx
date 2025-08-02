'use client';

import { useState, useEffect } from 'react';
import {
  Calendar, Clock, ExternalLink, Plus, Tag, Briefcase,
  Trophy, Newspaper, GraduationCap
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ReactMarkdown from 'react-markdown';

interface Update {
  id: string;
  title: string;
  type: 'hackathon' | 'news' | 'internship' | 'job';
  detail: string;
  description: string; // Added for preview text
  link: string;
  createdAt: string;
  time?: string; // Added for time display
}

const typeStyles: Record<Update['type'], string> = {
  hackathon: 'bg-gradient-to-r from-purple-500 to-purple-600 text-white',
  news: 'bg-gradient-to-r from-blue-500 to-blue-600 text-white',
  internship: 'bg-gradient-to-r from-green-500 to-green-600 text-white',
  job: 'bg-gradient-to-r from-orange-500 to-orange-600 text-white',
};

const Updates = () => {
  const [updates, setUpdates] = useState<Update[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUpdate, setSelectedUpdate] = useState<Update | null>(null);
  const [filterType, setFilterType] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    type: '',
    detail: '',
    description: '',
    link: ''
  });

  useEffect(() => {
    const savedUpdates = localStorage.getItem('updates');
    if (savedUpdates) {
      setUpdates(JSON.parse(savedUpdates));
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleTypeChange = (value: string) => {
    setFormData({ ...formData, type: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const now = new Date();
    const newUpdate: Update = {
      id: Date.now().toString(),
      title: formData.title,
      type: formData.type as Update['type'],
      detail: formData.detail,
      description: formData.description || formData.detail.substring(0, 150) + '...', // Auto-generate if not provided
      link: formData.link,
      createdAt: now.toISOString(),
      time: now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    };
    const updatedUpdates = [newUpdate, ...updates];
    setUpdates(updatedUpdates);
    localStorage.setItem('updates', JSON.stringify(updatedUpdates));
    setFormData({ title: '', type: '', detail: '', description: '', link: '' });
    setIsModalOpen(false);
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const filteredUpdates = updates.filter(update =>
    (filterType === 'all' || update.type === filterType) &&
    (update.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      update.detail.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="hidden md:block">
        <Navbar />
      </div>

      <main className="flex-1 pb-28 md:pb-0 overflow-y-auto">
        <div className="container mx-auto px-4 py-8">
          {/* Page Header - matching original style */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
              Campus Updates
            </h1>
            <p className="text-muted-foreground text-lg">
              Stay up to date with the latest opportunities and news
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-col md:flex-row items-center gap-4 justify-between mb-8">
            <div className="flex items-center gap-3 w-full md:w-auto">
              <Input
                placeholder="Search updates"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full md:w-64"
              />
              <Select onValueChange={setFilterType} defaultValue="all">
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Filter by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="hackathon">Hackathon</SelectItem>
                  <SelectItem value="news">News</SelectItem>
                  <SelectItem value="internship">Internship</SelectItem>
                  <SelectItem value="job">Job</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button onClick={() => setIsModalOpen(true)} className="bg-indigo-600 hover:bg-indigo-700 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Add Update
            </Button>
          </div>

          {/* Updates Grid - matching original layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredUpdates.map((update, index) => (
              <Card
                key={update.id}
                className="group relative overflow-hidden bg-gradient-card border-0 shadow-soft hover:shadow-elegant transition-all duration-300 hover:scale-105 hover:shadow-glow cursor-pointer"
                style={{
                  animationDelay: `${index * 150}ms`,
                }}
                onClick={() => setSelectedUpdate(update)}
              >
                <div className="absolute inset-0 bg-gradient-subtle opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <CardHeader className="relative z-10 pb-3">
                  <div className="flex items-start justify-between mb-2">
                    <Badge className={typeStyles[update.type]} variant="secondary">
                      {update.type.charAt(0).toUpperCase() + update.type.slice(1)}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                    {update.title}
                  </CardTitle>
                </CardHeader>

                <CardContent className="relative z-10">
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                    {update.description || update.detail.substring(0, 150) + '...'}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>{formatDate(update.createdAt)}</span>
                    </div>
                    {update.time && (
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{update.time}</span>
                      </div>
                    )}
                  </div>

                  <Button
                    variant="ghost"
                    size="sm"
                    className="mt-3 w-full group-hover:bg-primary/10 transition-colors duration-300"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedUpdate(update);
                    }}
                  >
                    Read Full Update
                    <ExternalLink className="w-3 h-3 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>

      {/* Add Update Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Update</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label>Title</Label>
              <Input name="title" value={formData.title} onChange={handleInputChange} required />
            </div>
            <div>
              <Label>Type</Label>
              <Select onValueChange={handleTypeChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hackathon">Hackathon</SelectItem>
                  <SelectItem value="news">News</SelectItem>
                  <SelectItem value="internship">Internship</SelectItem>
                  <SelectItem value="job">Job</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Short Description (for preview)</Label>
              <Textarea 
                name="description" 
                value={formData.description} 
                onChange={handleInputChange}
                placeholder="Brief description shown on the card..."
                rows={2}
              />
            </div>
            <div>
              <Label>Full Details (Markdown Supported)</Label>
              <Textarea name="detail" value={formData.detail} onChange={handleInputChange} required />
            </div>
            <div>
              <Label>Link</Label>
              <Input name="link" value={formData.link} onChange={handleInputChange} required />
            </div>
            <Button type="submit" className="w-full bg-indigo-600 text-white hover:bg-indigo-700">
              Submit
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Full Detail Modal - matching original style */}
      <Dialog open={!!selectedUpdate} onOpenChange={() => setSelectedUpdate(null)}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          {selectedUpdate && (
            <>
              <DialogHeader className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Badge className={typeStyles[selectedUpdate.type]} variant="secondary">
                        {selectedUpdate.type.charAt(0).toUpperCase() + selectedUpdate.type.slice(1)}
                      </Badge>
                    </div>
                    <DialogTitle className="text-2xl font-bold">
                      {selectedUpdate.title}
                    </DialogTitle>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(selectedUpdate.createdAt)}</span>
                  </div>
                  {selectedUpdate.time && (
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{selectedUpdate.time}</span>
                    </div>
                  )}
                </div>
                
                <DialogDescription className="text-base">
                  {selectedUpdate.description || selectedUpdate.detail.substring(0, 200) + '...'}
                </DialogDescription>
              </DialogHeader>

              <div className="mt-6">
                <div className="prose prose-sm max-w-none">
                  <ReactMarkdown>{selectedUpdate.detail}</ReactMarkdown>
                </div>
              </div>

              {selectedUpdate.link && (
                <div className="mt-6 pt-4 border-t">
                  <a
                    href={selectedUpdate.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-semibold transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Visit Link
                  </a>
                </div>
              )}
            </>
          )}
        </DialogContent>
      </Dialog>

      <div className="hidden md:block">
        <Footer />
      </div>
      <div className="md:hidden fixed bottom-0 w-full z-50">
        <Navbar />
      </div>
    </div>
  );
};

export default Updates;
