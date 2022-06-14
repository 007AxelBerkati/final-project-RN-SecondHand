import { StyleSheet, Text, View } from 'react-native';

function Input() {
  return (
    <View style={styles.pages}>
      <Text>Input</Text>
    </View>
  );
}

export default Input;

const styles = StyleSheet.create({
  pages: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

  },
});
