import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface Note {
  id: string;
  title: string;
  body: string;
  createdAt: Date;
}

interface NotesContextType {
  notes: Note[];
  addNote: (note: Omit<Note, "id" | "createdAt">) => void;
  updateNote: (id: string, updated: Partial<Note>) => void;
  deleteNote: (id: string) => void;
  loadNotes: () => void;
}

const NotesContext = createContext<NotesContextType | undefined>(undefined);

export const NotesProvider = ({ children }: { children: ReactNode }) => {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    loadNotes();
  }, []);

  const loadNotes = async () => {
    try {
      const stored = await AsyncStorage.getItem("notes");
      if (stored) {
        const parsed: Note[] = JSON.parse(stored)
          .map((n: any) => ({
            ...n,
            createdAt: new Date(n.createdAt),
          }))
          .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
        setNotes(parsed);
      }
    } catch (error) {
      console.error("Failed to load notes:", error);
    }
  };

  const saveNotes = async (updatedNotes: Note[]) => {
    try {
      await AsyncStorage.setItem("notes", JSON.stringify(updatedNotes));
    } catch (error) {
      console.error("Failed to save notes:", error);
    }
  };

  const addNote = (newNote: Omit<Note, "id" | "createdAt">) => {
    setNotes((prevNotes) => {
      const note: Note = {
        ...newNote,
        id: Date.now().toString(),
        createdAt: new Date(),
      };
      const updatedNotes = [note, ...prevNotes];
      saveNotes(updatedNotes);
      return updatedNotes;
    });
  };

  const updateNote = (id: string, updated: Partial<Note>) => {
    setNotes((prevNotes) => {
      const updatedNotes = prevNotes.map((n) =>
        n.id === id ? { ...n, ...updated } : n
      );
      saveNotes(updatedNotes);
      return updatedNotes;
    });
  };

  const deleteNote = (id: string) => {
    setNotes((prevNotes) => {
      const filtered = prevNotes.filter((n) => n.id !== id);
      saveNotes(filtered);
      return filtered;
    });
  };

  return (
    <NotesContext.Provider
      value={{ notes, addNote, updateNote, deleteNote, loadNotes }}
    >
      {children}
    </NotesContext.Provider>
  );
};

export const useNotes = () => {
  const context = useContext(NotesContext);
  if (!context) throw new Error("useNotes must be used within NotesProvider");
  return context;
};
