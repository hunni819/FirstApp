import { router } from 'expo-router';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import FontAwesome from '@expo/vector-icons/FontAwesome';
import Feather from '@expo/vector-icons/Feather';
import { ErrorBoundary } from '../components/errorBoundary';
import { StyleSheet } from 'react-native';
import App from '.';
import About from './about';
import Settings from './settings';

const styles = StyleSheet.create({
  leftArrow: {
    marginLeft: 20,
  },
});

const TabLayout = () => {
  const Tab = createBottomTabNavigator();

  return (
    <ErrorBoundary>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: 'blue',
        }}
      >
        <Tab.Screen
          name="index"
          component={App}
          options={{
            title: 'Home',
            tabBarIcon: ({ color }) => (
              <FontAwesome name="home" size={24} color={color} />
            ),
            headerLeft: () => (
              <FontAwesome
                style={styles.leftArrow}
                name="arrow-circle-left"
                size={24}
                color="black"
                onPress={() => router.dismissAll()}
              />
            ),
          }}
        />
        <Tab.Screen
          name="about"
          component={About}
          options={{
            title: 'About',
            tabBarIcon: ({ color }) => (
              <FontAwesome name="newspaper-o" size={24} color={color} />
            ),
            headerLeft: () => (
              <FontAwesome
                style={styles.leftArrow}
                name="arrow-circle-left"
                size={24}
                color="black"
                onPress={() => router.dismissAll()}
              />
            ),
          }}
        />
        <Tab.Screen
          name="settings"
          component={Settings}
          options={{
            title: '설정',
            tabBarIcon: ({ color }) => (
              <Feather name="settings" size={24} color={color} />
            ),
            headerLeft: () => (
              <FontAwesome
                style={styles.leftArrow}
                name="arrow-circle-left"
                size={24}
                color="black"
                onPress={() => router.dismissAll()}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </ErrorBoundary>
  );
};

export default TabLayout;
