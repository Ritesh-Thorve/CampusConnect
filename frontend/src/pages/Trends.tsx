import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import {
  SearchBar,
  CreateBlogDialog,
  BlogList
} from '../components/trends/trends';

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

  // Load blogs from localStorage or initialize sample data
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

  // Handle blog creation
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

  // Filter blogs based on search
  const filteredBlogs = blogs.filter(blog =>
    blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    blog.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    blog.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const clearSearch = () => setSearchTerm('');

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Desktop Navbar */}
      <div className="hidden md:block">
        <Navbar />
      </div>

      {/* Mobile Header */}
      <div className="md:hidden sticky top-0 z-10 bg-white border-b border-gray-200 py-3 px-4">
        <div className="flex items-center justify-center">
          <img
            src="/compus-connect_logo.png"
            alt="Campus Connect"
            className="h-6 w-6 mr-2"
          />
          <span className="text-sm font-semibold text-gray-800">Campus Connect</span>
        </div>
      </div>

      {/* Main Content */}
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

          {/* Search & Create Blog */}
          <section className="mb-6 flex flex-col sm:flex-row gap-3">
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <CreateBlogDialog
              newBlog={newBlog}
              setNewBlog={setNewBlog}
              handleSubmitBlog={handleSubmitBlog}
            />
          </section>

          {/* Blog List */}
          <BlogList blogs={filteredBlogs} searchTerm={searchTerm} clearSearch={clearSearch} />
        </div>
      </main>

      {/* Footer (desktop) */}
      <div className="hidden md:block">
        <Footer />
      </div>

      {/* Bottom Navbar (mobile) */}
      <div className="md:hidden fixed bottom-0 w-full z-20">
        <Navbar />
      </div>
    </div>
  );
};

export default Trends;
