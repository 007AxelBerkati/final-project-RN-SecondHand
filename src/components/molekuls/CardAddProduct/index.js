import {
  StyleSheet, Text, TouchableOpacity,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import { scale } from 'react-native-size-matters';
import propTypes from 'prop-types';
import {
  colors, fonts, fontSize, windowHeight, windowWidth,
} from '../../../utils';

function CardAddProduct({ onPress }) {
  return (
    <TouchableOpacity style={styles.parent} onPress={onPress}>
      <Icon name="plus" size={scale(20)} color={colors.text.subtitle} />
      <Text style={styles.label}>Tambah Produk</Text>
    </TouchableOpacity>
  );
}

export default CardAddProduct;

const styles = StyleSheet.create({
  parent: {
    height: windowHeight * 0.30,
    width: windowWidth * 0.43,
    borderWidth: 3,
    borderStyle: 'dashed',
    borderColor: colors.disable.background,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },

  label: {
    fontSize: fontSize.small,
    fontFamily: fonts.Poppins.Regular,
    color: colors.text.subtitle,
    marginTop: 10,
  },

});

CardAddProduct.propTypes = {
  onPress: propTypes.func.isRequired,
};
