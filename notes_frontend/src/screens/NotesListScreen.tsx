import React, { useMemo, useState } from 'react';
import { View, FlatList, RefreshControl } from 'react-native';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import NoteCard, { Note } from '../components/NoteCard';
import FAB from '../components/FAB';
import EmptyState from '../components/EmptyState';
import { useTheme } from '../theme/ThemeContext';
import { useNotes } from '../state/NotesContext';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';

type TabParamList = {
  All: { category: 'All' };
  Work: { category: 'Work' };
  Personal: { category: 'Personal' };
};

type ScreenRouteProp =
  | RouteProp<TabParamList, 'All'>
  | RouteProp<TabParamList, 'Work'>
  | RouteProp<TabParamList, 'Personal'>;

// PUBLIC_INTERFACE
export default function NotesListScreen() {
  /** Main list of notes with category tabs, search, and add button */
  const { params } = useRoute<ScreenRouteProp>();
  const category = (params?.category as string) || 'All';
  const { colors } = useTheme();
  const { notes } = useNotes();
  const nav = useNavigation();
  const [query, setQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const data = useMemo(() => {
    const filtered = category === 'All' ? notes : notes.filter((n) => n.category === category);
    if (!query.trim()) return filtered;
    const q = query.toLowerCase();
    return filtered.filter((n) => (n.title + ' ' + n.content).toLowerCase().includes(q));
  }, [notes, category, query]);

  const onAdd = () => {
    // @ts-expect-error navigation generic
    nav.navigate('NoteEditor', { mode: 'create', category });
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <Header title={`${category} Notes`} />
      <SearchBar value={query} onChangeText={setQuery} />
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingVertical: 8, paddingBottom: 120 }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => {
              setRefreshing(true);
              setTimeout(() => setRefreshing(false), 500);
            }}
            tintColor={colors.primary}
          />
        }
        ListEmptyComponent={<EmptyState />}
        renderItem={({ item }) => (
          <NoteCard
            note={item}
            onPress={(n: Note) =>
              // @ts-expect-error navigation generic
              nav.navigate('NoteEditor', { mode: 'edit', note: n })
            }
          />
        )}
      />
      <FAB onPress={onAdd} testID="add-note-fab" />
    </View>
  );
}
