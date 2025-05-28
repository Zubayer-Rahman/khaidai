import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';

const tabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarActiveTintColor: Colors.primary100,
        tabBarInactiveTintColor: Colors.grey2,
        tabBarStyle: {
          paddingBottom: 10,
          paddingTop: 8,
          height: 50,
        },
      }}
    >
      <Tabs.Screen
        name="HomeScreen"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Ionicons 
              name={focused ? 'home' : 'home-outline'} 
              size={25} 
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="search"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Ionicons 
              name={focused ? 'search' : 'search-outline'} 
              size={25} 
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="Create"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Ionicons 
              name="add-circle" 
              size={30} 
              color={focused ? Colors.primary80 : Colors.grey2}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="Notification"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Ionicons 
              name={focused ? 'heart' : 'heart-outline'} 
              size={25} 
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="Profile"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Ionicons 
              name={focused ? 'person-circle' : 'person-circle-outline'} 
              size={25} 
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default tabsLayout;

const styles = StyleSheet.create({});