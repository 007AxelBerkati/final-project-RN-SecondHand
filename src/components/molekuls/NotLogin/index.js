import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import propTypes from 'prop-types';
import { ButtonComponent } from '../../atoms';
import {
  colors, fonts, fontSize, windowHeight, windowWidth,
} from '../../../utils';
import { IconNotLogin } from '../../../assets';

function NotLogin({ onPress }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <View style={styles.notLogin}>
        <IconNotLogin style={styles.image} />
        <Text style={styles.notLoginText}>
          Anda belum login, Silahkan login terlebih dahulu
        </Text>
      </View>
      <ButtonComponent onPress={onPress} title="Login" style={styles.button} />
    </View>
  );
}

export default NotLogin;

const styles = StyleSheet.create({
  notLogin: {
    justifyContent: 'center',
    marginVertical: 24,
    alignItems: 'center',
  },
  notLoginText: {
    fontFamily: fonts.Poppins.Medium,
    fontSize: fontSize.medium,
    color: colors.text.subtitle,
    textAlign: 'center',
  },

  image: {
    width: windowWidth * 0.8,
    height: windowHeight * 0.5,
    resizeMode: 'contain',
  },

  button: {
    position: 'absolute',
    bottom: 15,
    left: 0,
    right: 0,

  },
});

NotLogin.propTypes = {
  onPress: propTypes.func.isRequired,
};
