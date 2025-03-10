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

type cityInfoType = {
  city: string | null;
  district: string | null;
};

const cityInfo: cityInfoType = {
  city: '...Loading',
  district: '...Loading',
};

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
    fontSize: 12,
    fontWeight: '600',
  },
  district: {
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
  const [city, setCity] = useState<cityInfoType | null>(cityInfo);
  const [location, setLocation] = useState<Location.LocationObject | null>();
  const [ok, setOk] = useState<boolean>(false);

  const ask = async () => {
    await permissionLocation();

    const {
      coords: { latitude, longitude },
    } = await Location.getCurrentPositionAsync({ accuracy: 5 });

    // reverse Geocoding : 지리적 좌표로 설명된 위치를 사람이 읽을 수 있는 주소 또는 장소 이름으로 변환하는 프로세스
    const location = await Location.reverseGeocodeAsync({
      latitude,
      longitude,
    });
    setCity({ city: location[0].city, district: location[0].district });
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
            <Text style={styles.cityName}>{city?.city}</Text>
            <Text style={styles.district}>{city?.district}</Text>
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
