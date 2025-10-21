import { FlatList, View, StyleSheet } from "react-native";
import { useNotes } from "../../hooks/NotesContext";
import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Swipeable } from "react-native-gesture-handler";
import Animated, { FadeInDown, Layout } from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";
import { Card, Title, Paragraph, Button } from "react-native-paper";

const rightActions = (deleteNote: (id: string) => void, id: string) => (
  <Button mode="contained" onPress={() => deleteNote(id)} color="#EF4444" style={styles.deleteButton}>
    Delete
  </Button>
);

const renderNote = (item: any, deleteNote: any) => (
  <Swipeable renderRightActions={() => rightActions(deleteNote, item.id)}>
    <Animated.View entering={FadeInDown.duration(600).delay(100)} layout={Layout}>
      <Link href={`/note/${item.id}`} asChild>
        <Card style={styles.card} elevation={4}>
          <Card.Content>
            <Title style={styles.title}>{item.title}</Title>
            <Paragraph style={styles.preview} numberOfLines={2}>{item.body}</Paragraph>
            <View style={styles.dateContainer}>
              <Ionicons name="time-outline" size={14} color="#9CA3AF" />
              <Paragraph style={styles.date}>
                {item.createdAt instanceof Date ? item.createdAt.toLocaleDateString("en-US", { month: "short", day: "numeric" }) : "Unknown date"}
              </Paragraph>
            </View>
          </Card.Content>
        </Card>
      </Link>
    </Animated.View>
  </Swipeable>
);

export default function NotesList() {
  const { notes, deleteNote } = useNotes();

  if (notes.length === 0) {
    return (
      <LinearGradient colors={["#0F0F23", "#1E1B4B"]} style={styles.container}>
        <View style={styles.emptyContainer}>
          <Ionicons name="documents" size={80} color="#6B7280" />
          <Title style={styles.emptyTitle}>No notes yet</Title>
          <Paragraph style={styles.emptyText}>Tap the + icon to create your first note!</Paragraph>
        </View>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient colors={["#0F0F23", "#1E1B4B"]} style={styles.container}>
      <FlatList data={notes} renderItem={({ item }) => renderNote(item, deleteNote)} keyExtractor={item => item.id} contentContainerStyle={styles.list} showsVerticalScrollIndicator={false} />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  list: { padding: 20, paddingBottom: 100 },
  card: { marginBottom: 16, backgroundColor: "rgba(255,255,255,0.05)", borderRadius: 16, borderWidth: 1, borderColor: "rgba(255,255,255,0.1)" },
  title: { color: "#FFF", fontSize: 18, fontWeight: "bold", marginBottom: 4 },
  preview: { color: "#D1D5DB", fontSize: 14, marginBottom: 8 },
  dateContainer: { flexDirection: "row", alignItems: "center" },
  date: { color: "#9CA3AF", fontSize: 12, marginLeft: 4 },
  emptyContainer: { flex: 1, alignItems: "center", justifyContent: "center", padding: 40 },
  emptyTitle: { color: "#FFF", fontSize: 24, marginTop: 16, marginBottom: 8 },
  emptyText: { color: "#9CA3AF", fontSize: 16, textAlign: "center" },
  deleteButton: { justifyContent: "center", alignItems: "center", width: 80, height: "100%" },
});
