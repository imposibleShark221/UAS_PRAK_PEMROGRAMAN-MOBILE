/**
 * Safe Area Helper
 * Handles platform-specific safe area implementation
 * Avoids React 19 compatibility issues with NativeSafeAreaProvider on web
 */

import { Platform, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

/**
 * Platform-aware SafeAreaView wrapper
 * Uses SafeAreaView on mobile, regular View on web
 */
export const PlatformSafeAreaView = ({ children, style, edges = ['top'] }) => {
  // On web platform, use regular View to avoid React DOM errors
  if (Platform.OS === 'web') {
    return <View style={style}>{children}</View>;
  }

  // On mobile platforms, use SafeAreaView
  return (
    <SafeAreaView style={style} edges={edges}>
      {children}
    </SafeAreaView>
  );
};

export default PlatformSafeAreaView;