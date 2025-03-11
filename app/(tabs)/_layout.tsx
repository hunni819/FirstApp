import { Tabs } from 'expo-router';

import FontAwesome from '@expo/vector-icons/FontAwesome';
import Feather from '@expo/vector-icons/Feather';
import { ErrorBoundary } from '../components/errorBoundary';
import { Try } from 'expo-router/build/views/Try';

const TabLayout = () => {
  return (
    <Try catch={ErrorBoundary}>
      <Tabs screenOptions={{ tabBarActiveTintColor: 'blue' }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ color }) => (
              <FontAwesome name="home" size={24} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="about"
          options={{
            title: 'About',
            tabBarIcon: ({ color }) => (
              <FontAwesome name="newspaper-o" size={24} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            title: 'Settings',
            tabBarIcon: ({ color }) => (
              <Feather name="settings" size={24} color={color} />
            ),
          }}
        />
      </Tabs>
    </Try>
  );
};

export default TabLayout;
