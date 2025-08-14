import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Save, Loader2 } from 'lucide-react';
import {
  PersonalInfoSection,
  AcademicInfoSection,
  CollegeImageUpload,
  ProfileImageUpload,
  BioSection,
  SocialLinksSection
} from './ProfileSections';

import { ProfileData } from '@/api/profileApi';
import React from 'react';

interface Props {
  profileData: ProfileData;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleImageUpload: (
    e: React.ChangeEvent<HTMLInputElement>,
    type: 'profile' | 'college' | 'collegeId'
  ) => void;
  handleSubmit: (e: React.FormEvent) => void;
  saving: boolean;
}

const ProfileForm = ({
  profileData,
  handleInputChange,
  handleImageUpload,
  handleSubmit,
  saving
}: Props) => {
  // Guard to prevent duplicate submissions if parent didn't already handle
  const onSubmit = React.useCallback(
    (e: React.FormEvent) => {
      if (saving) {
        e.preventDefault();
        return;
      }
      handleSubmit(e);
    },
    [handleSubmit, saving]
  );

  return (
    <>
      {/* Desktop Profile Card */}
      <div className="hidden md:block">
        <Card className="shadow-2xl border-0 rounded-3xl bg-white/80 backdrop-blur-sm">
          <CardHeader className="pb-6">
            <CardTitle
              className="text-2xl font-bold text-center text-gray-900"
              aria-label="Academic Profile"
            >
              Academic Profile
            </CardTitle>
          </CardHeader>

          <CardContent className="p-8">
            <form onSubmit={onSubmit} className="space-y-8" noValidate aria-busy={saving}>
              <ProfileImageUpload
                profileImage={profileData.profileImage || ''}
                onUpload={(e) => handleImageUpload(e, 'profile')}
              />
              <PersonalInfoSection
                profileData={profileData}
                handleInputChange={handleInputChange}
              />
              <AcademicInfoSection
                profileData={profileData}
                handleInputChange={handleInputChange}
              />
              <CollegeImageUpload
                collegeImage={profileData.collegeImage || ''}
                collegeIdCard={profileData.collegeIdCard || ''}
                onUploadCollege={(e) => handleImageUpload(e, 'college')}
                onUploadId={(e) => handleImageUpload(e, 'collegeId')}
              />
              <BioSection bio={profileData.bio || ''} handleInputChange={handleInputChange} />
              <SocialLinksSection profileData={profileData} handleInputChange={handleInputChange} />
              <Button
                type="submit"
                disabled={saving}
                aria-disabled={saving}
                className="w-full h-14 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 rounded-xl text-lg font-semibold shadow-xl"
              >
                {saving ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    <span aria-live="polite">Saving...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5 mr-2" />
                    Save Profile
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* Mobile Profile Card */}
      <div className="md:hidden">
        <Card className="shadow-md border rounded-2xl bg-white">
          <CardHeader className="pb-4 px-4 pt-6">
            <CardTitle
              className="text-xl text-center font-bold text-gray-900"
              aria-label="Academic Profile"
            >
              Academic Profile
            </CardTitle>
          </CardHeader>

          <CardContent className="px-4 pb-6">
            <form onSubmit={onSubmit} className="space-y-6" noValidate aria-busy={saving}>
              <ProfileImageUpload
                profileImage={profileData.profileImage || ''}
                onUpload={(e) => handleImageUpload(e, 'profile')}
              />
              <PersonalInfoSection
                profileData={profileData}
                handleInputChange={handleInputChange}
              />
              <AcademicInfoSection
                profileData={profileData}
                handleInputChange={handleInputChange}
              />
              <CollegeImageUpload
                collegeImage={profileData.collegeImage || ''}
                collegeIdCard={profileData.collegeIdCard || ''}
                onUploadCollege={(e) => handleImageUpload(e, 'college')}
                onUploadId={(e) => handleImageUpload(e, 'collegeId')}
              />
              <BioSection bio={profileData.bio || ''} handleInputChange={handleInputChange} />
              <SocialLinksSection profileData={profileData} handleInputChange={handleInputChange} />
              <Button
                type="submit"
                disabled={saving}
                aria-disabled={saving}
                className="w-full h-12 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 rounded-lg text-base font-semibold shadow"
              >
                {saving ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    <span aria-live="polite">Saving...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5 mr-2" />
                    Save
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default ProfileForm;
