import { Link } from 'expo-router';
import { StyleSheet, Text, View, Button, Vibration } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 48,
  },
  button: {
    fontSize: 20,
  },
  link: {
    fontSize: 30,
    color: '#FFFFFF',
  },
});

const PATTERN = 1000; // ms

export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Home Screen</Text>
      <Link style={styles.link} href="/about">
        상세보기
      </Link>

      <Button
        title="Click Me"
        onPress={() => Vibration.vibrate(PATTERN, true)}
      />
    </View>
  );
}
