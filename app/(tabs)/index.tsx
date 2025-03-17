import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Linking,
  SafeAreaView,
  StatusBar,
  ImageBackground,
  Image,
  Pressable,
  Modal,
  Button,
  PanResponder,
  Animated,
} from 'react-native';

import { useRef, useState } from 'react';
import ColorList from '../components/ColorList';

const App = () => {
  const [isModalVisable, setisModalVisable] = useState<boolean>(false);

  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }]),
      onPanResponderRelease: () => {
        Animated.timing(pan, {
          toValue: { x: 0, y: 0 },
          duration: 1000,
          useNativeDriver: false,
        }).start();
      },
    })
  ).current;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
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

      <ImageBackground
        source={require('../../assets/images/day-sunny.jpg')}
        resizeMode="cover"
        style={styles.bg}
      >
        <SafeAreaView style={styles.safe_area}>
          <Animated.View
            style={{
              ...styles.main,
              transform: [{ translateX: pan.x }, { translateY: pan.y }],
            }}
            {...panResponder.panHandlers}
          >
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
              contentContainerStyle={{ marginTop: 20 }}
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
          </Animated.View>
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
  },
  city: {
    paddingVertical: 20,
    backgroundColor: '#111',
    alignItems: 'center',
    justifyContent: 'center',
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
