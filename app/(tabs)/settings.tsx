import { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Switch,
  Linking,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { theme } from '../types/color';
import { useNavigation } from 'expo-router';

import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const Settings = () => {
  const navigation = useNavigation();
  const [ok, setOk] = useState<boolean>(true);
  const [isEnabled, setIsEnabled] = useState<boolean>(false);

  const sendNotification = async () => {
    await permissionAlarm();

    await Notifications.scheduleNotificationAsync({
      content: {
        title: '알림 제목',
        body: '알림 내용',
      },
      trigger: null,
    });
  };

  const permissionAlarm = async () => {
    const { granted } = await Notifications.requestPermissionsAsync();

    if (!granted) {
      setOk(false);
      throw new Error('알림 권한을 허용해주세요');
      // reAsk();
    }
  };

  const reAsk = async () => {
    if (!ok) {
      openSettings();
      return;
    }
  };

  const openSettings = () => {
    Linking.openSettings();
  };

  useEffect(() => {
    navigation.setOptions({});
    sendNotification();

    (async () => {
      if (!ok) {
        await reAsk();
      }
    })();
  }, [navigation]);

  const toggleSwitch = () => setIsEnabled((prev) => !prev);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" />
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
    </SafeAreaView>
  );
};

export default Settings;

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
