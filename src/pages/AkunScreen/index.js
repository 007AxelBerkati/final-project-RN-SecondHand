import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

function AkunScreen() {
  return (
    <View style={styles.pages}>
      <Text>AkunScreen</Text>
    </View>
  );
}

export default AkunScreen;

const styles = StyleSheet.create({
  pages: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

  },
});
