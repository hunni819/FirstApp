import { Tabs } from 'expo-router';

import FontAwesome from '@expo/vector-icons/FontAwesome';
import Feather from '@expo/vector-icons/Feather';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  alarm: {
    marginRight: 20,
  },
});

const TabLayout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: 'blue',
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome name="home" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="about"
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome name="newspaper-o" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          tabBarIcon: ({ color }) => (
            <Feather name="settings" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
