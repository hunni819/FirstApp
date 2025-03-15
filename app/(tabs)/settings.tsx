import { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Switch } from 'react-native';
import { theme } from '../types/color';
import { useNavigation } from 'expo-router';

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
  const navigation = useNavigation();
  const [isEnabled, setIsEnabled] = useState<boolean>(false);

  useEffect(() => {
    navigation.setOptions({});
  }, [navigation]);

  const toggleSwitch = () => setIsEnabled((prev) => !prev);

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <View style={styles.list}>
          <View>
            <Text style={styles.title}>알림 허용</Text>
            <View style={styles.menu}>
              <Text style={styles.name}>알림</Text>
              <Switch
                trackColor={{ false: '#767577', true: '#81b0ff' }}
                thumbColor={'#ffffff'}
                ios_backgroundColor="#fefefe"
                onValueChange={toggleSwitch}
                value={isEnabled}
              />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Settings;
