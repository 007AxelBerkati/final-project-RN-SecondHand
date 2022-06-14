import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

function JualScreen() {
  return (
    <View style={styles.pages}>
      <Text>JualScreen</Text>
    </View>
  );
}

export default JualScreen;

const styles = StyleSheet.create({
  pages: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

  },
});
