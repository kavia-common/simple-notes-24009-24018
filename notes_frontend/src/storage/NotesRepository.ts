import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Note } from '../components/NoteCard';

const KEY = 'NOTES_V1';

// PUBLIC_INTERFACE
export async function loadNotes(): Promise<Note[]> {
  /** Loads notes from mock AsyncStorage, or returns seed data if none exist. */
  try {
    const raw = await AsyncStorage.getItem(KEY);
    if (raw) {
      return JSON.parse(raw) as Note[];
    }
  } catch {}
  // Seed data
  const seed: Note[] = [
    {
      id: '1',
      title: 'Welcome to Ocean Notes',
      content: 'This is a sample note to get you started. Tap to edit or create a new one with the + button.',
      category: 'All',
      updatedAt: Date.now(),
    },
    {
      id: '2',
      title: 'Work plan',
      content: '• Prepare sprint goals\n• Review PRs\n• Client demo Friday',
      category: 'Work',
      updatedAt: Date.now() - 86400000,
    },
    {
      id: '3',
      title: 'Groceries',
      content: 'Milk, Eggs, Bread, Coffee',
      category: 'Personal',
      updatedAt: Date.now() - 3600_000,
    },
  ];
  await AsyncStorage.setItem(KEY, JSON.stringify(seed));
  return seed;
}

// PUBLIC_INTERFACE
export async function saveNotes(notes: Note[]): Promise<void> {
  /** Persists notes array to AsyncStorage. */
  await AsyncStorage.setItem(KEY, JSON.stringify(notes));
}
