import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useAuth } from '../context/AuthContext';
import AuthNavigator from './AuthNavigator';
import MainTabNavigator from './MainTabNavigator';
import Loading from '../components/Loading';

/**
 * RootNavigator
 * Decides whether to show the Auth flow or the Main app
 * based on authentication state from AuthContext.
 */
const RootNavigator = () => {
  const { isAuthenticated, isLoading } = useAuth();

  // Waiting for AsyncStorage session restore
  if (isLoading) {
    return <Loading message="KampusMarket..." />;
  }

  return (
    <NavigationContainer>
      {isAuthenticated ? <MainTabNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default RootNavigator;
