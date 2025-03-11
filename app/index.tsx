import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Button,
  Linking,
  ActivityIndicator,
} from 'react-native';
import * as Location from 'expo-location';
import Header from './components/header';
import Footer from './components/footer';
import { useEffect, useState } from 'react';
// import { WeekperWeather } from './apis/weather';
import { locationInfo } from './types/location';

type cityInfoType = {
  city: string | null;
  district: string | null;
};

const cityInfo: cityInfoType = {
  city: '...Loading',
  district: '...Loading',
};

type listType = {
  dt: number;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    sea_level: number;
    grnd_level: number;
    humidity: number;
    temp_kf: number;
  };
  weather: [
    {
      id: number;
      main: string;
      description: string;
      icon: string;
    }
  ];
  clouds: {
    all: number;
  };
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  visibility: number;
  pop: number;
  rain: {
    [key: string]: number;
  };
  sys: {
    [key: string]: string;
  };
  dt_txt: string;
};

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const WEATHER_API_KEY = 'api key';

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
  tinyText: {
    fontSize: 20,
  },
});

const App = () => {
  const [city, setCity] = useState<cityInfoType | null>(cityInfo);
  const [location, setLocation] = useState(locationInfo);
  const [ok, setOk] = useState<boolean>(false);
  const [lists, setLists] = useState<listType[]>([]);

  const getWeather = async () => {
    await permissionLocation();

    const {
      coords: { latitude, longitude },
    } = await Location.getCurrentPositionAsync({ accuracy: 5 });

    setLocation({ lat: latitude, lng: longitude });

    // reverse Geocoding : 지리적 좌표로 설명된 위치를 사람이 읽을 수 있는 주소 또는 장소 이름으로 변환하는 프로세스
    const location = await Location.reverseGeocodeAsync({
      latitude,
      longitude,
    });

    setCity({ city: location[0].city, district: location[0].district });

    const request = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${WEATHER_API_KEY}&units=metric`
    );

    const response = await request.json();

    const convertKTCList = response.list.filter(
      ({ dt_txt }: { dt_txt: string }) => {
        const date = new Date(dt_txt);
        // KTC
        date.setHours(date.getHours() + 9);
        return {};
      }
    );
    setLists(convertKTCList);
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
    getWeather();
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
            {lists.length === 0 ? (
              <View style={styles.day}>
                <ActivityIndicator color="white" size="large" />
              </View>
            ) : (
              lists.map((list, index) => (
                <View key={index} style={styles.day}>
                  <Text style={styles.temp}>{list.main.temp.toFixed(1)}</Text>
                  <Text style={styles.description}>{list.weather[0].main}</Text>
                  <Text style={styles.tinyText}>
                    {list.weather[0].description}
                  </Text>
                </View>
              ))
            )}
          </ScrollView>
        </View>
        <Footer />
      </View>
    </>
  );
};

export default App;
