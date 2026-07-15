/**
 * Environment Configuration
 * Handles platform-specific configurations and settings
 */

import { Platform } from 'react-native';

const ENV = {
  // API Configuration
  API: {
    // Base URL for the API
    BASE_URL: 'https://dummyjson.com',

    // Timeout for API requests (in milliseconds)
    TIMEOUT: 15000,

    // CORS Proxy URLs (kept for reference only - NOT used by default)
    // dummyjson.com already sends `Access-Control-Allow-Origin: *` for
    // GET /products and POST /auth/login, so no proxy is needed for those.
    // A proxy is only needed for endpoints that require credentials
    // (e.g. GET /auth/me with cookies), which this app does not use.
    CORS_PROXIES: [
      'https://thingproxy.freeboard.io/fetch/', // Free proxy, no activation needed
      'https://api.allorigins.win/raw?url=', // Another alternative
      'https://corsproxy.io/?', // Yet another alternative
    ],

    // Disabled: dummyjson.com supports CORS natively, and public proxies
    // like thingproxy are unreliable (frequent downtime / rate limits),
    // which was the actual cause of "Koneksi Bermasalah" errors.
    USE_CORS_PROXY: false,

    // Default CORS proxy - only used if USE_CORS_PROXY is manually set to true
    CORS_PROXY_DEFAULT: 'https://thingproxy.freeboard.io/fetch/',
  },

  // App Configuration
  APP: {
    // App name
    NAME: 'KampusMarket',

    // Debug mode
    DEBUG: __DEV__,

    // Platform
    PLATFORM: Platform.OS, // 'web', 'ios', 'android'
  },

  // Storage Keys
  STORAGE: {
    AUTH_TOKEN: '@kampusmarket_token',
    USER: '@kampusmarket_user',
    WISHLIST: '@kampusmarket_wishlist',
  },
};

export default ENV;