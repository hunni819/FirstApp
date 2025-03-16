import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Button,
  Linking,
  ActivityIndicator,
  ImageBackground,
  Image,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import Fontisto from '@expo/vector-icons/Fontisto';

import * as Location from 'expo-location';
import { useEffect, useState } from 'react';
import { locationInfo } from '../types/location';
import { WeekperWeather } from '../apis/weather';

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bg: {
    flex: 1,
  },
  main: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 80,
    backgroundColor: '#000',
    opacity: 0.8,
  },
  city: {
    flex: 1,
    paddingVertical: 20,
    backgroundColor: '#111',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.9,
  },
  cityName: {
    marginTop: 2,
    fontSize: 32,
    color: 'white',
    fontWeight: '400',
  },
  temp: {
    fontSize: 80,
    color: 'white',
    fontWeight: '200',
  },
  desc: {
    fontSize: 22,
    color: 'white',
  },
  temp_opt: {
    marginTop: 5,
    flexDirection: 'row',
    gap: 10,
  },
  temp_high: {
    fontSize: 18,
    color: 'white',
  },
  temp_low: {
    fontSize: 18,
    color: 'white',
  },
  hourly: {
    marginTop: 20,
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#111',
    opacity: 0.9,
  },
  hourly_desc: {
    fontSize: 14,
    color: 'white',
    fontWeight: '600',
  },
  hourly_flexbox: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
  },
  hourly_icon: {
    width: 40,
    height: 40,
  },
});

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
// main: {
//   flex: 1,
//   paddingHorizontal: 20,
//   paddingVertical: 100,
//   backgroundColor: '#000000',
//   opacity: 0.8,
// },
//   city: {
//     paddingVertical: 20,
//     backgroundColor: '#111111',
//     alignItems: 'center',
//     justifyContent: 'center',
//     opacity: 0.9,
//   },
//   cityName: {
//     fontSize: 14,
//     color: 'white',
//     fontWeight: '600',
//   },
//   district: {
//     marginTop: 5,
//     fontSize: 32,
//     color: 'white',
//     fontWeight: '600',
//   },
//   weather: {},
//   day: {
//     width: SCREEN_WIDTH,
//     paddingLeft: 50,
//     paddingRight: 50,
//   },
//   info: {
//     justifyContent: 'center',
//     flexDirection: 'column',
//     alignItems: 'center',
//     gap: 10,
//   },
//   today: {
//     fontSize: 24,
//     fontWeight: '600',
//   },
//   hour: {
//     fontSize: 24,
//   },
//   temp: {
//     fontSize: 128,
//     marginTop: 20,
//   },
//   description: {
//     fontSize: 24,
//     marginTop: -15,
//   },
//   tinyText: {
//     fontSize: 14,
//   },
//   forcast: {
//     marginTop: 30,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
// });

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

      const { list } = await WeekperWeather({ lat: latitude, lng: longitude });
      setLists(list);
    } catch (e) {
      if (e instanceof Error) console.error(e.message);
    }
  };

  const permissionLocation = async () => {
    let { granted } = await Location.requestForegroundPermissionsAsync();

    if (!granted) {
      setOk(false);
      throw new Error('위치 권한을 허용해주세요');
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
    <SafeAreaView style={styles.container} edges={['left', 'right']}>
      <ImageBackground
        source={require('../../assets/images/day-sunny.jpg')}
        resizeMode="cover"
        style={styles.bg}
      >
        <ScrollView style={styles.main}>
          <View style={styles.city}>
            <Text style={{ fontSize: 14, color: 'white', fontWeight: '600' }}>
              나의 위치
            </Text>
            <Text style={styles.cityName}>수원시</Text>
            <Text style={styles.temp}>13°</Text>
            <Text style={styles.desc}>체감 온도 : 13°</Text>

            <View style={styles.temp_opt}>
              <Text style={styles.temp_high}>최고 : 13°</Text>
              <Text style={styles.temp_low}>최저 : 13°</Text>
            </View>
          </View>

          <View style={styles.hourly}>
            <View
              style={{
                borderBottomWidth: 1,
                borderColor: '#2E2E2E',
                paddingVertical: 10,
              }}
            >
              <Text style={styles.hourly_desc}>
                설명설명설명설명설명설명설명설명설명설명설명설명
                설명설명설명설명설명설명설명설명설명설명설명설명
              </Text>
            </View>

            <ScrollView
              contentContainerStyle={{ flex: 1, gap: 30, marginTop: 10 }}
              showsHorizontalScrollIndicator={false}
              horizontal
            >
              {Array.from({ length: 10 }, (_, i) => i + 1).map(() => (
                <View style={styles.hourly_flexbox}>
                  <Text style={{ color: 'white' }}>오늘</Text>
                  <Image
                    style={styles.hourly_icon}
                    source={require('../../assets/images/icon.png')}
                  />
                  <Text style={{ color: 'white' }}>오늘</Text>
                </View>
              ))}
            </ScrollView>
          </View>
        </ScrollView>
      </ImageBackground>

      {/* <View>
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
        </View> */}
    </SafeAreaView>
  );
};

export default App;
