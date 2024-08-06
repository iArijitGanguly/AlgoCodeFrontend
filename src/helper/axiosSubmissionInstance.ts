import axios from 'axios';

const axiosSubmissionInstance = axios.create();

axiosSubmissionInstance.defaults.baseURL = import.meta.env.VITE_SUBMISSION_URL;

export default axiosSubmissionInstance;