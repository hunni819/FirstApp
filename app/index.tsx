import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Button,
  Linking,
} from 'react-native';
import * as Location from 'expo-location';
import Header from './components/header';
import Footer from './components/footer';
import { useEffect, useState } from 'react';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
  },
  main: {
    flex: 6,
  },
  city: {
    flex: 1.2,
    backgroundColor: '#dddddd',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cityName: {
    fontSize: 30,
    fontWeight: '600',
  },
  weather: {
    backgroundColor: '#dddddd',
  },
  day: {
    width: SCREEN_WIDTH,
    alignItems: 'center',
  },
  temp: {
    fontSize: 168,
    marginTop: 20,
  },
  description: {
    fontSize: 60,
    marginTop: -30,
  },
});

const App = () => {
  const [location, setLocation] = useState<Location.LocationObject>();
  const [ok, setOk] = useState<boolean>(false);

  const ask = async () => {
    await permissionLocation();

    let location = await Location.getCurrentPositionAsync({ accuracy: 5 });
    console.log(location);
    setLocation(location);
  };

  const permissionLocation = async () => {
    let { granted } = await Location.requestForegroundPermissionsAsync();

    if (!granted) {
      setOk(false);
      return;
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
    ask();
  }, []);

  return (
    <>
      <View style={styles.container}>
        <Header />
        <View style={styles.main}>
          <View style={styles.city}>
            <Text style={styles.cityName}>City</Text>
            <Button title={'앱에서 권한 변경'} onPress={reAsk} />
          </View>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            horizontal
            contentContainerStyle={styles.weather}
          >
            <View style={styles.day}>
              <Text style={styles.temp}>27</Text>
              <Text style={styles.description}>Sunny</Text>
            </View>
            <View style={styles.day}>
              <Text style={styles.temp}>27</Text>
              <Text style={styles.description}>Sunny</Text>
            </View>
            <View style={styles.day}>
              <Text style={styles.temp}>27</Text>
              <Text style={styles.description}>Sunny</Text>
            </View>
            <View style={styles.day}>
              <Text style={styles.temp}>27</Text>
              <Text style={styles.description}>Sunny</Text>
            </View>
          </ScrollView>
        </View>
        <Footer />
      </View>
    </>
  );
};

export default App;
