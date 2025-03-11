import { Link } from 'expo-router';
import { StyleSheet, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  link: {
    fontSize: 30,
  },
});

const Settings = () => {
  return (
    <View style={styles.container}>
      <Link style={styles.link} href="/">
        설정
      </Link>
    </View>
  );
};

export default Settings;
