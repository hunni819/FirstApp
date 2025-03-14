import Fontisto from '@expo/vector-icons/Fontisto';
import { useNavigation } from 'expo-router';
import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ColorList from '../components/ColorList';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
  },
});

const About = () => {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({});
  }, [navigation]);

  return (
    <View style={styles.container}>
      <ColorList color="#eeff00" />
    </View>
  );
};

export default About;
