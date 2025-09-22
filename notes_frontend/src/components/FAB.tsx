import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeContext';

type Props = {
  onPress: () => void;
  icon?: keyof typeof Ionicons.glyphMap;
  testID?: string;
};

// PUBLIC_INTERFACE
export default function FAB({ onPress, icon = 'add', testID }: Props) {
  /** Floating action button with theme styling */
  const { colors } = useTheme();

  return (
    <Pressable
      onPress={onPress}
      testID={testID}
      style={({ pressed }) => [
        styles.base,
        {
          backgroundColor: colors.primary,
          transform: [{ scale: pressed ? 0.98 : 1 }],
          shadowColor: colors.shadow,
        },
      ]}
      android_ripple={{ color: 'rgba(255,255,255,0.2)' }}
      accessibilityLabel="Add note"
      accessibilityRole="button"
    >
      <Ionicons name={icon} size={26} color="white" />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    position: 'absolute',
    right: 20,
    bottom: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
  },
});
