import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  return (
    <>
      <StatusBar style="light" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="LogIn" />
        <Stack.Screen name="SignUp" />
        <Stack.Screen name="HomeScreen" />
      </Stack>
    </>
  );
}