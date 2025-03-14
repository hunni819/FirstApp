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
import Fontisto from '@expo/vector-icons/Fontisto';

import * as Location from 'expo-location';
import Header from '../components/header';
import Footer from '../components/footer';
import { useEffect, useState } from 'react';
import { locationInfo } from '../types/location';

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
    },
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
    paddingLeft: 50,
    paddingRight: 50,
  },
  info: {
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 10,
  },
  today: {
    fontSize: 24,
    fontWeight: '600',
  },
  hour: {
    fontSize: 24,
  },
  temp: {
    fontSize: 128,
    marginTop: 20,
  },
  description: {
    fontSize: 24,
    marginTop: -15,
  },
  tinyText: {
    fontSize: 14,
  },
  forcast: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

type IconType<G extends string> = {
  [key: string]: G;
};

type G = 'cloudy' | 'day-sunny' | 'rain' | 'snow';

const icons: IconType<G> = {
  Clouds: 'cloudy',
  Clear: 'day-sunny',
  Rain: 'rain',
  Snow: 'snow',
};

const App = () => {
  const [city, setCity] = useState<cityInfoType | null>(cityInfo);
  const [location, setLocation] = useState(locationInfo);
  const [ok, setOk] = useState<boolean>(true);
  const [lists, setLists] = useState<listType[]>([]);

  const getWeather = async () => {
    try {
      await permissionLocation();

      const {
        coords: { latitude, longitude },
      } = await Location.getCurrentPositionAsync({ accuracy: 6 });

      if (!latitude && !longitude)
        throw new Error('위치 정보를 불러오지 못했어요');

      setLocation({ lat: latitude, lng: longitude });

      // reverse Geocoding : 지리적 좌표로 설명된 위치를 사람이 읽을 수 있는 주소 또는 장소 이름으로 변환하는 프로세스
      const location = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });

      if (!location) throw new Error('상세 위치 정보를 불러오지 못했어요');

      setCity({ city: location[0].city, district: location[0].district });

      const request = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${WEATHER_API_KEY}&units=metric`
      );

      if (request.status === 200) {
        const response = await request.json();

        if (!response) throw new Error('parse에 실패했어요');

        const convertKTCList = response.list.map((ls: listType) => {
          const date = new Date(ls.dt_txt);
          date.setHours(date.getHours() + 9);

          const targetDate = date.toISOString().split('.')[0];

          const hour = targetDate.split('T')[1];
          const today = targetDate.split('T')[0];

          return { ...ls, dt_txt: `${today} ${hour}` };
        });
        setLists(convertKTCList);
        return;
      }
    } catch (e) {
      if (e instanceof Error) console.error(e.message);
    }
  };

  const permissionLocation = async () => {
    let { granted } = await Location.requestForegroundPermissionsAsync();

    if (!granted) {
      setOk(false);
      throw new Error('위치 권한을 허용해주세요');
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
    getWeather();

    (async () => {
      if (ok) {
        await reAsk();
      }
    })();
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
                  <View style={styles.info}>
                    <Text style={styles.today}>
                      {list.dt_txt.split(' ')[0]}
                    </Text>

                    <Text style={styles.hour}>
                      {list.dt_txt.split(' ')[1].slice(0, 5)}
                    </Text>
                  </View>

                  <View style={styles.forcast}>
                    <Text style={styles.temp}>
                      {Math.round(list.main.temp)}
                    </Text>
                    <Fontisto
                      name={icons[list.weather[0].main]}
                      size={68}
                      color="black"
                    />
                  </View>

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
