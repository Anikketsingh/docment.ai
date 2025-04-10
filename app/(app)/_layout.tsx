import { Stack } from 'expo-router';

export default function AppLayout() {
  return (
    <Stack>
      <Stack.Screen name="home" options={{ headerShown: false }} />
      <Stack.Screen name="document-generation" options={{ headerShown: false }} />
      <Stack.Screen name="p2p-transaction" options={{ headerShown: false }} />
      <Stack.Screen name="profile" options={{ headerShown: false }} />
      <Stack.Screen name="document-vault" options={{ headerShown: false }} />
    </Stack>
  );
} 