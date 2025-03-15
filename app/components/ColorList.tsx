import { ScrollView, StyleSheet, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  color: {
    flex: 1,
    height: 130,
    borderRadius: 25,
    borderCurve: 'continuous',
    marginTop: 20,
  },
});

const ColorList = ({ color }: { color: string }) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {[1, 0.8, 0.5].map((opacity) => (
        <View
          key={opacity}
          style={{ ...styles.color, backgroundColor: color, opacity }}
        ></View>
      ))}
    </ScrollView>
  );
};

export default ColorList;
