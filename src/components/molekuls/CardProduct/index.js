import React, { memo } from 'react';
import {
  StyleSheet, TouchableOpacity, View, Image, Text,
} from 'react-native';
import {
  borderRadius,
  colors, fonts, fontSize, windowHeight, windowWidth,
} from '../../../utils';

function CardProduct({
  onPress, source, name, jenis, harga, idJenis,
}) {
  const hargaConvert = `Rp. ${parseFloat(harga).toLocaleString('id-ID')}`;
  if (source === undefined) {
    return (
      <View style={styles.cardPreview}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.jenis}>
          {idJenis?.map((item) => (
            (item)
          ))}
        </Text>
        <Text style={styles.harga}>{hargaConvert}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress} style={{ height: '65%', width: '100%' }}>
        <Image style={styles.image} source={source} />
        <Text
          numberOfLines={1}
          style={styles.name}
        >
          {name}
        </Text>
        <Text style={styles.jenis} numberOfLines={1}>
          {
          jenis.map((item) => (
            (`${item.name}, `)
          ))
        }
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

export default memo(CardProduct);

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    height: windowHeight * 0.30,
    width: windowWidth * 0.43,
    padding: 8,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: colors.border.primary,
    backgroundColor: colors.background.primary,
    elevation: 4,
  },
  image: {
    height: '100%',
    width: '100%',
    borderRadius: borderRadius.small,
  },

  name: {
    fontSize: fontSize.medium,
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
    fontSize: fontSize.medium,
  },
  wrapper: {
    flexDirection: 'row', justifyContent: 'space-between',
  },

  cardPreview: {
    borderRadius: borderRadius.xlarge,
    paddingHorizontal: 24,
    backgroundColor: colors.background.primary,
    elevation: 4,
    paddingVertical: 16,
  },

});
