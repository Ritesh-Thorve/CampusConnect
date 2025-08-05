import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Save } from 'lucide-react';
import {
  PersonalInfoSection,
  AcademicInfoSection,
  CollegeImageUpload,
  ProfileImageUpload,
  BioSection,
  SocialLinksSection
} from './ProfileSections';

import { ProfileData } from '@/pages/Profile';

interface Props {
  profileData: ProfileData;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>, type: 'profile' | 'college' | 'collegeId') => void;
  handleSubmit: (e: React.FormEvent) => void;
}

const ProfileForm = ({ profileData, handleInputChange, handleImageUpload, handleSubmit }: Props) => {
  return (
    <>
      {/* Desktop */}
      <div className="hidden md:block">
        <Card className="shadow-2xl border-0 rounded-3xl bg-white/80 backdrop-blur-sm">
          <CardHeader className="pb-6">
            <CardTitle className="text-2xl font-bold text-center text-gray-900">Academic Profile</CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              <ProfileImageUpload profileImage={profileData.profileImage} onUpload={(e) => handleImageUpload(e, 'profile')} />
              <PersonalInfoSection profileData={profileData} handleInputChange={handleInputChange} />
              <AcademicInfoSection profileData={profileData} handleInputChange={handleInputChange} />
              <CollegeImageUpload
                collegeImage={profileData.collegeImage}
                collegeIdCard={profileData.collegeIdCard}
                onUploadCollege={(e) => handleImageUpload(e, 'college')}
                onUploadId={(e) => handleImageUpload(e, 'collegeId')}
              />
              <BioSection bio={profileData.bio} handleInputChange={handleInputChange} />
              <SocialLinksSection profileData={profileData} handleInputChange={handleInputChange} />
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
    </>
  );
};

export default ProfileForm;
