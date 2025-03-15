import { Stack } from 'expo-router/stack';
import { StatusBar } from 'expo-status-bar';
import { ErrorBoundary } from './components/errorBoundary';

const RootLayout = () => {
  return (
    <>
      <ErrorBoundary>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="+not-found" options={{ title: 'not-found' }} />
          <Stack.Screen name="(tabs)" options={{ title: 'tab' }} />
        </Stack>

        <StatusBar style="light" />
      </ErrorBoundary>
    </>
  );
};

export default RootLayout;
