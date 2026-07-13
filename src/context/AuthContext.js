import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginUser } from '../services/auth';

const AUTH_TOKEN_KEY = '@kampusmarket_token';
const USER_KEY = '@kampusmarket_user';
const WISHLIST_KEY = '@kampusmarket_wishlist';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [wishlist, setWishlist] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // loading for init/restore

  // Restore session from AsyncStorage on app mount
  useEffect(() => {
    const restoreSession = async () => {
      try {
        const [savedToken, savedUser, savedWishlist] = await Promise.all([
          AsyncStorage.getItem(AUTH_TOKEN_KEY),
          AsyncStorage.getItem(USER_KEY),
          AsyncStorage.getItem(WISHLIST_KEY),
        ]);

        if (savedToken && savedUser) {
          setToken(savedToken);
          setUser(JSON.parse(savedUser));
        }

        if (savedWishlist) {
          setWishlist(JSON.parse(savedWishlist));
        }
      } catch (error) {
        console.warn('Error restoring session:', error);
      } finally {
        setIsLoading(false);
      }
    };

    restoreSession();
  }, []);

  // Persist wishlist to AsyncStorage whenever it changes
  useEffect(() => {
    if (!isLoading) {
      AsyncStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist)).catch(
        (e) => console.warn('Wishlist save error:', e)
      );
    }
  }, [wishlist, isLoading]);

  /**
   * Login: call API, store token + user, update state.
   * DummyJSON login accepts username, not email.
   * We allow user to type their email but pass it as `username`
   * field since DummyJSON treats username = 'emilys' / 'alexanderw' etc.
   */
  const login = useCallback(async (emailOrUsername, password) => {
    // DummyJSON demo users use usernames, not emails.
    // Extract the part before @ if it's an email for a smoother UX.
    const username = emailOrUsername.includes('@')
      ? emailOrUsername.split('@')[0]
      : emailOrUsername;

    const data = await loginUser(username, password);
    const { accessToken, ...userData } = data;

    await Promise.all([
      AsyncStorage.setItem(AUTH_TOKEN_KEY, accessToken),
      AsyncStorage.setItem(USER_KEY, JSON.stringify(userData)),
    ]);

    setToken(accessToken);
    setUser(userData);
  }, []);

  /**
   * Logout: clear AsyncStorage, reset state.
   */
  const logout = useCallback(async () => {
    try {
      await Promise.all([
        AsyncStorage.removeItem(AUTH_TOKEN_KEY),
        AsyncStorage.removeItem(USER_KEY),
      ]);
    } catch (error) {
      console.warn('Logout error:', error);
    }
    setToken(null);
    setUser(null);
  }, []);

  /**
   * Toggle a product in/out of the wishlist.
   */
  const toggleWishlist = useCallback((product) => {
    setWishlist((prev) => {
      const isInWishlist = prev.some((item) => item.id === product.id);
      if (isInWishlist) {
        return prev.filter((item) => item.id !== product.id);
      } else {
        return [...prev, product];
      }
    });
  }, []);

  /**
   * Check if a product is in the wishlist.
   */
  const isWishlisted = useCallback(
    (productId) => wishlist.some((item) => item.id === productId),
    [wishlist]
  );

  /**
   * Remove a product from wishlist by id.
   */
  const removeFromWishlist = useCallback((productId) => {
    setWishlist((prev) => prev.filter((item) => item.id !== productId));
  }, []);

  const value = {
    user,
    token,
    isAuthenticated: !!token,
    isLoading,
    wishlist,
    login,
    logout,
    toggleWishlist,
    isWishlisted,
    removeFromWishlist,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

/**
 * Hook to access auth context.
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
