import { useState, useEffect } from 'react';
import {
  PlusCircle, Search, Calendar, Eye, Heart, MessageCircle
} from 'lucide-react';
import {
  Card, CardContent, CardHeader, CardTitle
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Avatar, AvatarFallback, AvatarImage
} from '@/components/ui/avatar';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface BlogPost {
  id: string;
  title: string;
  content: string;
  author: string;
  date: string;
  views: number;
  likes: number;
  comments: number;
  tags: string[];
}

const Trends = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [newBlog, setNewBlog] = useState({
    title: '',
    content: '',
    tags: ''
  });

  useEffect(() => {
    const savedBlogs = localStorage.getItem('campusBlogs');
    if (savedBlogs) {
      setBlogs(JSON.parse(savedBlogs));
    } else {
      const sampleBlogs: BlogPost[] = [
        {
          id: '1',
          title: 'Tips for Acing Your Final Exams',
          content: 'As finals approach, here are some proven strategies...',
          author: 'Sarah Johnson',
          date: '2024-01-15',
          views: 234,
          likes: 18,
          comments: 7,
          tags: ['study-tips', 'finals', 'academics']
        },
        {
          id: '2',
          title: 'My Internship Experience at Tech Giant',
          content: 'Last summer, I had the opportunity to intern at a tech company...',
          author: 'Mike Chen',
          date: '2024-01-12',
          views: 189,
          likes: 24,
          comments: 12,
          tags: ['internship', 'career', 'tech']
        }
      ];
      setBlogs(sampleBlogs);
      localStorage.setItem('campusBlogs', JSON.stringify(sampleBlogs));
    }
  }, []);

  const handleSubmitBlog = () => {
    if (!newBlog.title.trim() || !newBlog.content.trim()) return;

    const blog: BlogPost = {
      id: Date.now().toString(),
      title: newBlog.title,
      content: newBlog.content,
      author: 'Current User',
      date: new Date().toISOString().split('T')[0],
      views: 0,
      likes: 0,
      comments: 0,
      tags: newBlog.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
    };

    const updatedBlogs = [blog, ...blogs];
    setBlogs(updatedBlogs);
    localStorage.setItem('campusBlogs', JSON.stringify(updatedBlogs));
    setNewBlog({ title: '', content: '', tags: '' });
  };

  const filteredBlogs = blogs.filter(blog =>
    blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    blog.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    blog.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  function handleSearch(arg0: string): void {
    throw new Error('Function not implemented.');
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Desktop Navbar */}
      <div className="hidden md:block">
        <Navbar />
      </div>

      {/* Mobile Header (shown only on mobile) */}
      <div className="md:hidden sticky top-0 z-10 bg-white border-b border-gray-200 py-3 px-4">
        <div className="flex items-center justify-center">
          {/* Logo */}
          <img
            src="/compus-connect_logo.png" // Update with your logo path
            alt="Campus Connect"
            className="h-6 w-6 mr-2"
          />
          {/* Name */}
          <span className="text-sm font-semibold text-gray-800">Campus Connect</span>
        </div>
      </div>

      {/* Main content */}
      <main className="flex-1 pb-28 md:pb-0 overflow-y-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-12">
        {/* Page Title */}
        <div className="text-center mb-10 md:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3">
            Trending <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Topics</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Share your thoughts, experiences, and insights with the campus community
          </p>
        </div>


        {/* Search & Create */}
        <section className="mb-6">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search blogs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 w-full md:w-64 rounded-lg border-2 text-sm"
              />
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 h-10 px-4 rounded-lg shadow">
                  <PlusCircle className="w-4 h-4 mr-2" />
                  <span className="sr-only sm:not-sr-only">Write Blog</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-[95vw] rounded-lg sm:max-w-md">
                <DialogHeader>
                  <DialogTitle className="text-base sm:text-lg">Write a New Blog Post</DialogTitle>
                </DialogHeader>
                <div className="space-y-3">
                  <Input
                    placeholder="Blog title..."
                    value={newBlog.title}
                    onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
                  />
                  <Textarea
                    placeholder="Share your thoughts..."
                    value={newBlog.content}
                    onChange={(e) => setNewBlog({ ...newBlog, content: e.target.value })}
                    className="min-h-[120px]"
                  />
                  <Input
                    placeholder="Tags (comma separated)"
                    value={newBlog.tags}
                    onChange={(e) => setNewBlog({ ...newBlog, tags: e.target.value })}
                  />
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setNewBlog({ title: '', content: '', tags: '' })}>Cancel</Button>
                    <Button onClick={handleSubmitBlog} className="bg-gradient-to-r from-indigo-600 to-purple-600">
                      Publish
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </section>

        {/* Blogs */}
         <section className="space-y-6">
          {filteredBlogs.length > 0 ? (
            filteredBlogs.map((blog) => (
              <article 
                key={blog.id} 
                className="group bg-white/70 backdrop-blur-sm rounded-3xl border border-gray-200/50 shadow-sm hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 cursor-pointer overflow-hidden"
              >
                {/* Card Header */}
                <div className="p-8 pb-4">
                  <div className="flex justify-between items-start gap-4 mb-6">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-semibold text-lg shadow-lg">
                          {blog.author.charAt(0)}
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 text-lg">{blog.author}</h4>
                        <div className="flex items-center text-sm text-gray-500 gap-4">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {new Date(blog.date).toLocaleDateString('en-US', { 
                              month: 'short', 
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Engagement Metrics */}
                    <div className="flex items-center gap-6 text-sm text-gray-500">
                      <span className="flex items-center gap-2 hover:text-red-500 transition-colors">
                        <Heart className="w-4 h-4" />
                        <span className="font-medium">{blog.likes}</span>
                      </span>
                      <span className="flex items-center gap-2 hover:text-blue-500 transition-colors">
                        <Eye className="w-4 h-4" />
                        <span className="font-medium">{blog.views.toLocaleString()}</span>
                      </span>
                      <span className="flex items-center gap-2 hover:text-green-500 transition-colors">
                        <MessageCircle className="w-4 h-4" />
                        <span className="font-medium">{blog.comments}</span>
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-200 leading-tight">
                      {blog.title}
                    </h2>
                    <p className="text-gray-600 text-lg leading-relaxed line-clamp-2">
                      {blog.content}
                    </p>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 pt-2">
                      {blog.tags.map((tag) => (
                        <span 
                          key={tag} 
                          className="px-4 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 rounded-full text-sm font-medium border border-blue-100 hover:from-blue-100 hover:to-indigo-100 transition-all duration-200 cursor-pointer"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Hover Effect Gradient */}
                <div className="h-1 bg-gradient-to-r from-blue-500 to-indigo-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </article>
            ))
          ) : (
            <div className="text-center py-20">
              <div className="relative mb-8">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto shadow-lg">
                  <PlusCircle className="w-10 h-10 text-blue-600" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                  <span className="text-lg">✨</span>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                {searchTerm ? 'No matching articles found' : 'No articles yet'}
              </h3>
              <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
                {searchTerm 
                  ? 'Try adjusting your search terms or explore different topics' 
                  : 'Be the first to share your insights with the community!'
                }
              </p>
              {searchTerm && (
                <button 
                  onClick={() => handleSearch('')}
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-full hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  Clear Search
                </button>
              )}
            </div>
          )}
        </section>
        </div>
      </main>

      {/* Footer (desktop only) */}
      <div className="hidden md:block">
        <Footer />
      </div>

      {/* Bottom Navbar (mobile only) */}
      <div className="md:hidden fixed bottom-0 w-full z-20">
        <Navbar />
      </div>
    </div>
  );
};

export default Trends;
