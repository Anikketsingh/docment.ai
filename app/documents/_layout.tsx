import { Stack } from 'expo-router';

export default function DocumentsLayout() {
  return (
    <Stack>
      <Stack.Screen 
        name="generate" 
        options={{
          title: 'Generate Document',
          headerShown: true,
        }}
      />
      <Stack.Screen 
        name="preview" 
        options={{
          title: 'Document Preview',
          headerShown: true,
        }}
      />
    </Stack>
  );
} 