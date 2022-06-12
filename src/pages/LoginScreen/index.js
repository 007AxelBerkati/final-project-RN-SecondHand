import { Input } from '@components';
import { StyleSheet, View } from 'react-native';
import React from 'react';

function LoginScreen() {
  return (
    <View style={styles.pages}>
      <Input />
    </View>
  );
}

export default LoginScreen;

const styles = StyleSheet.create({
  pages: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
