import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

/**
 * ButtonPrimary - Reusable primary action button.
 * Props:
 *   title (string) - button label
 *   onPress (func) - press handler
 *   loading (bool) - show spinner
 *   disabled (bool) - disable interaction
 *   variant ('solid' | 'outline') - style variant
 *   style (object) - extra container styles
 */
const ButtonPrimary = ({
  title,
  onPress,
  loading = false,
  disabled = false,
  variant = 'solid',
  style,
}) => {
  const isDisabled = disabled || loading;

  return (
    <TouchableOpacity
      style={[
        styles.base,
        variant === 'outline' ? styles.outline : styles.solid,
        isDisabled && styles.disabled,
        style,
      ]}
      onPress={onPress}
      disabled={isDisabled}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === 'outline' ? '#22C55E' : '#FFFFFF'}
          size="small"
        />
      ) : (
        <Text
          style={[
            styles.label,
            variant === 'outline' ? styles.labelOutline : styles.labelSolid,
          ]}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    height: 52,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  solid: {
    backgroundColor: '#22C55E',
    shadowColor: '#22C55E',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 6,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#22C55E',
  },
  disabled: {
    opacity: 0.5,
  },
  label: {
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  labelSolid: {
    color: '#FFFFFF',
  },
  labelOutline: {
    color: '#22C55E',
  },
});

export default ButtonPrimary;
