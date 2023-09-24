import axios from 'axios';

const BASE_URL = 'http://localhost:2346/api/v1';

const axiosInstance = axios.create({
    baseURL : BASE_URL,
    timeout : 6000
})

export default axiosInstance;