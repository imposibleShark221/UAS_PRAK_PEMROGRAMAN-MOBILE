import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { AuthProvider } from './src/context/AuthContext';
import RootNavigator from './src/navigation/RootNavigator';
import ErrorBoundary from './src/components/ErrorBoundary';

/**
 * App.js - Entry point for KampusMarket
 *
 * Wraps the entire app in ErrorBoundary and AuthProvider so that all
 * screens and navigators have access to error handling, auth state,
 * user data, and wishlist context.
 */
export default function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <StatusBar style="dark" />
        <RootNavigator />
      </AuthProvider>
    </ErrorBoundary>
  );
}
