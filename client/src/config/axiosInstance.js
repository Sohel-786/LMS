import axios from 'axios';

const axiosInstance = axios.create({
    baseURL : import.meta.env.VITE_APP_BASE_URL,
    withCredentials : true
})

export default axiosInstance;

console.log(import.meta.env.VITE_APP_BASE_URL, import.meta.env);