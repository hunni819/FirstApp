import { useState } from 'react';
import { StyleSheet, View, Text, Switch } from 'react-native';
import { theme } from '../types/color';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  main: {
    flex: 1,
    backgroundColor: '#000000',
    padding: 20,
  },
  list: {
    flex: 1,
    flexDirection: 'column',
    gap: 20,
  },
  title: {
    marginLeft: 20,
    color: theme.titleColor,
  },
  menu: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
    backgroundColor: theme.menuBg,
    borderRadius: 20,
    paddingHorizontal: 25,
    paddingVertical: 10,
  },
  name: {
    fontSize: 18,
    color: '#ffffff',
  },
});

const Settings = () => {
  const [isEnabled, setIsEnabled] = useState<boolean>(false);

  const toggleSwitch = () => setIsEnabled((prev) => !prev);

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <View style={styles.list}>
          <View>
            <Text style={styles.title}>날씨 접근 허용</Text>
            <View style={styles.menu}>
              <Text style={styles.name}>메뉴</Text>
              <Switch
                trackColor={{ false: '#767577', true: '#81b0ff' }}
                thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isEnabled}
              />
            </View>
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
