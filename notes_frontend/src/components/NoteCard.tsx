import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useTheme } from '../theme/ThemeContext';

export type Note = {
  id: string;
  title: string;
  content: string;
  category: string;
  updatedAt: number;
};

type Props = {
  note: Note;
  onPress: (n: Note) => void;
};

// PUBLIC_INTERFACE
export default function NoteCard({ note, onPress }: Props) {
  /** Card displaying a note summary with modern rounded style and subtle shadow */
  const { colors, radius } = useTheme();

  const preview =
    note.content.length > 120 ? `${note.content.slice(0, 120)}…` : note.content;

  const date = new Date(note.updatedAt).toLocaleDateString();

  return (
    <Pressable
      onPress={() => onPress(note)}
      style={({ pressed }) => [
        styles.card,
        {
          backgroundColor: colors.card,
          borderRadius: radius,
          shadowColor: colors.shadow,
          transform: [{ scale: pressed ? 0.99 : 1 }],
        },
      ]}
      android_ripple={{ color: 'rgba(0,0,0,0.06)' }}
    >
      <View style={styles.headerRow}>
        <Text style={[styles.title, { color: colors.text }]} numberOfLines={1}>
          {note.title || 'Untitled'}
        </Text>
        <View style={[styles.pill, { backgroundColor: colors.gradientStart }]}>
          <Text style={[styles.pillText, { color: colors.primary }]}>{note.category}</Text>
        </View>
      </View>

      <Text style={[styles.preview, { color: colors.subtleText }]} numberOfLines={2}>
        {preview || 'No content yet'}
      </Text>

      <Text style={[styles.date, { color: colors.subtleText }]}>{date}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 14,
    marginHorizontal: 16,
    marginVertical: 8,
    elevation: 3,
  },
  headerRow: { flexDirection: 'row', alignItems: 'center' },
  title: { flex: 1, fontSize: 16, fontWeight: '700', marginRight: 8 },
  pill: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 999 },
  pillText: { fontSize: 12, fontWeight: '700' },
  preview: { marginTop: 6, fontSize: 14, lineHeight: 20 },
  date: { marginTop: 8, fontSize: 12 },
});
