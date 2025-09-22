import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { ThemeProvider, useTheme } from './src/theme/ThemeContext';
import NotesListScreen from './src/screens/NotesListScreen';
import NoteEditorScreen from './src/screens/NoteEditorScreen';
import { NotesProvider } from './src/state/NotesContext';
import { SafeAreaProvider } from 'react-native-safe-area-context';

type TabParamList = {
  All: { category: 'All' };
  Work: { category: 'Work' };
  Personal: { category: 'Personal' };
};

type RootStackParamList = {
  HomeTabs: undefined;
  NoteEditor:
    | { mode: 'create'; category?: string }
    | { mode: 'edit'; note: { id: string; title: string; content: string; category: string; updatedAt: number } };
};

// Define bottom tabs for categories
const Tab = createBottomTabNavigator<TabParamList>();
const Stack = createNativeStackNavigator<RootStackParamList>();

function TabsNavigator() {
  const { colors } = useTheme();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: '#6B7280',
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: 'transparent',
          elevation: 10,
        },
        tabBarIcon: ({ color, size, focused }) => {
          const name =
            route.name === 'All' ? (focused ? 'book' : 'book-outline') :
            route.name === 'Work' ? (focused ? 'briefcase' : 'briefcase-outline') :
            route.name === 'Personal' ? (focused ? 'person' : 'person-outline') :
            'pricetag-outline';
          return <Ionicons name={name as keyof typeof Ionicons.glyphMap} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="All" component={NotesListScreen} initialParams={{ category: 'All' }} />
      <Tab.Screen name="Work" component={NotesListScreen} initialParams={{ category: 'Work' }} />
      <Tab.Screen name="Personal" component={NotesListScreen} initialParams={{ category: 'Personal' }} />
    </Tab.Navigator>
  );
}

export default function App() {
  // Build navigation theme from our app theme
  const navTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: '#f9fafb',
    },
  } as const;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <ThemeProvider>
          <NotesProvider>
            <NavigationContainer theme={navTheme}>
              <StatusBar style="dark" />
              <Stack.Navigator
                screenOptions={{ headerShown: false }}
              >
                <Stack.Screen name="HomeTabs" component={TabsNavigator} />
                <Stack.Screen name="NoteEditor" component={NoteEditorScreen} />
              </Stack.Navigator>
            </NavigationContainer>
          </NotesProvider>
        </ThemeProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
