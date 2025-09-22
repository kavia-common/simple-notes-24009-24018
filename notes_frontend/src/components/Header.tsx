import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeContext';

type Props = {
  title: string;
  rightIcon?: keyof typeof Ionicons.glyphMap;
  onRightPress?: () => void;
  showBack?: boolean;
  onBack?: () => void;
};

// PUBLIC_INTERFACE
export default function Header({ title, rightIcon, onRightPress, showBack, onBack }: Props) {
  /** App header with subtle gradient background and optional actions */
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.surface }]}>
      <View style={styles.row}>
        {showBack ? (
          <Pressable onPress={onBack} style={styles.iconBtn} accessibilityLabel="Go back">
            <Ionicons name="chevron-back" size={24} color={colors.text} />
          </Pressable>
        ) : (
          <View style={styles.spacer} />
        )}

        <Text style={[styles.title, { color: colors.text }]} numberOfLines={1}>
          {title}
        </Text>

        {rightIcon ? (
          <Pressable onPress={onRightPress} style={styles.iconBtn} accessibilityLabel="Action">
            <Ionicons name={rightIcon} size={22} color={colors.text} />
          </Pressable>
        ) : (
          <View style={styles.spacer} />
        )}
      </View>
      <View
        style={[
          styles.underline,
          { backgroundColor: colors.gradientStart, borderBottomColor: 'transparent' },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { paddingTop: 8, paddingBottom: 10, paddingHorizontal: 16 },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  title: { fontSize: 20, fontWeight: '700' },
  iconBtn: { width: 36, height: 36, alignItems: 'center', justifyContent: 'center', borderRadius: 18 },
  spacer: { width: 36 },
  underline: { height: 8, borderBottomWidth: StyleSheet.hairlineWidth, borderRadius: 8 },
});
