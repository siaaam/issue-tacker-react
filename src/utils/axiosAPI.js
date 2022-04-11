import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_PRODUCTION_URL,
});

const axiosAPI = async ({ method, url, data, config = {} }) => {
  const res = await axiosInstance({
    method,
    url,
    data,
    ...config,
  });
  return res.data;
};

export default axiosAPI;
