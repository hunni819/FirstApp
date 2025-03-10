import { StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
  footer: {
    flex: 1,
    backgroundColor: '#000',
  },
});

export default function Footer() {
  return (
    <>
      <View style={styles.footer}>
        <Text>footer Screen</Text>
      </View>
    </>
  );
}
