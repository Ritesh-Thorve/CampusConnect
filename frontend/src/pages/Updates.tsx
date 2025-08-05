'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { SearchFilter } from '../components/update/SearchFilter';
import { UpdateCardGrid } from '../components/update/UpdateCardGrid';
import { AddUpdateDialog } from '../components/update/AddUpdateDialog';
import { UpdateDetailsDialog } from '../components/update/UpdateDetailsDialog';

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
      description: formData.description || formData.detail.substring(0, 150) + '...',
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-12">
          <div className="text-center mb-10 md:mb-16">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3">
              Campus <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Updates</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Stay up to date with the latest opportunities and news
            </p>
          </div>

          <SearchFilter
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            setFilterType={setFilterType}
            onAddClick={() => setIsModalOpen(true)}
          />

          <UpdateCardGrid
            updates={filteredUpdates}
            onSelect={setSelectedUpdate}
          />
        </div>
      </main>

      <AddUpdateDialog
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        formData={formData}
        onChange={handleInputChange}
        onTypeChange={handleTypeChange}
        onSubmit={handleSubmit}
      />

      <UpdateDetailsDialog
        selectedUpdate={selectedUpdate}
        onClose={() => setSelectedUpdate(null)}
      />

      <div className="hidden md:block">
        <Footer />
      </div>
      <div className="md:hidden fixed bottom-0 w-full z-20">
        <Navbar />
      </div>
    </div>
  );
};

export default Updates;