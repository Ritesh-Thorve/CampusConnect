import axiosInstance from './axiosConfig';

// Fetch all trends
export const fetchTrends = async () => {
  const response = await axiosInstance.get('/trends');
  return response.data;
};

// Create a new trend
export const createTrend = async (trendData: { title: string; description: string; tag: string }) => {
  const response = await axiosInstance.post('/trends/create', trendData);
  return response.data;
};
