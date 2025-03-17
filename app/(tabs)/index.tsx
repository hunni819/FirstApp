import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Linking,
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
  ImageBackground,
  Image,
  Pressable,
  Modal,
  Button,
} from 'react-native';

import * as Location from 'expo-location';
import { useEffect, useState } from 'react';
import { locationInfo } from '../types/location';
import { WeekperWeather } from '../apis/weather';
import ColorList from '../components/ColorList';

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

  const [isModalVisable, setisModalVisable] = useState<boolean>(false);

  return (
    <View style={styles.container}>
      <Modal
        visible={isModalVisable}
        onRequestClose={() => setisModalVisable(false)}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <View style={{ flex: 1, padding: 60 }}>
          <Button
            title={'close'}
            onPress={() => setisModalVisable(false)}
          ></Button>
          <ColorList color="#e2e2e2" />
        </View>
      </Modal>
      <StatusBar barStyle="light-content" />
      <ImageBackground
        source={require('../../assets/images/day-sunny.jpg')}
        resizeMode="cover"
        style={styles.bg}
      >
        <SafeAreaView style={styles.safe_area}>
          <View style={styles.main}>
            <View style={styles.city}>
              <Text style={styles.position}>나의 위치</Text>
              <Text style={styles.cityName}>수원시</Text>

              <Text style={styles.desc}>13° | 체감 온도:13°</Text>

              <Text style={styles.temp}>13°</Text>
              <Text style={styles.desc}>체감 온도:13°</Text>

              <View style={styles.temp_opt}>
                <Text style={styles.temp_high}>최고:13°</Text>
                <Text style={styles.temp_low}>최저:13°</Text>
              </View>
            </View>

            <ScrollView
              contentContainerStyle={{ marginTop: 50 }}
              showsVerticalScrollIndicator={false}
            >
              <View style={styles.hourly}>
                <View style={styles.hourly_desc_wrap}>
                  <Text style={styles.hourly_desc}>
                    설명설명설명설명설명설명설명설명설명설명설명설명
                    설명설명설명설명설명설명설명설명설명설명설명설명
                  </Text>
                </View>

                <View style={{ marginLeft: -10 }}>
                  <ScrollView
                    contentContainerStyle={styles.hourly_flat_scroll}
                    showsHorizontalScrollIndicator={false}
                    horizontal
                  >
                    {Array.from({ length: 10 }, (_, i) => i + 1).map(() => (
                      <Pressable onPress={() => setisModalVisable(true)}>
                        <View style={styles.hourly_flexbox}>
                          <Text style={styles.hourly_time}>오후 10시</Text>
                          <Image
                            style={styles.hourly_icon}
                            source={require('../../assets/images/icon.png')}
                          />
                          <Text style={styles.hourly_temp}>13°</Text>
                        </View>
                      </Pressable>
                    ))}
                  </ScrollView>
                </View>
              </View>

              <View style={styles.daily}>
                <View style={styles.daily_forcast}>
                  <Image
                    style={styles.daily_forcast_icon}
                    source={require('../../assets/images/icon.png')}
                  />
                  <Text style={styles.daily_forcast_title}>
                    10일간의 일기예보
                  </Text>
                </View>

                <View>
                  {Array.from({ length: 10 }, (_, i) => i + 1).map(() => (
                    <Pressable onPress={() => setisModalVisable(true)}>
                      <View style={styles.daily_flexbox}>
                        <Text style={styles.daily_day}>요일</Text>
                        <Image
                          style={styles.daily_icon}
                          source={require('../../assets/images/icon.png')}
                        />
                        <Text style={styles.daily_low}>13°</Text>
                        <Text style={styles.daily_high}>13°</Text>
                      </View>
                    </Pressable>
                  ))}
                </View>
              </View>
            </ScrollView>
          </View>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bg: {
    flex: 1,
  },
  safe_area: {
    flex: 1,
    backgroundColor: '#000',
    opacity: 0.8,
  },
  main: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#000',
    opacity: 0.8,
  },
  city: {
    paddingVertical: 20,
    backgroundColor: '#111',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.9,
    borderRadius: 15,
    borderCurve: 'continuous',
  },
  cityName: {
    marginTop: 2,
    fontSize: 32,
    color: 'white',
    fontWeight: '400',
  },
  position: {
    fontSize: 14,
    color: 'white',
    fontWeight: '600',
  },
  temp: {
    fontSize: 80,
    color: 'white',
    fontWeight: '200',
  },
  desc: {
    fontSize: 20,
    color: 'white',
    opacity: 0.6,
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
    paddingHorizontal: 15,
    flex: 1,
    backgroundColor: '#111',
    opacity: 0.9,
    borderRadius: 15,
    borderCurve: 'continuous',
  },
  hourly_desc_wrap: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#2E2E2E',
  },
  hourly_desc: {
    fontSize: 14,
    color: 'white',
    fontWeight: '600',
  },
  hourly_flexbox: {
    paddingVertical: 10,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
  },
  hourly_flat_scroll: {
    gap: 10,
    paddingLeft: 10,
  },
  hourly_time: {
    color: 'white',
    fontWeight: '600',
  },
  hourly_icon: {
    width: 40,
    height: 40,
  },
  hourly_temp: {
    color: 'white',
    fontSize: 18,
  },
  daily: {
    marginTop: 20,
    paddingHorizontal: 15,
    flex: 1,
    backgroundColor: '#111',
    opacity: 0.9,
    borderRadius: 15,
    borderCurve: 'continuous',
  },
  daily_forcast: {
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  daily_forcast_icon: {
    width: 15,
    height: 15,
  },
  daily_forcast_title: {
    color: 'white',
    fontSize: 12,
  },
  daily_icon: {
    width: 30,
    height: 30,
  },
  daily_flexbox: {
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: '#2E2E2E',
  },
  daily_day: {
    color: 'white',
    fontSize: 18,
  },
  daily_low: {
    color: 'white',
    fontSize: 18,
    opacity: 0.6,
  },
  daily_high: {
    color: 'white',
    fontSize: 18,
  },
});
