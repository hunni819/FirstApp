import { StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
  header: {
    flex: 1,
    backgroundColor: '#000',
  },
});

export default function Header() {
  return (
    <>
      <View style={styles.header}>
        <Text>Header Screen</Text>
      </View>
    </>
  );
}
