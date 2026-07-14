import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { AuthProvider } from './src/context/AuthContext';
import RootNavigator from './src/navigation/RootNavigator';

/**
 * App.js - Entry point for KampusMarket
 *
 * Wraps the entire app in AuthProvider so that all
 * screens and navigators have access to auth state,
 * user data, and wishlist context.
 */
export default function App() {
  return (
    <AuthProvider>
      <StatusBar style="dark" />
      <RootNavigator />
    </AuthProvider>
  );
}
