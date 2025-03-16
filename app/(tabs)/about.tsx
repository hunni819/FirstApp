import Fontisto from '@expo/vector-icons/Fontisto';
import { useNavigation } from 'expo-router';
import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ColorList from '../components/ColorList';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 100,
  },
});

const About = () => {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({});
  }, [navigation]);

  return (
    <View style={styles.container}>
      <ColorList color="#000000" />
    </View>
  );
};

export default About;
