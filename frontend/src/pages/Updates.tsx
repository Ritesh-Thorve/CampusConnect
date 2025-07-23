'use client';

import { useState, useEffect } from 'react';
import {
  Plus, Calendar, ExternalLink, Tag, Briefcase,
  Trophy, Newspaper, GraduationCap, Search, Filter
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface Update {
  id: string;
  title: string;
  type: 'hackathon' | 'news' | 'internship' | 'job';
  detail: string;
  link: string;
  createdAt: string;
}

const Updates = () => {
  const [updates, setUpdates] = useState<Update[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterType, setFilterType] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    type: '',
    detail: '',
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
    const newUpdate: Update = {
      id: Date.now().toString(),
      title: formData.title,
      type: formData.type as Update['type'],
      detail: formData.detail,
      link: formData.link,
      createdAt: new Date().toISOString()
    };
    const updatedUpdates = [newUpdate, ...updates];
    setUpdates(updatedUpdates);
    localStorage.setItem('updates', JSON.stringify(updatedUpdates));
    setFormData({ title: '', type: '', detail: '', link: '' });
    setIsModalOpen(false);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'hackathon': return <Trophy className="w-5 h-5" />;
      case 'news': return <Newspaper className="w-5 h-5" />;
      case 'internship': return <GraduationCap className="w-5 h-5" />;
      case 'job': return <Briefcase className="w-5 h-5" />;
      default: return <Tag className="w-5 h-5" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'hackathon': return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'news': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'internship': return 'bg-green-100 text-green-700 border-green-200';
      case 'job': return 'bg-orange-100 text-orange-700 border-orange-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });

  const filteredUpdates = updates.filter(update =>
    (filterType === 'all' || update.type === filterType) &&
    (update.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      update.detail.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Desktop Navbar */}
      <div className="hidden md:block">
        <Navbar />
      </div>

      {/* Mobile Header */}
      <div className="md:hidden sticky top-0 z-10 bg-white border-b border-gray-200 py-3 px-4">
        <div className="flex items-center justify-center">
          <img src="/compus-connect_logo.png" alt="Campus Connect" className="h-6 w-6 mr-2 object-cover" />
          <span className="text-sm font-semibold text-gray-800">Campus Connect</span>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 pb-28 md:pb-0 overflow-y-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-12">
          <div className="text-center mb-10 md:mb-16">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3">
              Campus <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Updates</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Stay updated with the latest opportunities and news from the campus community
            </p>
          </div>

          {/* Controls */}
          <div className="flex flex-col md:flex-row items-center gap-4 justify-between mb-6">
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

            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
              <DialogTrigger asChild>
                <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Update
                </Button>
              </DialogTrigger>
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
                    <Label>Details</Label>
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
          </div>

          {/* Updates Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredUpdates.map((update) => (
              <Card key={update.id} className="shadow-sm border rounded-xl overflow-hidden">
                <CardContent className="p-5 space-y-3">
                  <div className={`inline-flex items-center gap-2 text-sm font-medium px-3 py-1 rounded-full border ${getTypeColor(update.type)}`}>
                    {getTypeIcon(update.type)}
                    {update.type.charAt(0).toUpperCase() + update.type.slice(1)}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800">{update.title}</h3>
                  <p className="text-sm text-gray-600">{update.detail}</p>
                  <div className="flex justify-between items-center text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {formatDate(update.createdAt)}
                    </span>
                    <a href={update.link} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline flex items-center gap-1">
                      <ExternalLink className="w-4 h-4" />
                      Link
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>

      {/* Desktop Footer */}
      <div className="hidden md:block">
        <Footer />
      </div>

      {/* Mobile Bottom Navbar */}
      <div className="md:hidden fixed bottom-0 w-full z-50">
        <Navbar />
      </div>
    </div>
  );
};

export default Updates;
