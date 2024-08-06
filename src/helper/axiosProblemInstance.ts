import axios from 'axios';

const axiosProblemInstance = axios.create();

axiosProblemInstance.defaults.baseURL = import.meta.env.VITE_PROBLEM_URL;

export default axiosProblemInstance;