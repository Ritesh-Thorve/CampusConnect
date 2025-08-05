'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProfileForm from '../components/profile/ProfileForm';
import { useToast } from '@/hooks/use-toast';

export interface ProfileData {
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
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
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
      title: 'Profile Updated',
      description: 'Your profile has been successfully updated!',
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex flex-col">
      <div className="hidden md:block">
        <Navbar />
      </div>
      <div className="md:hidden sticky top-0 z-10 bg-white border-b border-gray-200 py-3 px-4">
        <div className="flex items-center justify-center">
          <img src="/compus-connect_logo.png" alt="Campus Connect" className="h-6 w-6 mr-2 object-cover" />
          <span className="text-sm font-semibold text-gray-800">Campus Connect</span>
        </div>
      </div>

      <main className="flex-1 pb-28 md:pb-0 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-12">
          <ProfileForm
            profileData={profileData}
            handleInputChange={handleInputChange}
            handleImageUpload={handleImageUpload}
            handleSubmit={handleSubmit}
          />
        </div>
      </main>

      <div className="hidden md:block">
        <Footer />
      </div>
      <div className="md:hidden fixed bottom-0 w-full z-50">
        <Navbar />
      </div>
    </div>
  );
};

export default Profile;
