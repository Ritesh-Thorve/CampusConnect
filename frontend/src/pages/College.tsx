import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import StudentCard from '@/components/college/StudentCard';
import EmptyState from '@/components/college/EmptyState';
import { StudentProfile } from '@/types/student';

const College = () => {
  const [students, setStudents] = useState<StudentProfile[]>([]);

  useEffect(() => {
    const userProfile = localStorage.getItem('userProfile');
    if (userProfile) {
      const profile = JSON.parse(userProfile);
      setStudents([profile]);
    }

    const mockStudents: StudentProfile[] = [
      {
        name: "Alice Johnson",
        email: "alice.johnson@mit.edu",
        collegeName: "MIT",
        collegeAddress: "Cambridge, MA, United States",
        profileImage: "",
        collegeImage: "",
        linkedinUrl: "https://linkedin.com/in/alicejohnson",
        twitterUrl: "https://twitter.com/alicejohnson",
        githubUrl: "https://github.com/alicejohnson",
        collegeIdCard: "",
        bio: "Computer Science student passionate about AI and machine learning. Love working on open source projects and contributing to the tech community.",
        major: "Computer Science",
        graduationYear: "2024"
      },
      {
        name: "Bob Smith",
        email: "bob.smith@stanford.edu",
        collegeName: "Stanford University",
        collegeAddress: "Stanford, CA, United States",
        profileImage: "",
        collegeImage: "",
        linkedinUrl: "https://linkedin.com/in/bobsmith",
        twitterUrl: "https://twitter.com/bobsmith",
        githubUrl: "https://github.com/bobsmith",
        collegeIdCard: "",
        bio: "Engineering student with interest in robotics and automation. Part-time researcher at the robotics lab working on autonomous systems.",
        major: "Mechanical Engineering",
        graduationYear: "2025"
      },
      {
        name: "Carol Davis",
        email: "carol.davis@harvard.edu",
        collegeName: "Harvard University",
        collegeAddress: "Cambridge, MA, United States",
        profileImage: "",
        collegeImage: "",
        linkedinUrl: "https://linkedin.com/in/caroldavis",
        twitterUrl: "https://twitter.com/caroldavis",
        githubUrl: "https://github.com/caroldavis",
        collegeIdCard: "",
        bio: "Business major with focus on entrepreneurship. Currently working on my startup idea in fintech and sustainable technology solutions.",
        major: "Business Administration",
        graduationYear: "2024"
      }
    ];

    setStudents(prev => {
      const existingNames = prev.map(p => p.name);
      const newStudents = mockStudents.filter(s => !existingNames.includes(s.name));
      return [...prev, ...newStudents];
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex flex-col">
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
              College <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Community</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Connect with fellow students from universities around the world.
              Share your academic journey and discover new opportunities.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 md:gap-8">
            {students.map((student, index) => (
              <StudentCard key={`${student.name}-${index}`} student={student} />
            ))}
          </div>

          {students.length === 0 && <EmptyState />}
        </div>
      </main>

      {/* Footer - hidden on mobile */}
      <div className="hidden md:block">
        <Footer />
      </div>

      {/* Mobile bottom navigation */}
      <div className="md:hidden fixed bottom-0 w-full z-50">
        <Navbar />
      </div>
    </div>
  );
};

export default College;
