import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

function ProfileScreen() {
  return (
    <View style={styles.pages}>
      <Text style={styles.text1}>Lengkapi Info Akun</Text>
    </View>
  );
}

export default ProfileScreen;

const styles = StyleSheet.create({
  pages: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text1: {
    color: '#112340',
  },
});
