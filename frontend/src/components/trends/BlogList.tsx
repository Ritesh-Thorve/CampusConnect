'use client';

import BlogCard from './BlogCard';
import EmptyState from './EmptyState';

interface Blog {
  id: string;
  title: string;
  content: string;
  author: string;
  date: string;
  tags: string[];
}

interface BlogListProps {
  blogs: Blog[];
  searchTerm: string;
  clearSearch: () => void;
}

const BlogList = ({ blogs, searchTerm, clearSearch }: BlogListProps) => {
  if (blogs.length === 0) {
    return <EmptyState searchTerm={searchTerm} clearSearch={clearSearch} />;
  }

  return (
    <section className="space-y-6">
      {blogs.map((blog) => (
        <BlogCard key={blog.id} blog={blog} />
      ))}
    </section>
  );
};

export default BlogList;
