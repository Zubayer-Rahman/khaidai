import { Stack } from 'expo-router';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Colors from '../constants/Colors';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{flex: 1, backgroundColor: Colors.white}}>
        <Stack screenOptions={{ headerShown: false }}/>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}