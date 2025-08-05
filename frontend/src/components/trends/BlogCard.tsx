'use client';

import { Calendar } from 'lucide-react';

interface BlogCardProps {
  blog: {
    id: string;
    title: string;
    content: string;
    author: string;
    date: string;
    tags: string[];
  };
}

const BlogCard = ({ blog }: BlogCardProps) => {
  return (
    <article 
      key={blog.id} 
      className="group bg-white/70 backdrop-blur-sm rounded-3xl border border-gray-200/50 shadow-sm hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 cursor-pointer overflow-hidden"
    >
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
                  {new Date(blog.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-200 leading-tight">
            {blog.title}
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed line-clamp-2">
            {blog.content}
          </p>

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
      <div className="h-1 bg-gradient-to-r from-blue-500 to-indigo-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
    </article>
  );
};

export default BlogCard;
