import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

function HomeScreen() {
  return (
    <View style={styles.pages}>
      <Text>HomeScreen</Text>
    </View>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  pages: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

  },
});
