import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { ProfilesProvider } from '@/contexts/ProfilesContext';
import { ThemeProvider } from '@/contexts/ThemeContext';

export default function RootLayout() {
  return (
    <ThemeProvider>
      <ProfilesProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="add" options={{ presentation: 'modal' }} />
          <Stack.Screen name="profile/[login]" />
        </Stack>
        <StatusBar style="dark" />
      </ProfilesProvider>
    </ThemeProvider>
  );
}
