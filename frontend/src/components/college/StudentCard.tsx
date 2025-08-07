import { MapPin, Linkedin, User, School, GraduationCap, Github, Twitter, Mail } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { StudentProfile } from '@/types/student';

interface StudentCardProps {
  student: StudentProfile;
}

// Student profile card component
const StudentCard = ({ student }: StudentCardProps) => {
  return (
    <Card className="group shadow-xl border-0 rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 bg-white/80 backdrop-blur-sm max-w-md mx-auto">
      <div className="relative">

        {/* College image background */}
        <div className="h-40 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 relative overflow-hidden">
          {student.collegeImage ? (
            <img
              src={student.collegeImage}
              alt={student.collegeName}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              loading="lazy"
            />
          ) : (
            <div className="flex items-center justify-center h-full relative">
              <School className="w-16 h-16 text-white/80 group-hover:scale-110 transition-transform duration-300" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
        </div>

        {/* Profile image and name */}
        <div className="absolute -bottom-12 left-4 right-4 flex items-end gap-4">
          {/* Profile image */}
          <div className="w-24 h-24 rounded-full   border-4 border-white shadow-2xl overflow-hidden bg-gradient-to-br from-indigo-100 to-purple-100 group-hover:scale-105 transition-transform duration-300 flex-shrink-0">
            {student.profileImage ? (
              <img
                src={student.profileImage}
                alt={student.name}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <User className="w-8 h-8 text-gray-400" />
              </div>
            )}
          </div>

          {/* Student name */}
          <div className="flex-1 pb-2 min-w-0">
            <h3 className="text-xl font-bold text-Black drop-shadow-lg group-hover:text-blue-700 transition-colors truncate">
              {student.name}
            </h3>
          </div>
        </div>
      </div>

      {/* Card content */}
      <CardContent className="pt-16 px-6 pb-6">
        <div className="space-y-5">
          {/* Academic info */}
          <div>
            <div className="flex items-center text-sm text-gray-600 mb-2">
              <GraduationCap className="w-5 h-5 mr-2 text-indigo-500 flex-shrink-0" />
              <span className="font-medium truncate">{student.major} • Class of {student.graduationYear}</span>
            </div>
          </div>

          {/* College info */}
          <div className="space-y-2 bg-gradient-to-r from-gray-50 to-indigo-50 p-4 rounded-2xl">
            <div className="flex items-center text-base font-semibold text-gray-800">
              <School className="w-5 h-5 mr-3 text-indigo-600 flex-shrink-0" />
              <span className="truncate">{student.collegeName}</span>
            </div>
            <div className="flex items-start text-sm text-gray-600">
              <MapPin className="w-5 h-5 mr-3 mt-0.5 text-purple-600 flex-shrink-0" />
              <span className="break-words">{student.collegeAddress}</span>
            </div>
          </div>

          {/* Student bio */}
          {student.bio && (
            <div className="text-sm text-gray-700 bg-gradient-to-r from-white to-purple-50 p-4 rounded-2xl border border-purple-100">
              <p className="leading-relaxed line-clamp-4">{student.bio}</p>
            </div>
          )}

          {/* Social/contact links */}
          <div className="flex items-center justify-between pt-3 border-t border-gray-100">
            {student.linkedinUrl && (
              <a
                href={student.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-sm text-indigo-600 hover:text-indigo-700 font-semibold transition-colors group/link"
              >
                <Linkedin className="w-5 h-5 mr-2 group-hover/link:scale-110 transition-transform flex-shrink-0" />
                <span>LinkedIn</span>
              </a>
            )}

            {/* Social Media logo*/}
            <div className="flex items-center gap-3 text-gray-500">
              {student.githubUrl && (
                <a href={student.githubUrl} className="text-gray-400 hover:text-gray-900 transition-colors" target="_blank" rel="noopener noreferrer">
                  <Github className="w-5 h-5" />
                </a>
              )}
              {student.twitterUrl && (
                <a href={student.twitterUrl} className="text-gray-400 hover:text-blue-900 transition-colors" target="_blank" rel="noopener noreferrer">
                  <Twitter className="w-5 h-5" />
                </a>
              )}
              {student.email && (
                <a href={`mailto:${student.email}`} className="text-gray-400 hover:text-red-900 transition-colors">
                  <Mail className="w-5 h-5" />
                </a>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StudentCard;
