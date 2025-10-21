import { View, StyleSheet, Alert, ScrollView } from 'react-native';
import { List, Switch, Card, Paragraph, Title } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { useNotes } from '../../hooks/useNotes';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';

export default function Settings() {
  const { notes, clearAllNotes } = useNotes();
  const [darkMode, setDarkMode] = useState(true);

  const clearAll = () => {
    Alert.alert(
      'Clear All Notes',
      `This will delete ${notes.length} notes. Proceed?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear',
          style: 'destructive',
          onPress: async () => {
            await clearAllNotes();
            Alert.alert('Cleared!', 'All notes deleted.');
          },
        },
      ]
    );
  };

  return (
    <LinearGradient colors={['#0F0F23', '#1E1B4B']} style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        <Title style={styles.header}>Settings</Title>

        {/* Appearance & Theme */}
        <Card style={styles.card}>
          <Card.Content>
            <List.Item
              title="Dark Mode"
              description="Switch between dark & light theme"
              left={() => <List.Icon icon="brightness-6" color="#6366F1" />}
              right={() => <Switch value={darkMode} onValueChange={setDarkMode} />}
            />
            <List.Item
              title="Export Notes"
              description="Backup to cloud"
              left={() => <List.Icon icon="cloud-download" color="#10B981" />}
              onPress={() => Alert.alert('Coming Soon', 'Export feature in development!')}
            />
          </Card.Content>
        </Card>

        {/* Data Management */}
        <Card style={styles.card}>
          <Card.Content>
            <List.Item
              title="Clear All Notes"
              description={`Delete ${notes.length} notes`}
              left={() => <List.Icon icon="delete-sweep" color="#EF4444" />}
              onPress={clearAll}
            />
          </Card.Content>
        </Card>

        {/* Footer */}
        <View style={styles.footer}>
          <Ionicons name="heart" size={20} color="#EF4444" />
          <Paragraph style={styles.footerText}>Notes App v1.0 | Made with ❤️</Paragraph>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: { fontSize: 28, color: '#FFFFFF', marginBottom: 24, fontWeight: 'bold' },
  card: {
    marginBottom: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5,
  },
  footer: {
    alignItems: 'center',
    marginTop: 40,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  footerText: {
    color: '#9CA3AF',
    marginTop: 4,
  },
});
