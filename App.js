import 'expo-router/entry';
import { Text, View } from 'react-native';
import { useFonts } from './components/FontLoader';

export default function App() {
  const fontsLoaded = useFonts();

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading fonts...</Text>
      </View>
    );
  }

  return null; 
}