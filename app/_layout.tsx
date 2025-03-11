import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ErrorBoundary } from './components/errorBoundary';
import { Try } from 'expo-router/build/views/Try';

const RootLayout = () => {
  return (
    <>
      <Try catch={ErrorBoundary}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="+not-found" options={{ title: 'not-found' }} />
          <Stack.Screen name="(tabs)" options={{ title: 'tab' }} />
        </Stack>
        <StatusBar style="light" />
      </Try>
      ;
    </>
  );
};

export default RootLayout;
