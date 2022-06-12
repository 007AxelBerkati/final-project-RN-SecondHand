import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

function RegisterScreen() {
  return (
    <View style={styles.pages}>
      <Text>RegisterScreen</Text>
    </View>
  );
}

export default RegisterScreen;

const styles = StyleSheet.create({
  pages: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

  },
});
