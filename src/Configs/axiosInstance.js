import axios from 'axios';
const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;


const axiosInstance = axios.create({
    baseURL: apiUrl,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('AccessToken')}`,
    },
});

export default axiosInstance;

export const axiosInstanceForFile = axios.create({
    baseURL: apiUrl,
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('AccessToken')}`,
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        // 'Content-Type': 'application/json',
    },
    // responseType: 'arraybuffer',
});

