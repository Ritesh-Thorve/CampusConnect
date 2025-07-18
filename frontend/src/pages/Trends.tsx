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

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex flex-col">
      <Navbar />

      <main className="flex-1 px-4 py-6 sm:px-6">
        {/* Header section */}
        <header className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2 sm:text-3xl">
            Trending <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Topics</span>
          </h1>
          <p className="text-gray-600 text-sm sm:text-base max-w-md mx-auto">
            Share your thoughts, experiences, and insights with the campus community
          </p>
        </header>

        {/* Search and create controls */}
        <section className="mb-6">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search blogs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 h-10 rounded-lg border-2 text-sm"
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
                    className="text-sm sm:text-base"
                  />
                  <Textarea
                    placeholder="Share your thoughts..."
                    value={newBlog.content}
                    onChange={(e) => setNewBlog({ ...newBlog, content: e.target.value })}
                    className="min-h-[120px] text-sm sm:text-base"
                  />
                  <Input
                    placeholder="Tags (comma separated)"
                    value={newBlog.tags}
                    onChange={(e) => setNewBlog({ ...newBlog, tags: e.target.value })}
                    className="text-sm"
                  />
                  <div className="flex justify-end gap-2">
                    <Button 
                      variant="outline" 
                      onClick={() => setNewBlog({ title: '', content: '', tags: '' })}
                      className="text-sm px-3 py-1"
                    >
                      Cancel
                    </Button>
                    <Button 
                      onClick={handleSubmitBlog}
                      className="bg-gradient-to-r from-indigo-600 to-purple-600 text-sm px-3 py-1"
                    >
                      Publish
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </section>

        {/* Blog posts */}
        <section className="space-y-4">
          {filteredBlogs.length > 0 ? (
            filteredBlogs.map((blog) => (
              <Card key={blog.id} className="group shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start gap-3">
                    <div className="flex items-center gap-2">
                      <Avatar className="w-8 h-8">
                        <AvatarFallback className="bg-indigo-100 text-indigo-600 text-xs">
                          {blog.author.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-medium text-sm">{blog.author}</h3>
                        <div className="flex items-center text-xs text-gray-500">
                          <Calendar className="w-3 h-3 mr-1" />
                          {new Date(blog.date).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <span className="flex items-center">
                        <Eye className="w-3 h-3 mr-1" />
                        {blog.views}
                      </span>
                      <span className="flex items-center">
                        <Heart className="w-3 h-3 mr-1" />
                        {blog.likes}
                      </span>
                      <span className="flex items-center">
                        <MessageCircle className="w-3 h-3 mr-1" />
                        {blog.comments}
                      </span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <CardTitle className="text-lg mb-1 group-hover:text-indigo-600">
                    {blog.title}
                  </CardTitle>
                  <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                    {blog.content}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {blog.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 bg-indigo-50 text-indigo-700 rounded-full text-xs"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <PlusCircle className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-600 mb-2">
                {searchTerm ? 'No matching blogs found' : 'No blogs yet'}
              </h3>
              <p className="text-sm text-gray-500">
                {searchTerm ? 'Try different search terms' : 'Be the first to share!'}
              </p>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
};  

export default Trends;