import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://api.jikan.moe/v4',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add interceptors if needed later
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    // Handle global errors here
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);
