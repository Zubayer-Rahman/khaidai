import { ClerkLoaded, ClerkProvider } from '@clerk/clerk-expo';
import { tokenCache } from '@clerk/clerk-expo/token-cache';
import { useFonts } from 'expo-font';
import { SplashScreen } from 'expo-router';
import { useCallback } from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import InitialLayout from '../components/InitialLayout';
import Colors from '../constants/Colors';

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

if(!publishableKey){
  throw new Error(
    "Missing your EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY"
  );
}

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {

 const [fontsLoaded] = useFonts({
    "Figtree-variable-font" : require('../assets/fonts/Figtree-VariableFont_wght.ttf')
  })

  const onLayoutRootView = useCallback(async () => {
    if(fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded])

  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey='pk_test_Z2VudGxlLWhhd2stOTUuY2xlcmsuYWNjb3VudHMuZGV2JA'>
      <ClerkLoaded>
        <SafeAreaProvider>
          <SafeAreaView style={{flex: 1, backgroundColor: Colors.white}} onLayout={onLayoutRootView}>
            <InitialLayout />
          </SafeAreaView>
        </SafeAreaProvider>
      </ClerkLoaded>
    </ClerkProvider>
  );
}