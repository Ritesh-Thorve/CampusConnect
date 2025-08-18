import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { fetchAllProfiles } from "../redux/features/profile/studentsProfilesSlice";
import { useAppDispatch } from "@/redux/store/hooks";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StudentCard from "@/components/college/StudentCard";
import EmptyState from "@/components/college/EmptyState";
import PaymentPrompt from "@/components/PaymentPrompt";
import { usePaymentStatus } from "@/hooks/usePaymentStatus";
import type { RootState } from "@/redux/store/store";
import type { StudentProfile } from "@/types/student";

const College = () => {
  const dispatch = useAppDispatch();
  const { data, loading, error } = useSelector(
    (state: RootState) => state.allStudentsProfiles
  );

  const [page, setPage] = useState(1);
  const limit = 6;

  const { hasPaid, loading: paymentLoading } = usePaymentStatus(); 

  useEffect(() => {
    dispatch(fetchAllProfiles({ page, limit }));
  }, [dispatch, page]);

  // Map API ProfileData to StudentProfile
  const students: StudentProfile[] = (data?.profiles || []).map((s) => ({
    name: s.fullName || "",
    fullName: s.fullName || "",
    email: s.email || "",
    collegeName: s.collegeName || "",
    collegeAddress: s.collegeAddress || "",
    fieldOfStudy: s.fieldOfStudy || "",
    graduationYear: s.graduationYear?.toString() || "",
    bio: s.bio || "",
    linkedinUrl: s.linkedIn || "",
    twitterUrl: s.twitter || "",
    githubUrl: s.github || "",
    profileImage: s.profileImage || "",
    collegeImage: s.collegeImage || "",
    collegeIdCard: s.collegeIdCard || "",
    major: s.fieldOfStudy || "",
  }));

  // 🔹 Show loader until both payment + profiles are ready
  if (paymentLoading || loading) {
    return (
      <div className="flex flex-col min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        {/* Navbar */}
        <div className="hidden md:block"><Navbar /></div>
        <div className="md:hidden sticky top-0 z-10 bg-white border-b border-gray-200 py-3 px-4">
          <div className="flex items-center justify-center">
            <img src="/compus-connect_logo.png" alt="Campus Connect" className="h-6 w-6 mr-2 object-cover" />
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
          <img src="/compus-connect_logo.png" alt="Campus Connect" className="h-6 w-6 mr-2 object-cover" />
          <span className="text-sm font-semibold text-gray-800">Campus Connect</span>
        </div>
      </div>

      {/* Main content */}
      <main className="flex-1 pb-[calc(4rem+env(safe-area-inset-bottom))] md:pb-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-12">
          <div className="text-center mb-10 md:mb-16">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 md:mb-6">
              College <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Community</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Connect with fellow students from universities around the world.
              Share your academic journey and discover new opportunities.
            </p>
          </div>

          {error && <p className="text-center text-red-500">{error}</p>}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 md:gap-8">
            {students.map((student, index) => (
              <StudentCard key={`${student.name}-${index}`} student={student} />
            ))}
          </div>

          {students.length === 0 && <EmptyState />}

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

      {/* Payment Prompt only if user hasn't paid */}
      {!hasPaid && <PaymentPrompt onClose={() => {}} />}
    </div>
  );
};

export default College;
