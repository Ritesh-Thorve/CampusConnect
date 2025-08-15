import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProfiles, ProfilesPaginated } from "../features/profile/studentsProfilesSlice";
import type { RootState, AppDispatch } from "../store/store";

type UseProfilesParams = {
  page?: number;
  limit?: number;
  collegeName?: string;
  graduationYear?: number;
};

export const useProfiles = (params: UseProfilesParams = {}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading, error } = useSelector((state: RootState) => state.profile);

  useEffect(() => {
    dispatch(fetchAllProfiles(params));
  }, [dispatch, params.page, params.limit, params.collegeName, params.graduationYear]);

  return { data, loading, error };
};
