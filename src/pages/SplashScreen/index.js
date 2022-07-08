import {
  StyleSheet, View, Image, StatusBar, Text,
} from 'react-native';
import React, { useEffect } from 'react';
import { IconLogo } from '../../assets';
import {
  colors, fonts, fontSize, windowHeight, windowWidth,
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
      <Image source={IconLogo} style={styles.Logo} />
      <Text style={styles.nickname}>Kelompok 3 RN-3</Text>
    </View>
  );
}

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background.primary,
  },
  Logo: {
    width: windowWidth * 0.35,
    height: windowHeight * 0.20,
  },

  nickname: {
    fontSize: fontSize.medium,
    color: colors.text.tertiary,
    fontFamily: fonts.Poppins.Medium,
    position: 'absolute',
    bottom: 19,
  },
});
