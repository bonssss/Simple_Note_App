import * as SQLite from 'expo-sqlite';

export const db = (SQLite as any).openDatabase('notes.db');

export interface NoteDB {
  id: string;
  title: string;
  body?: string;
  createdAt: string;
}

export const initDB = () => {
  db.transaction(tx => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS notes (
        id TEXT PRIMARY KEY NOT NULL,
        title TEXT NOT NULL,
        body TEXT,
        createdAt TEXT NOT NULL
      );`,
      [],
      () => console.log('Database initialized'),
      (_, error) => {
        console.log('DB init error:', error);
        return false;
      }
    );
  });
};

export const getNotesDB = (): Promise<NoteDB[]> =>
  new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM notes ORDER BY createdAt DESC;',
        [],
        (_, result) => resolve(result.rows._array),
        (_, error) => { console.log(error); reject(error); return false; }
      );
    });
  });

export const addNoteDB = (note: NoteDB) => {
  db.transaction(tx => {
    tx.executeSql(
      'INSERT INTO notes (id, title, body, createdAt) VALUES (?, ?, ?, ?);',
      [note.id, note.title, note.body || '', note.createdAt],
      () => console.log('Note added'),
      (_, error) => { console.log('Add note error:', error); return false; }
    );
  });
};

export const updateNoteDB = (id: string, title: string, body?: string) => {
  db.transaction(tx => {
    tx.executeSql(
      'UPDATE notes SET title = ?, body = ? WHERE id = ?;',
      [title, body || '', id],
      () => console.log('Note updated'),
      (_, error) => { console.log('Update note error:', error); return false; }
    );
  });
};

export const deleteNoteDB = (id: string) => {
  db.transaction(tx => {
    tx.executeSql(
      'DELETE FROM notes WHERE id = ?;',
      [id],
      () => console.log('Note deleted'),
      (_, error) => { console.log('Delete note error:', error); return false; }
    );
  });
};
