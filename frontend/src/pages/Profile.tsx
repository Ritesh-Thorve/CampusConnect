import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProfileForm from "@/components/profile/ProfileForm";
import { useAppDispatch, useAppSelector } from "@/redux/store/hooks";
import { fetchProfile, saveOrUpdateProfile } from "@/redux/features/profile/profileSlice";
import { loginWithGoogle } from "@/redux/features/auth/authSlice"; 
import type { ProfileData } from "@/api/profileApi";
import { mapServerProfileToProfileData } from "@/api/profileApi";
import toast from "react-hot-toast";

const emptyProfile: ProfileData = {
  fullName: "",
  email: "",
  collegeName: "",
  collegeAddress: "",
  fieldOfStudy: "",
  graduationYear: "",
  bio: "",
  linkedIn: "",
  twitter: "",
  github: "",
  profileImage: "",
  collegeImage: "",
  collegeIdCard: "",
  profileImgFile: null,
  collegeImgFile: null,
  collegeIdFile: null,
};

const Profile = () => {
  const dispatch = useAppDispatch();
  const token = useAppSelector((s) => s.auth.token);
  const authEmail = useAppSelector((s) => s.auth.user?.email || "");
  const { data: serverProfile, loading } = useAppSelector((s) => s.profile);

  const isSaving = typeof loading === "object" ? loading.save : loading;
  const isFetching = typeof loading === "object" ? loading.fetch : loading;

  const [profileData, setProfileData] = useState<ProfileData>({
    ...emptyProfile,
    email: authEmail,
  });

  // Sync Google session into Redux on mount
  useEffect(() => {
    dispatch(loginWithGoogle());
  }, [dispatch]);

  // Fetch profile on token available
  useEffect(() => {
    if (token) dispatch(fetchProfile());
  }, [dispatch, token]);

  // Update state when server profile is fetched
  useEffect(() => {
    if (serverProfile) {
      const mapped = mapServerProfileToProfileData(serverProfile);
      setProfileData({
        ...mapped,
        email: authEmail || mapped.email,
        profileImgFile: null,
        collegeImgFile: null,
        collegeIdFile: null,
      });
    } else {
      setProfileData((prev) => ({ ...prev, email: authEmail }));
    }
  }, [serverProfile, authEmail]);

  // Handle text inputs
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle image uploads
  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "profile" | "college" | "collegeId"
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (ev) => {
      const url = ev.target?.result as string;
      const map = {
        profile: { urlKey: "profileImage", fileKey: "profileImgFile" },
        college: { urlKey: "collegeImage", fileKey: "collegeImgFile" },
        collegeId: { urlKey: "collegeIdCard", fileKey: "collegeIdFile" },
      } as const;

      setProfileData((prev) => ({
        ...prev,
        [map[type].urlKey]: url,
        [map[type].fileKey]: file,
      }));
    };
    reader.readAsDataURL(file);
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(saveOrUpdateProfile(profileData)).unwrap();
      toast.success(serverProfile ? "Profile updated successfully" : "Profile created successfully");
    } catch (err: any) {
      toast.error(err || "Failed to save profile");
    }
  };

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

      {/* Main Form */}
      <main className="min-h-screen flex-1 pb-28 md:pb-0 overflow-y-auto relative z-0">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-12">
          <ProfileForm
            profileData={profileData}
            handleInputChange={handleInputChange}
            handleImageUpload={handleImageUpload}
            handleSubmit={handleSubmit}
            saving={isSaving}
          />
          {isFetching && <p className="text-center mt-4">Loading...</p>}
        </div>
      </main>

      {/* Footer */}
      <div className="hidden md:block"><Footer /></div>
      <div className="md:hidden fixed bottom-0 w-full z-50"><Navbar /></div>
    </div>
  );
};

export default Profile;
