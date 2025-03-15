import { router, Tabs } from 'expo-router';

import FontAwesome from '@expo/vector-icons/FontAwesome';
import Feather from '@expo/vector-icons/Feather';
import { ErrorBoundary } from '../components/errorBoundary';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  leftArrow: {
    marginLeft: 20,
  },
});

const TabLayout = () => {
  return (
    <ErrorBoundary>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: 'blue',
        }}
      >
        <Tabs.Screen
          name="index"
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
                onPress={() => router.dismissTo('/(tabs)')}
              />
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
            headerLeft: () => (
              <FontAwesome
                style={styles.leftArrow}
                name="arrow-circle-left"
                size={24}
                color="black"
                onPress={() => router.dismissTo('/(tabs)')}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="settings"
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
                onPress={() => router.dismissTo('/(tabs)')}
              />
            ),
          }}
        />
      </Tabs>
    </ErrorBoundary>
  );
};

export default TabLayout;
