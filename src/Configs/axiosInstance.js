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
