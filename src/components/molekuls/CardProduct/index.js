import React, { memo } from 'react';
import {
  StyleSheet, TouchableOpacity, View, Text,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import propTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  borderRadius,
  colors, fonts, fontSize, windowHeight, windowWidth,
} from '../../../utils';

function CardProduct({
  onPress, source, name, jenis, harga, idJenis, icon,
}) {
  const hargaConvert = `Rp. ${parseFloat(harga).toLocaleString('id-ID')}`;
  if (source === undefined) {
    return (
      <View style={styles.cardPreview}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.jenis}>
          {jenis?.map((item) => (
            idJenis !== undefined ? (
              idJenis?.map((item1) => (
                item.id === item1
                && (`${item.name}, `)
              ))
            )
              : (`${item.name}, `)
          ))}
        </Text>
        <Text style={styles.harga}>{hargaConvert}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress} style={{ height: '65%', width: '100%' }}>
        <FastImage
          style={styles.image}
          source={{
            uri: source,
            priority: FastImage.priority.low,
          }}
          resizeMode={FastImage.resizeMode.cover}
        />
        <Text
          numberOfLines={1}
          style={styles.name}
        >
          {name}
        </Text>
        <Text style={styles.jenis} numberOfLines={1}>
          {
            jenis?.map((item) => (
              (`${item.name}, `)
            ))
          }
        </Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text numberOfLines={1} style={styles.harga}>
            {
            hargaConvert
          }
          </Text>
          {
            icon !== undefined && (<Icon name={icon} size={24} color={colors.background.black} />)
          }

        </View>

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

CardProduct.propTypes = {
  onPress: propTypes.func,
  name: propTypes.string,
  jenis: propTypes.arrayOf(propTypes.oneOfType([propTypes.object])),
  harga: propTypes.number || propTypes.string,
  idJenis: propTypes.arrayOf(propTypes.oneOfType([propTypes.number, propTypes.string])),
};
CardProduct.defaultProps = {
  idJenis: undefined,
  jenis: undefined,
  harga: undefined,
  name: undefined,
  onPress: undefined,
};
