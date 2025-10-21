import { useState } from 'react';
import { StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { TextInput, Button, Paragraph, Portal, Dialog } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { useNotes } from '../../hooks/useNotes';
import { LinearGradient } from 'expo-linear-gradient';

export default function AddNote() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const { addNote } = useNotes();
  const router = useRouter();

  const handleSave = () => {
    if (!title.trim()) {
      setShowError(true);
      return;
    }

    addNote({ title, body });
    setShowSuccess(true);
  };

  const handleSuccessClose = () => {
    setShowSuccess(false);
    router.back();
  };

  return (
    <LinearGradient colors={['#0F0F23', '#1E1B4B']} style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <Paragraph style={styles.subtitle}>Capture your thoughts</Paragraph>

        <TextInput
          label="Title"
          value={title}
          onChangeText={setTitle}
          mode="outlined"
          style={styles.input}
          outlineColor="#6366F1"
          activeOutlineColor="#6366F1"
          autoFocus
        />

        <TextInput
          label="Body"
          value={body}
          onChangeText={setBody}
          mode="outlined"
          style={[styles.input, styles.bodyInput]}
          outlineColor="#6366F1"
          activeOutlineColor="#6366F1"
          multiline
          numberOfLines={4}
          textAlignVertical="top"
        />

        <Paragraph style={styles.counter}>{body.length}/1000 characters</Paragraph>

        <Button
          mode="contained"
          onPress={handleSave}
          style={styles.saveButton}
          contentStyle={styles.saveButtonContent}
        >
          Create Note
        </Button>

        {/* Error Dialog */}
        <Portal>
          <Dialog visible={showError} onDismiss={() => setShowError(false)}>
            <Dialog.Title>Oops!</Dialog.Title>
            <Dialog.Content>
              <Paragraph>Title is required to save your note.</Paragraph>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={() => setShowError(false)}>Close</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>

        {/* Success Dialog */}
        <Portal>
          <Dialog visible={showSuccess} onDismiss={handleSuccessClose}>
            <Dialog.Title>Success!</Dialog.Title>
            <Dialog.Content>
              <Paragraph>Note added successfully. ✨</Paragraph>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={handleSuccessClose}>OK</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  keyboardView: { flex: 1, padding: 20 },
  subtitle: { color: '#D1D5DB', marginBottom: 32 },
  input: { marginBottom: 16, backgroundColor: 'rgba(255, 255, 255, 0.05)' },
  bodyInput: { height: 150 },
  counter: { color: '#9CA3AF', fontSize: 12, textAlign: 'right', marginBottom: 24 },
  saveButton: { marginTop: 16, borderRadius: 12 },
  saveButtonContent: { paddingVertical: 8 },
});
