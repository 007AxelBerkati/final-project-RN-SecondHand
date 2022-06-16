import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { IconButton } from 'react-native-paper';
import { colors, fonts, windowWidth } from '../../../utils';

function Headers({ onPress, title, type }) {
  if (type === 'back') {
    return (
      <View style={styles.container}>
        <IconButton icon="arrow-left" size={20} color={colors.background.black} onPress={onPress} style={styles.icon} />
        <Text style={styles.titleBack}>{title}</Text>
      </View>
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

  icon: {
    position: 'absolute',
    zIndex: 2,
  },

});
