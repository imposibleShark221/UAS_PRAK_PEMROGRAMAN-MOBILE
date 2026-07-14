import React from 'react';
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';

/**
 * Loading - Full-screen loading overlay.
 * Props:
 *   message (string) - optional message below spinner
 *   overlay (bool) - if true, renders as absolute overlay
 */
const Loading = ({ message = 'Memuat...', overlay = false }) => {
  return (
    <View style={[styles.container, overlay && styles.overlay]}>
      <View style={styles.box}>
        <ActivityIndicator size="large" color="#22C55E" />
        {message ? <Text style={styles.message}>{message}</Text> : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F9FAFB',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    zIndex: 999,
  },
  box: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 28,
    paddingHorizontal: 40,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  message: {
    marginTop: 14,
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
});

export default Loading;
