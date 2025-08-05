import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { User, GraduationCap, School, MapPin, Building, IdCard, Camera, Linkedin, Twitter, Github } from 'lucide-react';
import { ProfileData } from '@/pages/Profile';

/* Profile Image Upload */
export const ProfileImageUpload = ({
  profileImage,
  onUpload
}: {
  profileImage: string;
  onUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => (
  <div className="text-center space-y-4">
    <div className="relative inline-block">
      <div className="w-32 h-32 rounded-full border-4 border-white shadow-xl overflow-hidden bg-gradient-to-br from-indigo-100 to-purple-100 mx-auto">
        {profileImage ? (
          <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <User className="w-12 h-12 text-gray-400" />
          </div>
        )}
      </div>
      <label className="absolute bottom-0 right-0 bg-indigo-600 hover:bg-indigo-700 text-white p-3 rounded-full shadow-lg cursor-pointer transition-colors">
        <Camera className="w-5 h-5" />
        <input type="file" accept="image/*" onChange={onUpload} className="hidden" />
      </label>
    </div>
    <p className="text-sm text-gray-600 font-medium">Upload your profile picture</p>
  </div>
);

/* Personal Info Section */
export const PersonalInfoSection = ({
  profileData,
  handleInputChange
}: {
  profileData: ProfileData;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div className="space-y-2">
      <Label htmlFor="name" className="text-sm font-semibold text-gray-700 flex items-center">
        <User className="w-4 h-4 mr-2 text-indigo-600" />
        Full Name
      </Label>
      <Input
        id="name"
        name="name"
        type="text"
        placeholder="Enter your full name"
        value={profileData.name}
        onChange={handleInputChange}
        required
        className="h-12 rounded-xl border-2 border-gray-200 focus:border-indigo-500"
      />
    </div>

    <div className="space-y-2">
      <Label htmlFor="email" className="text-sm font-semibold text-gray-700">Email</Label>
      <Input
        id="email"
        name="email"
        type="email"
        placeholder="Enter your email"
        value={profileData.email}
        onChange={handleInputChange}
        required
        className="h-12 rounded-xl border-2 border-gray-200 focus:border-indigo-500"
      />
    </div>
  </div>
);

/* Academic Info Section */
export const AcademicInfoSection = ({
  profileData,
  handleInputChange
}: {
  profileData: ProfileData;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}) => (
  <div className="space-y-6 bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-2xl">
    <h3 className="text-lg font-semibold text-gray-900 flex items-center">
      <GraduationCap className="w-5 h-5 mr-2 text-indigo-600" />
      Academic Information
    </h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-2">
        <Label htmlFor="collegeName" className="text-sm font-semibold text-gray-700 flex items-center">
          <School className="w-4 h-4 mr-2 text-purple-600" />
          College/University Name
        </Label>
        <Input
          id="collegeName"
          name="collegeName"
          type="text"
          placeholder="Enter your college name"
          value={profileData.collegeName}
          onChange={handleInputChange}
          required
          className="h-12 rounded-xl border-2 border-gray-200 focus:border-indigo-500 bg-white"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="collegeAddress" className="text-sm font-semibold text-gray-700 flex items-center">
          <MapPin className="w-4 h-4 mr-2 text-green-600" />
          College Address
        </Label>
        <Input
          id="collegeAddress"
          name="collegeAddress"
          type="text"
          placeholder="City, State, Country"
          value={profileData.collegeAddress}
          onChange={handleInputChange}
          required
          className="h-12 rounded-xl border-2 border-gray-200 focus:border-indigo-500 bg-white"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="major" className="text-sm font-semibold text-gray-700">Major/Field of Study</Label>
        <Input
          id="major"
          name="major"
          type="text"
          placeholder="e.g., Computer Science"
          value={profileData.major}
          onChange={handleInputChange}
          required
          className="h-12 rounded-xl border-2 border-gray-200 focus:border-indigo-500 bg-white"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="graduationYear" className="text-sm font-semibold text-gray-700">Graduation Year</Label>
        <Input
          id="graduationYear"
          name="graduationYear"
          type="text"
          placeholder="e.g., 2024"
          value={profileData.graduationYear}
          onChange={handleInputChange}
          required
          className="h-12 rounded-xl border-2 border-gray-200 focus:border-indigo-500 bg-white"
        />
      </div>
    </div>
  </div>
);

/* College Image Upload */
export const CollegeImageUpload = ({
  collegeImage,
  collegeIdCard,
  onUploadCollege,
  onUploadId
}: {
  collegeImage: string;
  collegeIdCard: string;
  onUploadCollege: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onUploadId: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
    {/* College Image */}
    <div className="space-y-4">
      <Label className="text-sm font-semibold text-gray-700 flex items-center">
        <Building className="w-4 h-4 mr-2 text-indigo-600" />
        College Image
      </Label>
      <div className="relative">
        <div className="w-full h-40 rounded-xl border-2 border-dashed border-gray-300 overflow-hidden bg-gray-50">
          {collegeImage ? (
            <img src={collegeImage} alt="College" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
              <Building className="w-8 h-8 mb-2" />
              <span className="text-sm">Upload college image</span>
            </div>
          )}
        </div>
        <label className="absolute bottom-2 right-2 bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded-full shadow-lg cursor-pointer transition-colors">
          <Camera className="w-4 h-4" />
          <input type="file" accept="image/*" onChange={onUploadCollege} className="hidden" />
        </label>
      </div>
    </div>

    {/* College ID */}
    <div className="space-y-4">
      <Label className="text-sm font-semibold text-gray-700 flex items-center">
        <IdCard className="w-4 h-4 mr-2 text-purple-600" />
        College ID Card
      </Label>
      <div className="relative">
        <div className="w-full h-40 rounded-xl border-2 border-dashed border-gray-300 overflow-hidden bg-gray-50">
          {collegeIdCard ? (
            <img src={collegeIdCard} alt="College ID" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
              <IdCard className="w-8 h-8 mb-2" />
              <span className="text-sm">Upload ID card</span>
            </div>
          )}
        </div>
        <label className="absolute bottom-2 right-2 bg-purple-600 hover:bg-purple-700 text-white p-2 rounded-full shadow-lg cursor-pointer transition-colors">
          <Camera className="w-4 h-4" />
          <input type="file" accept="image/*" onChange={onUploadId} className="hidden" />
        </label>
      </div>
    </div>
  </div>
);

/* Bio Section */
export const BioSection = ({
  bio,
  handleInputChange
}: {
  bio: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}) => (
  <div className="space-y-2">
    <Label htmlFor="bio" className="text-sm font-semibold text-gray-700">Bio</Label>
    <Textarea
      id="bio"
      name="bio"
      placeholder="Tell us about yourself, your interests, and academic goals..."
      value={bio}
      onChange={handleInputChange}
      rows={4}
      className="rounded-xl border-2 border-gray-200 focus:border-indigo-500 resize-none"
    />
  </div>
);

/* Social Links Section */
export const SocialLinksSection = ({
  profileData,
  handleInputChange
}: {
  profileData: ProfileData;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}) => (
  <div className="space-y-6 bg-gradient-to-r from-blue-50 to-green-50 p-6 rounded-2xl">
    <h3 className="text-lg font-semibold text-gray-900">Social Media Profiles</h3>
    <div className="space-y-4">
      {/* LinkedIn */}
      <div className="space-y-2">
        <Label htmlFor="linkedinUrl" className="text-sm font-semibold text-gray-700 flex items-center">
          <Linkedin className="w-4 h-4 mr-2 text-blue-600" />
          LinkedIn Profile URL
        </Label>
        <Input
          id="linkedinUrl"
          name="linkedinUrl"
          type="url"
          placeholder="https://linkedin.com/in/yourprofile"
          value={profileData.linkedinUrl}
          onChange={handleInputChange}
          className="h-12 rounded-xl border-2 border-gray-200 focus:border-indigo-500 bg-white"
        />
      </div>

      {/* Twitter */}
      <div className="space-y-2">
        <Label htmlFor="twitterUrl" className="text-sm font-semibold text-gray-700 flex items-center">
          <Twitter className="w-4 h-4 mr-2 text-sky-500" />
          Twitter Profile URL
        </Label>
        <Input
          id="twitterUrl"
          name="twitterUrl"
          type="url"
          placeholder="https://twitter.com/yourusername"
          value={profileData.twitterUrl}
          onChange={handleInputChange}
          className="h-12 rounded-xl border-2 border-gray-200 focus:border-indigo-500 bg-white"
        />
      </div>

      {/* GitHub */}
      <div className="space-y-2">
        <Label htmlFor="githubUrl" className="text-sm font-semibold text-gray-700 flex items-center">
          <Github className="w-4 h-4 mr-2 text-gray-800" />
          GitHub Profile URL
        </Label>
        <Input
          id="githubUrl"
          name="githubUrl"
          type="url"
          placeholder="https://github.com/yourusername"
          value={profileData.githubUrl}
          onChange={handleInputChange}
          className="h-12 rounded-xl border-2 border-gray-200 focus:border-indigo-500 bg-white"
        />
      </div>
    </div>
  </div>
);
