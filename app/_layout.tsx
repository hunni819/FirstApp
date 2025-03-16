import { Stack } from 'expo-router/stack';
import { StatusBar } from 'expo-status-bar';

const RootLayout = () => {
  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="+not-found" options={{ title: 'not-found' }} />
        <Stack.Screen name="(tabs)" options={{ title: 'tab' }} />
      </Stack>

      <StatusBar style="dark" />
    </>
  );
};

export default RootLayout;
