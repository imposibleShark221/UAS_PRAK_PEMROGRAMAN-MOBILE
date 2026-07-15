import axios from 'axios';
import ENV from '../config/env';

const { BASE_URL, TIMEOUT, USE_CORS_PROXY, CORS_PROXY_DEFAULT } = ENV.API;

/**
 * Create axios instance.
 * dummyjson.com sends `Access-Control-Allow-Origin: *` for the endpoints
 * this app uses (GET /products, POST /auth/login), so it works directly
 * on web, iOS, and Android without a CORS proxy. USE_CORS_PROXY stays
 * available as an escape hatch (see src/config/env.js) but defaults to
 * false, since public proxies like thingproxy are unreliable and were
 * the actual cause of "Koneksi Bermasalah" errors.
 */
const api = axios.create({
  baseURL: USE_CORS_PROXY ? CORS_PROXY_DEFAULT + BASE_URL : BASE_URL,
  timeout: TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - bisa digunakan untuk menambahkan auth token
api.interceptors.request.use(
  (config) => {
    console.log(`[API Request] ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('[API Request Error]', error);
    return Promise.reject(error);
  }
);

// Response interceptor - handle errors globally
api.interceptors.response.use(
  (response) => {
    console.log(`[API Response] ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    // Log detailed error information
    if (error.response) {
      // Server responded with error status (4xx, 5xx)
      console.error('[API Error] Response error:', {
        status: error.response.status,
        data: error.response.data,
        url: error.config?.url,
      });
    } else if (error.request) {
      // Request was made but no response received (network error, timeout, CORS)
      console.error('[API Error] No response received:', {
        message: error.message,
        code: error.code,
        url: error.config?.url,
      });
    } else {
      // Something else happened
      console.error('[API Error] Request setup error:', error.message);
    }
    
    return Promise.reject(error);
  }
);

export default api;