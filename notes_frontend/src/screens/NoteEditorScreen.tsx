import React, { useEffect, useState } from 'react';
import { View, TextInput, StyleSheet, Pressable, Text, Alert } from 'react-native';
import Header from '../components/Header';
import { useTheme } from '../theme/ThemeContext';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { useNotes } from '../state/NotesContext';
import type { Note } from '../components/NoteCard';
import { Ionicons } from '@expo/vector-icons';

type RootStackParamList = {
  HomeTabs: undefined;
  NoteEditor:
    | { mode: 'create'; category?: string }
    | { mode: 'edit'; note: Note };
};

type EditorRoute = RouteProp<RootStackParamList, 'NoteEditor'>;

// PUBLIC_INTERFACE
export default function NoteEditorScreen() {
  /** Editor screen for viewing/creating/updating a note */
  const { colors } = useTheme();
  const nav = useNavigation();
  const { params } = useRoute<EditorRoute>();
  const { upsert, remove } = useNotes();

  const isEdit = params?.mode === 'edit';
  const existing = (isEdit ? (params as { mode: 'edit'; note: Note }).note : undefined) as
    | Note
    | undefined;

  const [title, setTitle] = useState(existing?.title ?? '');
  const [content, setContent] = useState(existing?.content ?? '');
  const [category, setCategory] = useState(
    existing?.category ?? (params as { mode: 'create'; category?: string })?.category ?? 'All'
  );

  useEffect(() => {
    // Prefill on route change if needed
    if (existing) {
      setTitle(existing.title);
      setContent(existing.content);
      setCategory(existing.category);
    }
  }, [existing?.id]);

  const onSave = () => {
    const id = existing?.id ?? Math.random().toString(36).slice(2);
    upsert({ id, title: title.trim(), content, category });
    // @ts-expect-error navigation generic
    nav.goBack();
  };

  const onDelete = () => {
    if (!existing) return;
    Alert.alert('Delete note', 'Are you sure you want to delete this note?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => {
          remove(existing.id);
          // @ts-expect-error navigation generic
          nav.goBack();
        },
      },
    ]);
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <Header
        title={isEdit ? 'Edit Note' : 'New Note'}
        showBack
        // @ts-expect-error navigation generic
        onBack={() => nav.goBack()}
        rightIcon="checkmark"
        onRightPress={onSave}
      />

      <View style={styles.form}>
        <View style={[styles.inputWrap, { backgroundColor: colors.surface, shadowColor: colors.shadow }]}>
          <TextInput
            value={title}
            onChangeText={setTitle}
            placeholder="Title"
            placeholderTextColor={colors.subtleText}
            style={[styles.titleInput, { color: colors.text }]}
          />
        </View>

        <View style={[styles.inputWrap, { backgroundColor: colors.surface, shadowColor: colors.shadow }]}>
          <TextInput
            value={content}
            onChangeText={setContent}
            placeholder="Write your note..."
            placeholderTextColor={colors.subtleText}
            style={[styles.contentInput, { color: colors.text }]}
            multiline
            textAlignVertical="top"
          />
        </View>

        <View style={styles.categoryRow}>
          {['All', 'Work', 'Personal'].map((c) => {
            const active = c === category;
            return (
              <Pressable
                key={c}
                onPress={() => setCategory(c)}
                style={[
                  styles.categoryPill,
                  {
                    backgroundColor: active ? colors.primary : colors.gradientStart,
                  },
                ]}
              >
                <Text style={{ color: active ? '#fff' : colors.primary, fontWeight: '700' }}>
                  {c}
                </Text>
              </Pressable>
            );
          })}
        </View>

        {isEdit ? (
          <Pressable onPress={onDelete} style={[styles.deleteBtn, { borderColor: colors.error }]}>
            <Ionicons name="trash-outline" size={18} color={colors.error} />
            <Text style={[styles.deleteText, { color: colors.error }]}>Delete</Text>
          </Pressable>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  form: { padding: 16, gap: 12 },
  inputWrap: {
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    elevation: 2,
  },
  titleInput: { fontSize: 18, fontWeight: '700' },
  contentInput: { fontSize: 16, minHeight: 220, lineHeight: 22 },
  categoryRow: { flexDirection: 'row', gap: 10, marginTop: 6 },
  categoryPill: { paddingHorizontal: 12, paddingVertical: 10, borderRadius: 999 },
  deleteBtn: {
    marginTop: 16,
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    justifyContent: 'center',
  },
  deleteText: { fontSize: 14, fontWeight: '700' },
});
