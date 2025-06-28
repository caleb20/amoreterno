import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || '', // Next.js expone variables NEXT_PUBLIC_*
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
