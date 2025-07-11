
import { useState, useEffect } from 'react';
import { Plus, Calendar, ExternalLink, Tag, Briefcase, Trophy, Newspaper, GraduationCap, Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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
    // Load updates from localStorage
    const savedUpdates = localStorage.getItem('updates');
    if (savedUpdates) {
      setUpdates(JSON.parse(savedUpdates));
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleTypeChange = (value: string) => {
    setFormData({
      ...formData,
      type: value
    });
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

    // Reset form
    setFormData({ title: '', type: '', detail: '', link: '' });
    setIsModalOpen(false);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'hackathon':
        return <Trophy className="w-5 h-5" />;
      case 'news':
        return <Newspaper className="w-5 h-5" />;
      case 'internship':
        return <GraduationCap className="w-5 h-5" />;
      case 'job':
        return <Briefcase className="w-5 h-5" />;
      default:
        return <Tag className="w-5 h-5" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'hackathon':
        return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'news':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'internship':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'job':
        return 'bg-orange-100 text-orange-700 border-orange-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const filteredUpdates = updates.filter(update => {
    const matchesType = filterType === 'all' || update.type === filterType;
    const matchesSearch = update.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         update.detail.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex flex-col">
      <Navbar />
      
      <div className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Campus <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Updates</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto">
              Stay updated with the latest opportunities and news from the campus community
            </p>
          </div>

          {/* Search and Filter Section */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-6 mb-8 border border-white/20">
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              <div className="flex flex-col sm:flex-row gap-4 flex-1 w-full lg:w-auto">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    placeholder="Search updates..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-12 h-12 rounded-2xl border-2 border-gray-200 focus:border-indigo-500"
                  />
                </div>
                
                <div className="flex items-center gap-2">
                  <Filter className="w-5 h-5 text-gray-600" />
                  <Select value={filterType} onValueChange={setFilterType}>
                    <SelectTrigger className="h-12 w-40 rounded-2xl border-2 border-gray-200">
                      <SelectValue placeholder="Filter by type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="hackathon">Hackathons</SelectItem>
                      <SelectItem value="news">News</SelectItem>
                      <SelectItem value="internship">Internships</SelectItem>
                      <SelectItem value="job">Jobs</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 h-12 px-8 rounded-2xl shadow-lg whitespace-nowrap">
                    <Plus className="w-5 h-5 mr-2" />
                    Add Update
                  </Button>
                </DialogTrigger>
                
                <DialogContent className="sm:max-w-lg rounded-3xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-gray-900">Add New Update</DialogTitle>
                  </DialogHeader>
                  
                  <form onSubmit={handleSubmit} className="space-y-6 mt-6">
                    <div className="space-y-2">
                      <Label htmlFor="title" className="text-sm font-semibold text-gray-700">Title</Label>
                      <Input
                        id="title"
                        name="title"
                        type="text"
                        placeholder="Enter update title"
                        value={formData.title}
                        onChange={handleInputChange}
                        required
                        className="h-12 rounded-xl border-2 border-gray-200 focus:border-indigo-500"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-semibold text-gray-700">Type</Label>
                      <Select value={formData.type} onValueChange={handleTypeChange} required>
                        <SelectTrigger className="h-12 rounded-xl border-2 border-gray-200">
                          <SelectValue placeholder="Select update type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="hackathon">
                            <div className="flex items-center">
                              <Trophy className="w-4 h-4 mr-2" />
                              Hackathon
                            </div>
                          </SelectItem>
                          <SelectItem value="news">
                            <div className="flex items-center">
                              <Newspaper className="w-4 h-4 mr-2" />
                              News
                            </div>
                          </SelectItem>
                          <SelectItem value="internship">
                            <div className="flex items-center">
                              <GraduationCap className="w-4 h-4 mr-2" />
                              Internship
                            </div>
                          </SelectItem>
                          <SelectItem value="job">
                            <div className="flex items-center">
                              <Briefcase className="w-4 h-4 mr-2" />
                              Job
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="detail" className="text-sm font-semibold text-gray-700">Details</Label>
                      <Textarea
                        id="detail"
                        name="detail"
                        placeholder="Provide detailed information about this update..."
                        value={formData.detail}
                        onChange={handleInputChange}
                        required
                        rows={4}
                        className="rounded-xl border-2 border-gray-200 focus:border-indigo-500 resize-none"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="link" className="text-sm font-semibold text-gray-700">Link</Label>
                      <Input
                        id="link"
                        name="link"
                        type="url"
                        placeholder="https://example.com"
                        value={formData.link}
                        onChange={handleInputChange}
                        required
                        className="h-12 rounded-xl border-2 border-gray-200 focus:border-indigo-500"
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full h-12 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 rounded-xl font-semibold"
                    >
                      Add Update
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredUpdates.map((update) => (
              <Card key={update.id} className="group shadow-xl border-0 rounded-3xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-white/80 backdrop-blur-sm overflow-hidden">
                <CardContent className="p-8">
                  <div className="space-y-6">
                    <div className="flex items-start justify-between">
                      <div className={`inline-flex items-center px-4 py-2 rounded-2xl text-sm font-semibold border ${getTypeColor(update.type)} group-hover:scale-105 transition-transform`}>
                        {getTypeIcon(update.type)}
                        <span className="ml-2 capitalize">{update.type}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-500 bg-gray-50 px-3 py-1 rounded-full">
                        <Calendar className="w-4 h-4 mr-1" />
                        {formatDate(update.createdAt)}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors line-clamp-2">
                        {update.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed line-clamp-3">
                        {update.detail}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-gray-100">
                      <a
                        href={update.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-indigo-600 hover:text-indigo-700 font-semibold text-sm group/link"
                      >
                        <ExternalLink className="w-4 h-4 mr-2 group-hover/link:scale-110 transition-transform" />
                        View Details
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredUpdates.length === 0 && updates.length > 0 && (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No matching updates found</h3>
              <p className="text-gray-500">Try adjusting your search or filter criteria</p>
            </div>
          )}

          {updates.length === 0 && (
            <div className="text-center py-20">
              <div className="w-24 h-24 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Tag className="w-12 h-12 text-indigo-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-600 mb-4">No Updates Yet</h3>
              <p className="text-lg text-gray-500 mb-8">Be the first to share an update with the community!</p>
              <Button
                onClick={() => setIsModalOpen(true)}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 px-8 py-3 rounded-2xl"
              >
                <Plus className="w-5 h-5 mr-2" />
                Add First Update
              </Button>
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Updates;
