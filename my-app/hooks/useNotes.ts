import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Note {
  id: string;
  title: string;
  body: string;
  createdAt: Date;
}

export function useNotes() {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    loadNotes();
  }, []);

  // Load all notes from AsyncStorage
  const loadNotes = async () => {
    try {
      const stored = await AsyncStorage.getItem('notes');
      if (stored) {
        const parsedNotes: Note[] = JSON.parse(stored)
          .map((n: any) => ({
            ...n,
            createdAt: new Date(n.createdAt),
          }))
          .sort((a: Note, b: Note) => b.createdAt.getTime() - a.createdAt.getTime());
        setNotes(parsedNotes);
      } else {
        setNotes([]);
      }
    } catch (error) {
      console.error('Failed to load notes:', error);
    }
  };

  // Save updated notes
  const saveNotes = async (updatedNotes: Note[]) => {
    try {
      await AsyncStorage.setItem('notes', JSON.stringify(updatedNotes));
      const sorted = [...updatedNotes].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
      setNotes(sorted);
    } catch (error) {
      console.error('Failed to save notes:', error);
    }
  };

  // Add new note
  const addNote = (newNote: Omit<Note, 'id' | 'createdAt'>) => {
    const note: Note = {
      ...newNote,
      id: Date.now().toString(),
      createdAt: new Date(),
    };
    saveNotes([note, ...notes]);
  };

  // Update an existing note
  const updateNote = (id: string, updated: Partial<Note>) => {
    const updatedNotes = notes.map(n =>
      n.id === id ? { ...n, ...updated, createdAt: updated.createdAt ? new Date(updated.createdAt) : n.createdAt } : n
    );
    saveNotes(updatedNotes);
  };

  // Delete a specific note
  const deleteNote = (id: string) => {
    const filtered = notes.filter(n => n.id !== id);
    saveNotes(filtered);
  };

  // ✅ Clear all notes
  const clearAllNotes = async () => {
    try {
      await AsyncStorage.removeItem('notes');
      setNotes([]);
    } catch (error) {
      console.error('Failed to clear notes:', error);
    }
  };

  return { notes, addNote, updateNote, deleteNote, loadNotes, clearAllNotes };
}
