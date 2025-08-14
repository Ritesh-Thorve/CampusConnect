import { axiosInstance } from "./axiosConfig";

export type ProfileData = {
  fullName: string;
  email: string;
  collegeName: string;
  collegeAddress: string;
  fieldOfStudy: string;
  graduationYear: string | number;
  bio: string;
  linkedIn: string;
  twitter: string;
  github: string;
  profileImage: string;
  collegeImage: string;
  collegeIdCard: string;
  profileImgFile: File | null;
  collegeImgFile: File | null;
  collegeIdFile: File | null;
};

export const mapServerProfileToProfileData = (data: any): ProfileData => ({
  fullName: data.fullName || "",
  email: data.user?.email || data.email || "",
  collegeName: data.collegeName || "",
  collegeAddress: data.collegeAddress || "",
  fieldOfStudy: data.fieldOfStudy || "",
  graduationYear: data.graduationYear?.toString?.() || "",
  bio: data.bio || "",
  linkedIn: data.linkedIn || "",
  twitter: data.twitter || "",
  github: data.github || "",
  profileImage: data.profileImg || "",
  collegeImage: data.collegeImage || "",
  collegeIdCard: data.collegeIdCard || "",
  profileImgFile: null,
  collegeImgFile: null,
  collegeIdFile: null,
});

// GET profile (single route version)
export async function getProfile(): Promise<ProfileData> {
  const res = await axiosInstance.get("/profile");
  return mapServerProfileToProfileData(res.data.profile || res.data);
}

// POST or PUT to save/update profile (same route)
export async function saveProfile(payload: ProfileData): Promise<ProfileData> {
  const fd = new FormData();
  fd.append("fullName", payload.fullName || "");
  fd.append("collegeName", payload.collegeName || "");
  fd.append("collegeAddress", payload.collegeAddress || "");
  fd.append("fieldOfStudy", payload.fieldOfStudy || "");
  fd.append("graduationYear", String(payload.graduationYear || ""));
  if (payload.bio) fd.append("bio", payload.bio);
  if (payload.linkedIn) fd.append("linkedIn", payload.linkedIn);
  if (payload.twitter) fd.append("twitter", payload.twitter);
  if (payload.github) fd.append("github", payload.github);

  if (payload.profileImgFile) fd.append("profileImg", payload.profileImgFile);
  if (payload.collegeImgFile) fd.append("collegeImage", payload.collegeImgFile);
  if (payload.collegeIdFile) fd.append("collegeIdCard", payload.collegeIdFile);

  const { data } = await axiosInstance.post("/profile", fd, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return mapServerProfileToProfileData(data.profile || data);
}

// GET all profiles with pagination and optional filtering
export async function getAllProfiles(
  page: number = 1,
  limit: number = 10,
  collegeName?: string,
  graduationYear?: number
): Promise<{
  total: number;
  page: number;
  totalPages: number;
  profiles: ProfileData[];
}> {
  const params: any = { page, limit };
  if (collegeName) params.collegeName = collegeName;
  if (graduationYear) params.graduationYear = graduationYear;

  const res = await axiosInstance.get("/students/profiles", { params });

  return {
    total: res.data.total,
    page: res.data.page,
    totalPages: res.data.totalPages,
    profiles: res.data.profiles.map(mapServerProfileToProfileData),
  };
}

