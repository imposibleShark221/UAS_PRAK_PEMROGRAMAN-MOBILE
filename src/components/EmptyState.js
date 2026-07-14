import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

/**
 * EmptyState - Shown when a list or search returns no results.
 * Props:
 *   title (string) - main heading
 *   subtitle (string) - description text
 *   icon (element) - icon component
 */
const EmptyState = ({
  title = 'Tidak ada produk',
  subtitle = 'Coba ubah kata kunci atau filter kategori',
  icon,
}) => {
  return (
    <View style={styles.container}>
      {icon && (
        <View style={styles.iconContainer}>
          {icon}
        </View>
      )}
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
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
    backgroundColor: '#F0FDF4',
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
  },
});

export default EmptyState;
