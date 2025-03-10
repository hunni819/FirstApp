import { Link } from 'expo-router';
import { StyleSheet, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});

export default function NotFoundScreen() {
  return (
    <>
      <View style={styles.container}></View>
      <Link href="/">홈으로</Link>
    </>
  );
}
