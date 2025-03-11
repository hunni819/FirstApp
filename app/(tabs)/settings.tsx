import { StyleSheet, View, Text } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  main: {
    flex: 1,
    backgroundColor: '#dddddd',
    padding: 20,
  },
  list: {
    flex: 1,
    flexDirection: 'column',
    gap: 20,
  },
  menu: {
    backgroundColor: '#eeeeee',
    padding: 15,
  },
  name: {
    fontSize: 24,
  },
});

const Settings = () => {
  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <View style={styles.list}>
          <View style={styles.menu}>
            <Text style={styles.name}>메뉴</Text>
          </View>
          <View style={styles.menu}>
            <Text style={styles.name}>메뉴</Text>
          </View>
          <View style={styles.menu}>
            <Text style={styles.name}>메뉴</Text>
          </View>
          <View style={styles.menu}>
            <Text style={styles.name}>메뉴</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Settings;
