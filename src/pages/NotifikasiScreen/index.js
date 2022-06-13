import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

function NotifikasiScreen() {
  return (
    <View style={styles.pages}>
      <Text>NotifikasiScreen</Text>
    </View>
  );
}

export default NotifikasiScreen;

const styles = StyleSheet.create({
  pages: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

  },
});
