// src/api/updatesApi.ts
import axios from './axiosConfig'; // your pre-configured axios instance

export interface Update {
  id: string;
  title: string;
  type: string;
  details: string;
  link?: string;
  userId: string;
  createdAt: string;
  user?: {
    fullname: string;
    email: string;
  };
}

// Create a new update
export const createUpdateApi = async (data: Omit<Update, 'id' | 'userId' | 'createdAt'>) => {
  const response = await axios.post('/updates/create', data);
  return response.data.update as Update;
};

// Get all updates
export const getAllUpdatesApi = async () => {
  const response = await axios.get('/updates');
  return response.data.updates as Update[];
};

// Get updates of the logged-in user
export const getUserUpdatesApi = async () => {
  const response = await axios.get('/updates/your-updates');
  return response.data.updates as Update[];
};
