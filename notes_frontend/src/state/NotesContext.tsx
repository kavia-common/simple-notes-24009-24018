import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { Note } from '../components/NoteCard';
import { loadNotes, saveNotes } from '../storage/NotesRepository';

type NotesCtx = {
  notes: Note[];
  upsert: (note: Omit<Note, 'updatedAt'> & Partial<Pick<Note, 'updatedAt'>>) => void;
  remove: (id: string) => void;
};

const Ctx = createContext<NotesCtx>({
  notes: [],
  upsert: () => {},
  remove: () => {},
});

// PUBLIC_INTERFACE
export function NotesProvider({ children }: { children: React.ReactNode }) {
  /** Provides notes state with add/edit/delete and persistence */
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    (async () => {
      const initial = await loadNotes();
      setNotes(initial);
    })();
  }, []);

  useEffect(() => {
    // persist changes
    saveNotes(notes).catch(() => {});
  }, [notes]);

  const upsert = (note: Omit<Note, 'updatedAt'> & Partial<Pick<Note, 'updatedAt'>>) => {
    setNotes((prev) => {
      const idx = prev.findIndex((n) => n.id === note.id);
      const updated: Note = {
        ...note,
        updatedAt: note.updatedAt ?? Date.now(),
      } as Note;
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = updated;
        return next;
      }
      return [updated, ...prev];
    });
  };

  const remove = (id: string) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
  };

  const value = useMemo(() => ({ notes, upsert, remove }), [notes]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

// PUBLIC_INTERFACE
export function useNotes() {
  /** Accessor for notes state and actions */
  return useContext(Ctx);
}
