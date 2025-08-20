import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StudentCard from "@/components/college/StudentCard";
import EmptyState from "@/components/college/EmptyState";
import PaymentPrompt from "@/components/PaymentPrompt";
import { usePaymentStatus } from "@/hooks/usePaymentStatus";
import { useProfiles } from "@/redux/hooks/useProfiles";

const College = () => {
  const [page, setPage] = useState(1);
  const limit = 6;

  // Fetch profiles using custom hook
  const { students, data, loading, error } = useProfiles({ page, limit });

  // Used payment hook
  const { hasPaid, loading: paymentLoading } = usePaymentStatus();

  // Loader should only show while fetching and no data yet
  if (loading && !data && !error) {
    return (
      <div className="flex flex-col min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        {/* Navbar */}
        <div className="hidden md:block"><Navbar /></div>
        <div className="md:hidden sticky top-0 z-10 bg-white border-b border-gray-200 py-3 px-4">
          <div className="flex items-center justify-center">
            <img
              src="/compus-connect_logo.png"
              alt="Campus Connect"
              className="h-6 w-6 mr-2 object-cover"
            />
            <span className="text-sm font-semibold text-gray-800">Campus Connect</span>
          </div>
        </div>

        {/* Loader in middle of content */}
        <main className="flex-1 flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
        </main>

        {/* Footer */}
        <div className="hidden md:block"><Footer /></div>
        <div className="md:hidden fixed bottom-0 w-full z-50"><Navbar /></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex flex-col">
      {/* Navbar */}
      <div className="hidden md:block"><Navbar /></div>
      <div className="md:hidden sticky top-0 z-10 bg-white border-b border-gray-200 py-3 px-4">
        <div className="flex items-center justify-center">
          <img
            src="/compus-connect_logo.png"
            alt="Campus Connect"
            className="h-6 w-6 mr-2 object-cover"
          />
          <span className="text-sm font-semibold text-gray-800">Campus Connect</span>
        </div>
      </div>

      {/* Main content */}
      <main className="flex-1 pb-[calc(4rem+env(safe-area-inset-bottom))] md:pb-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-12">
          <div className="text-center mb-10 md:mb-16">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 md:mb-6">
              College{" "}
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Community
              </span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Connect with fellow students from universities around the world.
              Share your academic journey and discover new opportunities.
            </p>
          </div>

          {/* ✅ Show error if request fails */}
          {error && <p className="text-center text-red-500">{error}</p>}

          {/* ✅ Only render grid if profiles exist */}
          {students.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 md:gap-8">
              {students.map((student, index) => (
                <StudentCard key={`${student.name}-${index}`} student={student} />
              ))}
            </div>
          )}

          {/* ✅ Empty state if no profiles */}
          {!loading && !error && students.length === 0 && <EmptyState />}

          {/* Pagination */}
          {data?.totalPages && data.totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 mt-6">
              <button
                disabled={page <= 1}
                onClick={() => setPage(page - 1)}
                className="px-4 py-2 bg-indigo-500 text-white rounded disabled:opacity-50"
              >
                Prev
              </button>
              <span>
                Page {page} of {data.totalPages}
              </span>
              <button
                disabled={page >= data.totalPages}
                onClick={() => setPage(page + 1)}
                className="px-4 py-2 bg-indigo-500 text-white rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <div className="hidden md:block"><Footer /></div>
      <div className="md:hidden fixed bottom-0 w-full z-50"><Navbar /></div>

      {/* Payment Prompt only if unpaid and after status is fetched */}
      {/* Payment Prompt only if unpaid and after status is fetched */}
      {!hasPaid && !paymentLoading && (
        <PaymentPrompt
          onClose={() => { }}
          hasPaid={hasPaid}
          loading={paymentLoading}
        />
      )}
    </div>
  );
};

export default College;
