import { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { TextInput, Button, Title, Paragraph, Portal, Dialog } from 'react-native-paper';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useNotes } from '../../hooks/useNotes';
import { LinearGradient } from 'expo-linear-gradient';

export default function NoteDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { notes, updateNote, deleteNote } = useNotes();
  const router = useRouter();

  const note = notes.find(n => n.id === id);

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [showUpdateDialog, setShowUpdateDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showErrorDialog, setShowErrorDialog] = useState(false);

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setBody(note.body);
    }
  }, [note]);

  const handleSave = () => {
    if (!title.trim()) {
      setShowErrorDialog(true);
      return;
    }
    updateNote(id!, { title, body });
    setShowUpdateDialog(true);
  };

  const handleDelete = () => {
    setShowDeleteDialog(true);
  };

  const confirmDelete = () => {
    deleteNote(id!);
    setShowDeleteDialog(false);
    router.back();
  };

  if (!note) {
    return (
      <View style={styles.container}>
        <Title style={styles.error}>Note not found 😔</Title>
      </View>
    );
  }

  return (
    <LinearGradient colors={['#0F0F23', '#1E1B4B']} style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* <Title style={styles.title}>{note.title}</Title> */}

        <TextInput
          value={title}
          onChangeText={setTitle}
          mode="flat"
          style={styles.titleInput}
          placeholder="Edit title..."
          placeholderTextColor="#9CA3AF"
          underlineColor="transparent"
        />

        <TextInput
          value={body}
          onChangeText={setBody}
          mode="flat"
          style={styles.bodyInput}
          placeholder="Edit body..."
          placeholderTextColor="#9CA3AF"
          multiline
          textAlignVertical="top"
          scrollEnabled={false}
        />

        <View style={styles.buttons}>
          <Button
            mode="contained"
            onPress={handleSave}
            style={styles.button}
            icon="content-save"
            contentStyle={styles.buttonContent}
          >
            Save
          </Button>
          <Button
            mode="outlined"
            onPress={handleDelete}
            style={[styles.button, styles.deleteButton]}
            icon="delete"
            contentStyle={styles.buttonContent}
            textColor="#EF4444"
          >
            Delete
          </Button>
        </View>
      </ScrollView>

      <Portal>
        {/* Error Dialog */}
        <Dialog visible={showErrorDialog} onDismiss={() => setShowErrorDialog(false)}>
          <Dialog.Title>Error</Dialog.Title>
          <Dialog.Content>
            <Paragraph>Title is required to save your note.</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setShowErrorDialog(false)}>Close</Button>
          </Dialog.Actions>
        </Dialog>

        {/* Success Dialog */}
        <Dialog visible={showUpdateDialog} onDismiss={() => setShowUpdateDialog(false)}>
          <Dialog.Title>Saved!</Dialog.Title>
          <Dialog.Content>
            <Paragraph>Your note has been updated successfully. 📝</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button
              onPress={() => {
                setShowUpdateDialog(false);
                router.back();
              }}
            >
              OK
            </Button>
          </Dialog.Actions>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <Dialog visible={showDeleteDialog} onDismiss={() => setShowDeleteDialog(false)}>
          <Dialog.Title>Delete Note</Dialog.Title>
          <Dialog.Content>
            <Paragraph>This action cannot be undone. Are you sure?</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setShowDeleteDialog(false)}>Cancel</Button>
            <Button onPress={confirmDelete} textColor="#EF4444">
              Delete
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollView: { flex: 1, padding: 20 },
  title: { fontSize: 24, color: '#FFFFFF', marginBottom: 8 },
  titleInput: { fontSize: 24, color: '#FFFFFF', marginBottom: 16, backgroundColor: 'transparent' },
  bodyInput: { flex: 1, fontSize: 16, color: '#D1D5DB', minHeight: 200, marginBottom: 24, backgroundColor: 'transparent', padding: 0 },
  buttons: { flexDirection: 'row', justifyContent: 'space-between' },
  button: { flex: 1, marginHorizontal: 4, borderRadius: 8 },
  deleteButton: { backgroundColor: 'transparent', borderColor: '#EF4444' },
  buttonContent: { paddingVertical: 6 },
  error: { color: '#FFFFFF', textAlign: 'center', marginTop: 50 },
});
