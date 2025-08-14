// src/pages/Profile.tsx
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProfileForm from "@/components/profile/ProfileForm";
import { useAppDispatch, useAppSelector } from "@/redux/store/hooks";
import { fetchProfile, saveOrUpdateProfile } from "@/redux/features/profile/profileSlice";
import type { ProfileData } from "@/api/profileApi";
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
  const token = useAppSelector((s) => s.auth.token); // watch token to avoid fetching without auth
  const authEmail = useAppSelector((s) => s.auth.user?.email || "");
  const { data: serverProfile, loading } = useAppSelector((s) => s.profile);

  // Support both shapes of loading: boolean or { fetch, save }
  const isSaving = typeof loading === "object" ? loading.save : loading;
  const isFetching = typeof loading === "object" ? loading.fetch : loading;

  const [profileData, setProfileData] = useState<ProfileData>({
    ...emptyProfile,
    email: authEmail,
  });

  // Fetch only when token exists (prevents unauthorized fetch right after login)
  useEffect(() => {
    if (token) {
      dispatch(fetchProfile());
    }
  }, [dispatch, token]);

  // Sync local state with server profile
  useEffect(() => {
    if (serverProfile) {
      setProfileData({
        ...serverProfile,
        email: authEmail || serverProfile.email || "",
        profileImgFile: null,
        collegeImgFile: null,
        collegeIdFile: null,
      });
    } else {
      setProfileData((prev) => ({ ...prev, email: authEmail }));
    }
  }, [serverProfile, authEmail]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

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
      <div className="hidden md:block">
        <Navbar />
      </div>
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

      {/* Main */}
      <main className="min-h-screen flex-1 pb-28 md:pb-0 overflow-y-auto relative z-0">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-12">
          <ProfileForm
            profileData={profileData}
            handleInputChange={handleInputChange}
            handleImageUpload={handleImageUpload}
            handleSubmit={handleSubmit}
            saving={isSaving} // boolean only
          />
          {isFetching && <p className="text-center mt-4">Loading...</p>}
        </div>
      </main>

      {/* Footer */}
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
