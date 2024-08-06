import axios from 'axios';

const axiosInstance = axios.create();

axiosInstance.defaults.baseURL = import.meta.env.VITE_USER_URL;

export default axiosInstance;