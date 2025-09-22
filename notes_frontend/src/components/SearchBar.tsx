import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeContext';

type Props = {
  value: string;
  onChangeText: (t: string) => void;
  placeholder?: string;
};

// PUBLIC_INTERFACE
export default function SearchBar({ value, onChangeText, placeholder = 'Search notes' }: Props) {
  /** Minimal search input with rounded corners and subtle background */
  const { colors } = useTheme();
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: '#EEF2FF55',
          borderColor: 'transparent',
          shadowColor: colors.shadow,
        },
      ]}
    >
      <Ionicons name="search" size={18} color={colors.subtleText} />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.subtleText}
        style={[styles.input, { color: colors.text }]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginTop: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  input: { flex: 1, fontSize: 14 },
});
