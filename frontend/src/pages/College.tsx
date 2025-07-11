
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import StudentCard from '@/components/college/StudentCard';
import EmptyState from '@/components/college/EmptyState';
import { StudentProfile } from '@/types/student';

const College = () => {
  const [students, setStudents] = useState<StudentProfile[]>([]);

  useEffect(() => {
    // Load current user profile from localStorage
    const userProfile = localStorage.getItem('userProfile');
    if (userProfile) {
      const profile = JSON.parse(userProfile);
      setStudents([profile]);
    }

    // In a real app, you would fetch all student profiles from a database
    // For now, we'll show some mock data along with the user's profile
    const mockStudents: StudentProfile[] = [
      {
        name: "Alice Johnson",
        collegeName: "MIT",
        collegeAddress: "Cambridge, MA, United States",
        profileImage: "",
        collegeImage: "",
        linkedinUrl: "https://linkedin.com/in/alicejohnson",
        bio: "Computer Science student passionate about AI and machine learning. Love working on open source projects and contributing to the tech community.",
        major: "Computer Science",
        graduationYear: "2024"
      },
      {
        name: "Bob Smith",
        collegeName: "Stanford University",
        collegeAddress: "Stanford, CA, United States",
        profileImage: "",
        collegeImage: "",
        linkedinUrl: "https://linkedin.com/in/bobsmith",
        bio: "Engineering student with interest in robotics and automation. Part-time researcher at the robotics lab working on autonomous systems.",
        major: "Mechanical Engineering",
        graduationYear: "2025"
      },
      {
        name: "Carol Davis",
        collegeName: "Harvard University",
        collegeAddress: "Cambridge, MA, United States",
        profileImage: "",
        collegeImage: "",
        linkedinUrl: "https://linkedin.com/in/caroldavis",
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
      <Navbar />
      
      <div className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              College <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Community</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Connect with fellow students from universities around the world. 
              Share your academic journey and discover new opportunities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {students.map((student, index) => (
              <StudentCard key={index} student={student} />
            ))}
          </div>

          {students.length === 0 && <EmptyState />}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default College;
