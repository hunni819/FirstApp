import { Link } from 'expo-router';
import { StyleSheet, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#25292e',
  },
  link: {
    fontSize: 30,
  },
});

export default function about() {
  return (
    <View style={styles.container}>
      <Link style={styles.link} href="/">
        홈으로 가기
      </Link>
    </View>
  );
}
