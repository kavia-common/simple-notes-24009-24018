import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../theme/ThemeContext';

// PUBLIC_INTERFACE
export default function EmptyState() {
  /** Empty placeholder for lists with gradient accent */
  const { colors } = useTheme();
  return (
    <View style={styles.wrap}>
      <View
        style={[
          styles.badge,
          { backgroundColor: colors.gradientStart, borderColor: colors.primary },
        ]}
      />
      <Text style={[styles.title, { color: colors.text }]}>No notes yet</Text>
      <Text style={[styles.caption, { color: colors.subtleText }]}>
        Tap the + button to create your first note.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { alignItems: 'center', marginTop: 80, paddingHorizontal: 20 },
  badge: {
    width: 64,
    height: 64,
    borderRadius: 14,
    borderWidth: 2,
    opacity: 0.9,
    marginBottom: 16,
  },
  title: { fontSize: 18, fontWeight: '700', marginBottom: 6 },
  caption: { fontSize: 14, textAlign: 'center' },
});
