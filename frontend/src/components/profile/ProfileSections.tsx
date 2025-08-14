// src/components/profile/ProfileSections.tsx
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  User, GraduationCap, School, MapPin, Building, IdCard,
  Camera, Linkedin, Twitter, Github
} from 'lucide-react';
import type { ProfileData } from '@/api/profileApi';

/* Profile Image Upload */
export const ProfileImageUpload = ({
  profileImage,
  onUpload
}: {
  profileImage: string;
  onUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  const inputId = "profile-image-upload";
  return (
    <div className="text-center space-y-4">
      <div className="relative inline-block">
        <div className="w-32 h-32 rounded-full border-4 border-white shadow-xl overflow-hidden bg-gradient-to-br from-indigo-100 to-purple-100 mx-auto">
          {profileImage ? (
            <img src={profileImage} alt="Profile picture" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <User className="w-12 h-12 text-gray-400" />
            </div>
          )}
        </div>
        <label
          htmlFor={inputId}
          className="absolute bottom-0 right-0 bg-indigo-600 hover:bg-indigo-700 text-white p-3 rounded-full shadow-lg cursor-pointer transition-colors"
        >
          <Camera className="w-5 h-5" />
        </label>
        <input
          id={inputId}
          type="file"
          accept="image/*"
          multiple={false}
          onChange={onUpload}
          className="hidden"
        />
      </div>
      <p className="text-sm text-gray-600 font-medium">Upload your profile picture</p>
    </div>
  );
};

/* Personal Info Section */
export const PersonalInfoSection = ({ profileData, handleInputChange }: {
  profileData: ProfileData;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div className="space-y-2">
      <Label htmlFor="fullName" className="text-sm font-semibold text-gray-700 flex items-center">
        <User className="w-4 h-4 mr-2 text-indigo-600" />
        Full Name
      </Label>
      <Input
        id="fullName"
        name="fullName"
        type="text"
        placeholder="Enter your full name"
        value={profileData.fullName || ""}
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
        value={profileData.email || ""}
        onChange={handleInputChange}
        disabled
        className="h-12 rounded-xl border-2 border-gray-200 focus:border-indigo-500 bg-gray-50"
      />
    </div>
  </div>
);

/* Academic Info Section */
export const AcademicInfoSection = ({ profileData, handleInputChange }: {
  profileData: ProfileData;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}) => (
  <div className="space-y-6 bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-2xl">
    <h3 className="text-lg font-semibold text-gray-900 flex items-center">
      <GraduationCap className="w-5 h-5 mr-2 text-indigo-600" />
      Academic Information
    </h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <InputField icon={<School className="w-4 h-4 mr-2 text-purple-600" />} id="collegeName" label="College/University Name"
        value={profileData.collegeName || ""} onChange={handleInputChange} required />
      <InputField icon={<MapPin className="w-4 h-4 mr-2 text-green-600" />} id="collegeAddress" label="College Address"
        value={profileData.collegeAddress || ""} onChange={handleInputChange} required />
      <InputField id="fieldOfStudy" label="Major / Field of Study"
        value={profileData.fieldOfStudy || ""} onChange={handleInputChange} required />
      <InputField id="graduationYear" label="Graduation Year"
        type="number" min={1900} max={2100}
        value={profileData.graduationYear || ""} onChange={handleInputChange} required />
    </div>
  </div>
);

/* College Image Upload */
export const CollegeImageUpload = ({ collegeImage, collegeIdCard, onUploadCollege, onUploadId }: {
  collegeImage: string; collegeIdCard: string;
  onUploadCollege: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onUploadId: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
    <ImageUploader label="College Image" icon={<Building className="w-8 h-8 mb-2" />}
      imgSrc={collegeImage} onChange={onUploadCollege} labelColor="indigo" />
    <ImageUploader label="College ID Card" icon={<IdCard className="w-8 h-8 mb-2" />}
      imgSrc={collegeIdCard} onChange={onUploadId} labelColor="purple" />
  </div>
);

/* Bio Section */
export const BioSection = ({ bio, handleInputChange }: {
  bio: string; handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}) => (
  <div className="space-y-2">
    <Label htmlFor="bio" className="text-sm font-semibold text-gray-700">Bio</Label>
    <Textarea
      id="bio"
      name="bio"
      placeholder="Tell us about yourself, your interests, and academic goals..."
      value={bio || ""}
      onChange={handleInputChange}
      rows={4}
      className="rounded-xl border-2 border-gray-200 focus:border-indigo-500 resize-none"
    />
  </div>
);

/* Social Links Section */
export const SocialLinksSection = ({ profileData, handleInputChange }: {
  profileData: ProfileData;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}) => (
  <div className="space-y-6 bg-gradient-to-r from-blue-50 to-green-50 p-6 rounded-2xl">
    <h3 className="text-lg font-semibold text-gray-900">Social Media Profiles</h3>
    {[
      { id: "linkedIn", label: "LinkedIn Profile URL", icon: <Linkedin className="w-4 h-4 mr-2 text-blue-600" />, placeholder: "https://linkedin.com/in/yourprofile" },
      { id: "twitter", label: "Twitter Profile URL", icon: <Twitter className="w-4 h-4 mr-2 text-sky-500" />, placeholder: "https://twitter.com/yourusername" },
      { id: "github", label: "GitHub Profile URL", icon: <Github className="w-4 h-4 mr-2 text-gray-800" />, placeholder: "https://github.com/yourusername" }
    ].map(({ id, label, icon, placeholder }) => (
      <div key={id} className="space-y-2">
        <Label htmlFor={id} className="text-sm font-semibold text-gray-700 flex items-center">
          {icon}
          {label}
        </Label>
        <Input
          id={id}
          name={id}
          type="url"
          placeholder={placeholder}
          value={profileData[id as keyof ProfileData] as string || ""}
          onChange={handleInputChange}
          className="h-12 rounded-xl border-2 border-gray-200 focus:border-indigo-500 bg-white"
        />
      </div>
    ))}
  </div>
);

/* Helper Components */
const InputField = ({ id, label, value, onChange, icon, ...rest }: any) => (
  <div className="space-y-2">
    <Label htmlFor={id} className="text-sm font-semibold text-gray-700 flex items-center">
      {icon}
      {label}
    </Label>
    <Input
      id={id}
      name={id}
      value={value || ""}
      onChange={onChange}
      className="h-12 rounded-xl border-2 border-gray-200 focus:border-indigo-500 bg-white"
      {...rest}
    />
  </div>
);

const ImageUploader = ({ label, icon, imgSrc, onChange, labelColor }: any) => {
  const inputId = label.toLowerCase().replace(/\s+/g, "-");
  return (
    <div className="space-y-4">
      <Label htmlFor={inputId} className="text-sm font-semibold text-gray-700 flex items-center">
        {icon}
        {label}
      </Label>
      <div className="relative">
        <div className="w-full h-40 rounded-xl border-2 border-dashed border-gray-300 overflow-hidden bg-gray-50">
          {imgSrc ? (
            <img src={imgSrc} alt={label} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
              {icon}
              <span className="text-sm">Upload {label.toLowerCase()}</span>
            </div>
          )}
        </div>
        <label
          htmlFor={inputId}
          className={`absolute bottom-2 right-2 bg-${labelColor}-600 hover:bg-${labelColor}-700 text-white p-2 rounded-full shadow-lg cursor-pointer transition-colors`}
        >
          <Camera className="w-4 h-4" />
        </label>
        <input
          id={inputId}
          type="file"
          accept="image/*"
          multiple={false}
          onChange={onChange}
          className="hidden"
        />
      </div>
    </div>
  );
};
