import React from 'react';
import {
  StyleSheet, TouchableOpacity, View, Image, Text,
} from 'react-native';
import {
  colors, fonts, windowHeight, windowWidth,
} from '../../../utils';

function CardProduct({
  onPress, source, name, jenis, harga,
}) {
  const hargaConvert = `Rp. ${parseFloat(harga).toLocaleString('id-ID')}`;
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress} style={{ height: '65%', width: '100%' }}>
        <Image style={styles.image} source={source} />
        <Text numberOfLines={1} style={styles.name}>
          {name}
        </Text>
        <Text numberOfLines={1} style={styles.jenis}>
          {jenis}
        </Text>
        <Text numberOfLines={1} style={styles.harga}>
          {
            hargaConvert
          }
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export default CardProduct;

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    overflow: 'hidden',
    height: windowHeight * 0.30,
    width: windowWidth * 0.43,
    padding: 8,
    marginRight: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: colors.border.primary,
    backgroundColor: colors.background.primary,
    elevation: 4,
  },
  image: {
    height: '100%',
    width: '100%',
    borderRadius: 4,
  },

  name: {
    fontSize: 14,
    color: colors.text.primary,
    fontFamily: fonts.Poppins.Regular,
  },

  jenis: {
    fontFamily: fonts.Poppins.Regular,
    fontSize: 10,
    color: colors.text.subtitle,
  },

  harga: {
    fontFamily: fonts.Poppins.Regular,
    color: colors.text.primary,
    fontSize: 14,
  },
  wrapper: {
    flexDirection: 'row', justifyContent: 'space-between',
  },

});
