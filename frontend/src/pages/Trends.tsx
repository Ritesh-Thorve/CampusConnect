
import { useState, useEffect } from 'react';
import { PlusCircle, Search, Calendar, User, Eye, Heart, MessageCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
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
  const [isWriting, setIsWriting] = useState(false);
  const [newBlog, setNewBlog] = useState({
    title: '',
    content: '',
    tags: ''
  });

  useEffect(() => {
    // Load existing blogs from localStorage
    const savedBlogs = localStorage.getItem('campusBlogs');
    if (savedBlogs) {
      setBlogs(JSON.parse(savedBlogs));
    } else {
      // Sample blogs for demonstration
      const sampleBlogs: BlogPost[] = [
        {
          id: '1',
          title: 'Tips for Acing Your Final Exams',
          content: 'As finals approach, here are some proven strategies that helped me maintain my GPA...',
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
          content: 'Last summer, I had the incredible opportunity to intern at a major tech company...',
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
      author: 'Current User', // In a real app, this would come from auth
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
    setIsWriting(false);
  };

  const filteredBlogs = blogs.filter(blog =>
    blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    blog.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    blog.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex flex-col">
      <Navbar />
      
      <div className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Trending <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Topics</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto">
              Share your thoughts, experiences, and insights with the campus community
            </p>
          </div>

          {/* Search and Write Controls */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search blogs, topics, or tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12 rounded-2xl border-2"
              />
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 h-12 px-8 rounded-2xl shadow-lg">
                  <PlusCircle className="w-5 h-5 mr-2" />
                  Write Blog
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Write a New Blog Post</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <Input
                    placeholder="Blog title..."
                    value={newBlog.title}
                    onChange={(e) => setNewBlog({...newBlog, title: e.target.value})}
                    className="text-lg font-semibold"
                  />
                  <Textarea
                    placeholder="Share your thoughts, experiences, or insights..."
                    value={newBlog.content}
                    onChange={(e) => setNewBlog({...newBlog, content: e.target.value})}
                    className="min-h-[200px] resize-none"
                  />
                  <Input
                    placeholder="Tags (comma separated, e.g. study-tips, career, tech)"
                    value={newBlog.tags}
                    onChange={(e) => setNewBlog({...newBlog, tags: e.target.value})}
                  />
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setNewBlog({ title: '', content: '', tags: '' })}>
                      Cancel
                    </Button>
                    <Button onClick={handleSubmitBlog} className="bg-gradient-to-r from-indigo-600 to-purple-600">
                      Publish Blog
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Blog Posts */}
          <div className="grid gap-6">
            {filteredBlogs.map((blog) => (
              <Card key={blog.id} className="group shadow-lg border-0 rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 bg-white/80 backdrop-blur-sm">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-4">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src="" />
                        <AvatarFallback className="bg-gradient-to-br from-indigo-100 to-purple-100">
                          <User className="w-6 h-6 text-indigo-600" />
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold text-gray-900">{blog.author}</h3>
                        <div className="flex items-center text-sm text-gray-500">
                          <Calendar className="w-4 h-4 mr-1" />
                          {new Date(blog.date).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <Eye className="w-4 h-4 mr-1" />
                        {blog.views}
                      </div>
                      <div className="flex items-center">
                        <Heart className="w-4 h-4 mr-1" />
                        {blog.likes}
                      </div>
                      <div className="flex items-center">
                        <MessageCircle className="w-4 h-4 mr-1" />
                        {blog.comments}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <CardTitle className="text-2xl mb-4 group-hover:text-indigo-600 transition-colors">
                    {blog.title}
                  </CardTitle>
                  <p className="text-gray-700 mb-4 line-clamp-3 leading-relaxed">
                    {blog.content}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {blog.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 rounded-full text-sm font-medium"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredBlogs.length === 0 && (
            <div className="text-center py-20">
              <div className="w-24 h-24 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <PlusCircle className="w-12 h-12 text-indigo-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-600 mb-4">No Blogs Found</h3>
              <p className="text-lg text-gray-500 mb-6">
                {searchTerm ? 'Try adjusting your search terms' : 'Be the first to share your thoughts with the community!'}
              </p>
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Trends;
