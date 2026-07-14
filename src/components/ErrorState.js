import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ButtonPrimary from './ButtonPrimary';
import { WifiOff } from 'lucide-react-native';

/**
 * ErrorState - Shown when API calls fail or network is unavailable.
 * Props:
 *   title (string) - error heading
 *   subtitle (string) - additional description
 *   onRetry (func) - retry callback
 *   isRetrying (bool) - show loading on retry button
 */
const ErrorState = ({
  title = 'Koneksi Bermasalah',
  subtitle = 'Periksa koneksi internet Anda dan coba lagi.',
  onRetry,
  isRetrying = false,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <WifiOff size={40} color="#EA580C" />
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
      {onRetry && (
        <ButtonPrimary
          title="Coba Lagi"
          onPress={onRetry}
          loading={isRetrying}
          style={styles.button}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
    paddingVertical: 60,
  },
  iconContainer: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#FFF7ED',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 21,
    marginBottom: 28,
  },
  button: {
    width: 180,
  },
});

export default ErrorState;
