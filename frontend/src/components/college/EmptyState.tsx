
import { School } from 'lucide-react';

const EmptyState = () => {
  return (
    <div className="text-center py-20">
      <div className="w-24 h-24 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <School className="w-12 h-12 text-indigo-600" />
      </div>
      <h3 className="text-2xl font-bold text-gray-600 mb-4">No Student Profiles Yet</h3>
      <p className="text-lg text-gray-500">Be the first to complete your profile and join the community!</p>
    </div>
  );
};

export default EmptyState;
