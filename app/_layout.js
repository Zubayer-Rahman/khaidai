import { ClerkLoaded, ClerkProvider } from '@clerk/clerk-expo';
import { tokenCache } from '@clerk/clerk-expo/token-cache';
import { Stack } from 'expo-router';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Colors from '../constants/Colors';

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

if(!publishableKey){
  throw new Error(
    "Missing your EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY"
  );
}

export default function RootLayout() {
  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey='pk_test_Z2VudGxlLWhhd2stOTUuY2xlcmsuYWNjb3VudHMuZGV2JA'>
      <ClerkLoaded>
        <SafeAreaProvider>
          <SafeAreaView style={{flex: 1, backgroundColor: Colors.white}}>
            <Stack screenOptions={{ headerShown: false, gestureEnabled: false }}/>
          </SafeAreaView>
        </SafeAreaProvider>
      </ClerkLoaded>
    </ClerkProvider>
  );
}