import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProfiles } from "../features/profile/studentsProfilesSlice";
import type { RootState, AppDispatch } from "../store/store";
import type { StudentProfile } from "@/types/student";

type UseProfilesParams = {
  page?: number;
  limit?: number;
  collegeName?: string;
  graduationYear?: number;
};

export const useProfiles = (params: UseProfilesParams = {}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading, error } = useSelector(
    (state: RootState) => state.allStudentsProfiles
  );

  useEffect(() => {
    dispatch(fetchAllProfiles(params));
  }, [dispatch, params.page, params.limit, params.collegeName, params.graduationYear]);

  // map API response into StudentProfile[] safely
  const students: StudentProfile[] = useMemo(
    () =>
      (data?.profiles || []).map((s: any) => ({
        name: s.fullName || "",
        fullName: s.fullName || "",
        email: s.email || "",
        collegeName: s.collegeName || "",
        collegeAddress: s.collegeAddress || "",
        fieldOfStudy: s.fieldOfStudy || "",
        graduationYear: s.graduationYear?.toString() || "",
        bio: s.bio || "",
        linkedinUrl: s.linkedIn || "",
        twitterUrl: s.twitter || "",
        githubUrl: s.github || "",
        profileImage: s.profileImage || "",
        collegeImage: s.collegeImage || "",
        collegeIdCard: s.collegeIdCard || "",
        major: s.fieldOfStudy || "",
      })),
    [data]
  );

  return { students, data, loading, error };
};
