import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';
import {
  borderRadius, colors, fonts, fontSize, formatRupiah,
} from '../../../utils';

function CardProductMatch({
  source, name, harga, hargaNego, city,
}) {
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <FastImage
          source={source}
          style={styles.image}
        />
        <View style={styles.desc}>
          <Text style={styles.name}>{name}</Text>
          {
            city !== undefined ? (
              <Text style={styles.kota}>{city}</Text>
            ) : (
              <>
                <Text style={styles.harga}>{formatRupiah(harga)}</Text>
                <Text style={styles.hargaNego}>{formatRupiah(hargaNego)}</Text>
              </>
            )
          }
        </View>
      </View>
    </View>
  );
}

export default CardProductMatch;

const styles = StyleSheet.create({
  container: {
    borderRadius: borderRadius.xlarge,
  },

  image: {
    marginRight: 16,
    width: 48,
    height: 48,
    borderRadius: borderRadius.large,
  },

  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  desc: {
    justifyContent: 'center',
  },

  name: {
    fontSize: fontSize.medium,
    fontFamily: fonts.Poppins.Regular,
    color: colors.text.primary,
  },

  harga: {
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
    fontFamily: fonts.Poppins.Regular,
    fontSize: fontSize.medium,
    color: colors.text.primary,
  },

  hargaNego: {
    fontFamily: fonts.Poppins.Regular,
    fontSize: fontSize.medium,
    color: colors.text.primary,
  },
});
