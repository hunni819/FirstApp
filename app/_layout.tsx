import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

const RootLayout = () => {
  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" options={{ title: 'index' }} />
        <Stack.Screen name="about" options={{ title: 'about' }} />
        <Stack.Screen name="+not-found" options={{ title: 'Not-founded' }} />
      </Stack>
      <StatusBar style="light" />
    </>
  );
};

export default RootLayout;
