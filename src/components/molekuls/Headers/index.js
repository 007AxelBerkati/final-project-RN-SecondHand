import {
  StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { colors, fonts, windowWidth } from '../../../utils';

function Headers({ onPress, title, type }) {
  if (type === 'back-title') {
    return (
      <TouchableOpacity style={styles.container} onPress={onPress}>
        <Icon name="arrow-left" size={24} color={colors.background.black} />
        <Text style={styles.titleBack}>{title}</Text>
      </TouchableOpacity>
    );
  }

  if (type === 'back') {
    return (
      <TouchableOpacity style={styles.container} onPress={onPress}>
        <Icon name="arrow-left" size={24} color={colors.background.black} />
      </TouchableOpacity>
    );
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

export default Headers;

const styles = StyleSheet.create({
  title: {
    fontFamily: fonts.Poppins.Bold,
    fontSize: 20,
    color: colors.text.primary,

  },

  container: {
    flexDirection: 'row',
    width: windowWidth,
    height: 50,
    alignItems: 'center',
  },

  titleBack: {
    fontFamily: fonts.Poppins.Bold,
    fontSize: 14,
    color: colors.text.primary,
    textAlign: 'center',
    flex: 1,
    marginRight: 16,
    zIndex: 1,
  },

});
