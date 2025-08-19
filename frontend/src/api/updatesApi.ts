import axios from './axiosConfig';

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
  const response = await axios.post('/api/updates/create', data);
  return response.data.update as Update;
};

// Get all updates
export const getAllUpdatesApi = async () => {
  const response = await axios.get('/api/updates');
  return response.data.updates as Update[];
};

