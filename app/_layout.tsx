import { Stack } from 'expo-router/stack';

const RootLayout = () => {
  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="+not-found" options={{ title: 'not-found' }} />
        <Stack.Screen name="(tabs)" options={{ title: 'tab' }} />
      </Stack>
    </>
  );
};

export default RootLayout;
