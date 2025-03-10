import { ScrollView, StyleSheet, Text, View, Dimensions } from 'react-native';
import Header from './components/header';
import Footer from './components/footer';

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

export default function Index() {
  return (
    <>
      <View style={styles.container}>
        <Header />
        <View style={styles.main}>
          <View style={styles.city}>
            <Text style={styles.cityName}>City</Text>
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
}
