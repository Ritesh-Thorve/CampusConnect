import { PlusCircle } from 'lucide-react';

interface EmptyStateProps {
  searchTerm: string;
  clearSearch: () => void;
}

const EmptyState = ({ searchTerm, clearSearch }: EmptyStateProps) => (
  // Container for the empty state message and visuals, centered with padding

  <div className="text-center py-20">
    <div className="relative mb-8">

      {/* Circle with plus icon as a visual element */}
      <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto shadow-lg">
        <PlusCircle className="w-10 h-10 text-blue-600" />
      </div>

      {/* Decorative sparkle badge positioned at top-right of the circle */}
      <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
        <span className="text-lg">✨</span>
      </div>
    </div>

    {/* Title that changes based on whether a search term is present */}
    <h3 className="text-2xl font-bold text-gray-900 mb-3">
      {searchTerm ? 'No matching articles found' : 'No articles yet'}
    </h3>

    {/* Subtitle message adjusting based on search state */}
    <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
      {searchTerm
        ? 'Try adjusting your search terms or explore different topics'
        : 'Be the first to share your insights with the community!'
      }
    </p>

    {/* Clear search button shown only if there is an active search term */}
    {searchTerm && (
      <button
        onClick={clearSearch}
        className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-full hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl"
      >
        Clear Search
      </button>
    )}
  </div>
);

export default EmptyState;
