const isLocal = typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');

export const API_BASE = isLocal 
  ? 'http://localhost:5000/api'
  : 'https://portfolio-backend-9ljd.onrender.com/api';

export default API_BASE;
