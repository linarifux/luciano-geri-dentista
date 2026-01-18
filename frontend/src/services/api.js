import axios from 'axios';
const backendUrl = import.meta.env.VITE_BACKEND_URL

const API = axios.create({
  baseURL: backendUrl,
  withCredentials: true, // Crucial for sending/receiving cookies
});

// Response interceptor for easy error handling
API.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.message || 'Si è verificato un errore';
    return Promise.reject(message);
  }
);

export default API;