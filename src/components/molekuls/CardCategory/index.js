import {
  StyleSheet, Text, TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import React from 'react';
import {
  colors, fonts, windowHeight,
} from '../../../utils';

function CardCategory({
  onPress, name, kategori,
}) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Icon name={name} size={30} color={colors.background.primary} />
      <Text style={styles.text}>{kategori}</Text>
    </TouchableOpacity>
  );
}

export default CardCategory;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    height: windowHeight * 0.07,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: colors.background.secondary,
    borderRadius: 12,
    marginHorizontal: 5,
  },

  text: {
    fontFamily: fonts.Poppins.Regular,
    color: colors.text.secondary,
  },

});
