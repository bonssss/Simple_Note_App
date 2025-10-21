import { Tabs } from 'expo-router';
import { Provider as PaperProvider } from 'react-native-paper';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { View } from 'react-native'; // Add this import for wrapping
import { MD3DarkTheme } from 'react-native-paper';
import { NotesProvider } from '@/hooks/NotesContext';

const theme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: '#6366F1',
    onPrimary: '#FFFFFF',
    surface: '#1E1B4B',
    background: '#0F0F23',
  },
};

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PaperProvider theme={theme}>
        <NotesProvider>
          <Tabs
            screenOptions={{
              tabBarActiveTintColor: '#6366F1',
              tabBarInactiveTintColor: '#6B7280',
              tabBarStyle: {
                backgroundColor: '#111827',
                borderTopWidth: 0,
                height: 90,
                paddingTop: 8,     // Balanced with bottom for vertical centering
                paddingBottom: 8,  // Balanced with top
              },
              tabBarItemStyle: {
                // Removed marginVertical to avoid offset; kept horizontal for spacing
                marginHorizontal: 10,
                marginLeft:70
              },
              tabBarIconStyle: {
                // Ensures the icon container is centered
                alignItems: 'center',
                justifyContent: 'center',
                // padding:5

              },
              headerStyle: { backgroundColor: '#111827' },
              headerTintColor: '#FFFFFF',
              headerTitleStyle: { fontWeight: 'bold', fontSize: 20 },
            }}
          >
            <Tabs.Screen
              name="(tabs)/index"
              options={{
                title: 'Notes',
                tabBarIcon: ({ color, focused }) => (
                  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Ionicons 
                      name="documents-outline" 
                      size={28} 
                      color={color}
                      style={{ marginBottom: focused ? 0 : 2 }} // Minor tweak for focus alignment
                    />
                  </View>
                ),
                headerTitle: 'My Notes',
              }}
            />
            <Tabs.Screen
              name="(tabs)/add"
              options={{
                title: 'New',
                tabBarIcon: ({ color, focused }) => (
                  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Ionicons 
                      name="add-circle-outline" 
                      size={28} 
                      color={color}
                      style={{ marginBottom: focused ? 0 : 2 }}
                    />
                  </View>
                ),
                headerTitle: 'Create Note',
              }}
            />
            <Tabs.Screen
              name="(tabs)/settings"
              options={{
                title: 'Settings',
                tabBarIcon: ({ color, focused }) => (
                  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Ionicons 
                      name="settings-outline" 
                      size={28} 
                      color={color}
                      style={{ marginBottom: focused ? 0 : 2 }}
                    />
                  </View>
                ),
              }}
            />
            <Tabs.Screen
            name ="(tabs)/profile"
            options ={{
              title: 'Profile',
              tabBarIcon: ({ color, focused }) => (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                  <Ionicons 
                    name="person-circle-outline" 
                    size={28} 
                    color={color}
                    style={{ marginBottom: focused ? 0 : 2 }}
                  />
                </View>
              ),
            }}
            />
            <Tabs.Screen
              name="note/[id]"
              options={{
                tabBarButton: () => null,
                headerTitle: 'Note Detail',
              }}
            />
          </Tabs>
        </NotesProvider>
      </PaperProvider>
    </GestureHandlerRootView>
  );
}