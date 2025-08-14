import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BlogCard from './BlogCard';
import EmptyState from './EmptyState';
import { getTrends } from '@/redux/features/trends/trendsSlice';
import type { RootState, AppDispatch } from '@/redux/store/store';

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


interface TrendsListProps {
  blogs: BlogPost[];
  searchTerm?: string;
  clearSearch?: () => void;
}


const TrendsList = ({ searchTerm = '', clearSearch = () => {} }: TrendsListProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const { trends, loading, error } = useSelector((state: RootState) => state.trends);

  useEffect(() => {
    dispatch(getTrends());
  }, [dispatch]);

  if (loading) return <p>Loading trends...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!trends.length) return <EmptyState searchTerm={searchTerm} clearSearch={clearSearch} />;

  return (
    <section className="space-y-6">
      {trends.map((trend) => (
        <BlogCard
          key={trend.id}
          item={{
            id: trend.id,
            title: trend.title,
            description: trend.description,
            tags: trend.tag, // single tag
          }}
        />
      ))}
    </section>
  );
};

export default TrendsList;
