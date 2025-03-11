import Fontisto from '@expo/vector-icons/Fontisto';
import { StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
  },
  day: {
    flex: 1,
    backgroundColor: '#eeeeee',
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

const About = () => {
  return (
    <View style={styles.container}>
      <View style={styles.day}>
        <View style={styles.info}>
          <Text style={styles.today}>{11111111}</Text>

          <Text style={styles.hour}>{22222222}</Text>
        </View>

        <View style={styles.forcast}>
          <Text style={styles.temp}>{333333}</Text>
          <Fontisto size={68} color="black" />
        </View>

        <Text style={styles.description}>{44444}</Text>
        <Text style={styles.tinyText}>{5555}</Text>
      </View>
    </View>
  );
};

export default About;
