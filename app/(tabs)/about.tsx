import Fontisto from '@expo/vector-icons/Fontisto';
import { useNavigation } from 'expo-router';
import { useEffect } from 'react';
import { SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';
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
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        <ColorList color="#000000" />
      </View>
    </SafeAreaView>
  );
};

export default About;
