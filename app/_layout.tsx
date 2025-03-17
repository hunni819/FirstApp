import { Stack } from 'expo-router/stack';

const RootLayout = () => {
  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="+not-found" options={{ title: 'not-found' }} />
        <Stack.Screen name="index" options={{ title: 'index' }} />
      </Stack>
    </>
  );
};

export default RootLayout;
