'use client';

import { useState, useEffect } from 'react';
import { Camera, User, MapPin, School, GraduationCap, Linkedin, Twitter, Github, Save, Building, IdCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface ProfileData {
  name: string;
  email: string;
  collegeName: string;
  collegeAddress: string;
  major: string;
  graduationYear: string;
  bio: string;
  linkedinUrl: string;
  twitterUrl: string;
  githubUrl: string;
  profileImage: string;
  collegeImage: string;
  collegeIdCard: string;
}

const Profile = () => {
  const { toast } = useToast();
  const [profileData, setProfileData] = useState<ProfileData>({
    name: '',
    email: '',
    collegeName: '',
    collegeAddress: '',
    major: '',
    graduationYear: '',
    bio: '',
    linkedinUrl: '',
    twitterUrl: '',
    githubUrl: '',
    profileImage: '',
    collegeImage: '',
    collegeIdCard: ''
  });

  useEffect(() => {
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
      setProfileData(JSON.parse(savedProfile));
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'profile' | 'college' | 'collegeId') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageUrl = event.target?.result as string;
        setProfileData({
          ...profileData,
          [type === 'profile' ? 'profileImage' : type === 'college' ? 'collegeImage' : 'collegeIdCard']: imageUrl
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('userProfile', JSON.stringify(profileData));
    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated!",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex flex-col">
      {/* Desktop Navbar */}
      <div className="hidden md:block">
        <Navbar />
      </div>

      {/* Mobile Header */}
      <div className="md:hidden sticky top-0 z-10 bg-white border-b border-gray-200 py-3 px-4">
        <div className="flex items-center justify-center">
          <img src="/compus-connect_logo.png" alt="Campus Connect" className="h-6 w-6 mr-2 object-cover" />
          <span className="text-sm font-semibold text-gray-800">Campus Connect</span>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 pb-28 md:pb-0 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-12">
          {/* Desktop Title */}
          <div className="hidden md:block text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Your <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Profile</span>
            </h1>
            <p className="text-xl text-gray-600">
              Complete your profile to connect with the campus community
            </p>
          </div>

          {/* Mobile Title */}
          <div className="md:hidden text-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Your <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Profile</span>
            </h1>
            <p className="text-gray-600">
              Complete your profile to connect with the campus community
            </p>
          </div>

          {/* Desktop Card */}
          <div className="hidden md:block">
            <Card className="shadow-2xl border-0 rounded-3xl bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-6">
                <CardTitle className="text-2xl font-bold text-center text-gray-900">Academic Profile</CardTitle>
              </CardHeader>
              
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Profile Image Section */}
                  <div className="text-center space-y-4">
                    <div className="relative inline-block">
                      <div className="w-32 h-32 rounded-full border-4 border-white shadow-xl overflow-hidden bg-gradient-to-br from-indigo-100 to-purple-100 mx-auto">
                        {profileData.profileImage ? (
                          <img 
                            src={profileData.profileImage} 
                            alt="Profile" 
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <User className="w-12 h-12 text-gray-400" />
                          </div>
                        )}
                      </div>
                      <label className="absolute bottom-0 right-0 bg-indigo-600 hover:bg-indigo-700 text-white p-3 rounded-full shadow-lg cursor-pointer transition-colors">
                        <Camera className="w-5 h-5" />
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageUpload(e, 'profile')}
                          className="hidden"
                        />
                      </label>
                    </div>
                    <p className="text-sm text-gray-600 font-medium">Upload your profile picture</p>
                  </div>

                  {/* Personal Information */}
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

                  {/* Academic Information */}
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

                    {/* College Images Section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                      {/* College Image Upload */}
                      <div className="space-y-4">
                        <Label className="text-sm font-semibold text-gray-700 flex items-center">
                          <Building className="w-4 h-4 mr-2 text-indigo-600" />
                          College Image
                        </Label>
                        <div className="relative">
                          <div className="w-full h-40 rounded-xl border-2 border-dashed border-gray-300 overflow-hidden bg-gray-50">
                            {profileData.collegeImage ? (
                              <img 
                                src={profileData.collegeImage} 
                                alt="College" 
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
                                <Building className="w-8 h-8 mb-2" />
                                <span className="text-sm">Upload college image</span>
                              </div>
                            )}
                          </div>
                          <label className="absolute bottom-2 right-2 bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded-full shadow-lg cursor-pointer transition-colors">
                            <Camera className="w-4 h-4" />
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleImageUpload(e, 'college')}
                              className="hidden"
                            />
                          </label>
                        </div>
                      </div>

                      {/* College ID Card Upload */}
                      <div className="space-y-4">
                        <Label className="text-sm font-semibold text-gray-700 flex items-center">
                          <IdCard className="w-4 h-4 mr-2 text-purple-600" />
                          College ID Card
                        </Label>
                        <div className="relative">
                          <div className="w-full h-40 rounded-xl border-2 border-dashed border-gray-300 overflow-hidden bg-gray-50">
                            {profileData.collegeIdCard ? (
                              <img 
                                src={profileData.collegeIdCard} 
                                alt="College ID" 
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
                                <IdCard className="w-8 h-8 mb-2" />
                                <span className="text-sm">Upload ID card</span>
                              </div>
                            )}
                          </div>
                          <label className="absolute bottom-2 right-2 bg-purple-600 hover:bg-purple-700 text-white p-2 rounded-full shadow-lg cursor-pointer transition-colors">
                            <Camera className="w-4 h-4" />
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleImageUpload(e, 'collegeId')}
                              className="hidden"
                            />
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bio Section */}
                  <div className="space-y-2">
                    <Label htmlFor="bio" className="text-sm font-semibold text-gray-700">Bio</Label>
                    <Textarea
                      id="bio"
                      name="bio"
                      placeholder="Tell us about yourself, your interests, and academic goals..."
                      value={profileData.bio}
                      onChange={handleInputChange}
                      rows={4}
                      className="rounded-xl border-2 border-gray-200 focus:border-indigo-500 resize-none"
                    />
                  </div>

                  {/* Social Media Links */}
                  <div className="space-y-6 bg-gradient-to-r from-blue-50 to-green-50 p-6 rounded-2xl">
                    <h3 className="text-lg font-semibold text-gray-900">Social Media Profiles</h3>
                    
                    <div className="space-y-4">
                      {/* LinkedIn URL */}
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

                      {/* Twitter URL */}
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

                      {/* GitHub URL */}
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

                  <Button
                    type="submit"
                    className="w-full h-14 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 rounded-xl text-lg font-semibold shadow-xl"
                  >
                    <Save className="w-5 h-5 mr-2" />
                    Save Profile
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Mobile Card */}
          <div className="md:hidden">
            <Card className="shadow-sm border rounded-xl overflow-hidden mb-6">
              <CardContent className="p-5 space-y-4">
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Profile Image */}
                  <div className="flex flex-col items-center space-y-3">
                    <div className="relative">
                      <div className="w-24 h-24 rounded-full border-4 border-white shadow-md overflow-hidden bg-gray-100">
                        {profileData.profileImage ? (
                          <img 
                            src={profileData.profileImage} 
                            alt="Profile" 
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <User className="w-8 h-8 text-gray-400" />
                          </div>
                        )}
                      </div>
                      <label className="absolute bottom-0 right-0 bg-indigo-600 text-white p-2 rounded-full shadow-sm">
                        <Camera className="w-4 h-4" />
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageUpload(e, 'profile')}
                          className="hidden"
                        />
                      </label>
                    </div>
                    <p className="text-xs text-gray-600">Upload profile picture</p>
                  </div>

                  {/* Personal Info */}
                  <div className="space-y-3">
                    <Label className="text-sm font-medium text-gray-700 flex items-center">
                      <User className="w-4 h-4 mr-2 text-indigo-600" />
                      Full Name
                    </Label>
                    <Input
                      name="name"
                      value={profileData.name}
                      onChange={handleInputChange}
                      required
                      className="h-10"
                    />
                  </div>

                  <div className="space-y-3">
                    <Label className="text-sm font-medium text-gray-700">Email</Label>
                    <Input
                      name="email"
                      type="email"
                      value={profileData.email}
                      onChange={handleInputChange}
                      required
                      className="h-10"
                    />
                  </div>

                  {/* Academic Info */}
                  <div className="space-y-3">
                    <Label className="text-sm font-medium text-gray-700 flex items-center">
                      <School className="w-4 h-4 mr-2 text-purple-600" />
                      College Name
                    </Label>
                    <Input
                      name="collegeName"
                      value={profileData.collegeName}
                      onChange={handleInputChange}
                      required
                      className="h-10"
                    />
                  </div>

                  <div className="space-y-3">
                    <Label className="text-sm font-medium text-gray-700 flex items-center">
                      <MapPin className="w-4 h-4 mr-2 text-green-600" />
                      College Address
                    </Label>
                    <Input
                      name="collegeAddress"
                      value={profileData.collegeAddress}
                      onChange={handleInputChange}
                      required
                      className="h-10"
                    />
                  </div>

                  <div className="space-y-3">
                    <Label className="text-sm font-medium text-gray-700">Major</Label>
                    <Input
                      name="major"
                      value={profileData.major}
                      onChange={handleInputChange}
                      required
                      className="h-10"
                    />
                  </div>

                  <div className="space-y-3">
                    <Label className="text-sm font-medium text-gray-700">Graduation Year</Label>
                    <Input
                      name="graduationYear"
                      value={profileData.graduationYear}
                      onChange={handleInputChange}
                      required
                      className="h-10"
                    />
                  </div>

                  {/* College Images */}
                  <div className="space-y-3">
                    <Label className="text-sm font-medium text-gray-700 flex items-center">
                      <Building className="w-4 h-4 mr-2 text-indigo-600" />
                      College Image
                    </Label>
                    <div className="relative h-32 rounded-lg border-2 border-dashed border-gray-300 bg-gray-50">
                      {profileData.collegeImage ? (
                        <img 
                          src={profileData.collegeImage} 
                          alt="College" 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
                          <Building className="w-6 h-6 mb-1" />
                          <span className="text-xs">Upload college image</span>
                        </div>
                      )}
                      <label className="absolute bottom-2 right-2 bg-indigo-600 text-white p-1.5 rounded-full">
                        <Camera className="w-3 h-3" />
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageUpload(e, 'college')}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label className="text-sm font-medium text-gray-700 flex items-center">
                      <IdCard className="w-4 h-4 mr-2 text-purple-600" />
                      College ID Card
                    </Label>
                    <div className="relative h-32 rounded-lg border-2 border-dashed border-gray-300 bg-gray-50">
                      {profileData.collegeIdCard ? (
                        <img 
                          src={profileData.collegeIdCard} 
                          alt="College ID" 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
                          <IdCard className="w-6 h-6 mb-1" />
                          <span className="text-xs">Upload ID card</span>
                        </div>
                      )}
                      <label className="absolute bottom-2 right-2 bg-purple-600 text-white p-1.5 rounded-full">
                        <Camera className="w-3 h-3" />
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageUpload(e, 'collegeId')}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>

                  {/* Bio */}
                  <div className="space-y-3">
                    <Label className="text-sm font-medium text-gray-700">Bio</Label>
                    <Textarea
                      name="bio"
                      value={profileData.bio}
                      onChange={handleInputChange}
                      rows={3}
                      className="min-h-[100px]"
                    />
                  </div>

                  {/* Social Links */}
                  <div className="space-y-3">
                    <Label className="text-sm font-medium text-gray-700 flex items-center">
                      <Linkedin className="w-4 h-4 mr-2 text-blue-600" />
                      LinkedIn URL
                    </Label>
                    <Input
                      name="linkedinUrl"
                      value={profileData.linkedinUrl}
                      onChange={handleInputChange}
                      className="h-10"
                    />
                  </div>

                  <div className="space-y-3">
                    <Label className="text-sm font-medium text-gray-700 flex items-center">
                      <Twitter className="w-4 h-4 mr-2 text-sky-500" />
                      Twitter URL
                    </Label>
                    <Input
                      name="twitterUrl"
                      value={profileData.twitterUrl}
                      onChange={handleInputChange}
                      className="h-10"
                    />
                  </div>

                  <div className="space-y-3">
                    <Label className="text-sm font-medium text-gray-700 flex items-center">
                      <Github className="w-4 h-4 mr-2 text-gray-800" />
                      GitHub URL
                    </Label>
                    <Input
                      name="githubUrl"
                      value={profileData.githubUrl}
                      onChange={handleInputChange}
                      className="h-10"
                    />
                  </div>

                  <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700">
                    <Save className="w-4 h-4 mr-2" />
                    Save Profile
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Desktop Footer */}
      <div className="hidden md:block">
        <Footer />
      </div>

      {/* Mobile Bottom Navbar */}
      <div className="md:hidden fixed bottom-0 w-full z-50">
        <Navbar />
      </div>
    </div>
  );
};

export default Profile;