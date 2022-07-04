import {
  StyleSheet, View, Image, StatusBar,
} from 'react-native';
import React, { useEffect } from 'react';
import { Logo } from '../../assets';
import {
  colors, windowHeight, windowWidth,
} from '../../utils';

function SplashScreen({ navigation }) {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('MainApp');
    }, 3000);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="transparent" translucent />
      <Image source={Logo} style={styles.Logo} />
    </View>
  );
}

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background.secondary,
  },
  Logo: {
    width: windowWidth * 0.5,
    height: windowHeight * 0.35,
  },
});
