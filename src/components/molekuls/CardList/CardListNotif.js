import propTypes from 'prop-types';
import React from 'react';
import {
  StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  borderRadius, colors, dateConvert, fonts, fontSize, formatRupiah,
} from '../../../utils';

function CardListNotif({
  source, name, harga, hargaNego, onPress, date, status, read, type2,
}) {
  const titleNotif = () => {
    switch (status) {
      case 'accepted':
        return 'Penawaranmu Telah Diterima';
      case 'create':
        return 'Berhasil di terbitkan';
      case 'bid':
        return 'Penawaran Produk';
      case 'declined':
        return 'Penawaran Ditolak';
      case 'Dibatalkan':
        return 'Penawaran Ditolak';
      default:
        return '';
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.wrapper}>
        <FastImage source={source} style={styles.image} />
        <View>
          <Text style={styles.productNego}>{titleNotif()}</Text>
          <Text style={styles.text}>{name}</Text>
          {
            status !== 'create' && type2 !== 'history' ? (
              <Text style={styles.textLineMiddle}>
                {formatRupiah(harga)}
              </Text>
            ) : (
              <Text style={styles.text}>
                {formatRupiah(harga)}
              </Text>
            )
          }
          {
            hargaNego !== undefined && hargaNego !== null ? (
              <Text style={styles.text}>
                {
                  status === ('accepted') ? 'Berhasil Ditawar' : 'Ditawar'
                }
                {' '}
                {formatRupiah(hargaNego)}
              </Text>
            ) : (
              null
            )
          }
          {
            status === ('accepted') && type2 !== 'history' && (
              <Text style={styles.textSubtitle}>
                Kamu akan segera dihubungi penjual via whatsapp
              </Text>
            )
          }
        </View>
        <Text style={styles.date}>{dateConvert(date)}</Text>
        {
          read === false && (<Icon name="ellipse" color="red" size={10} />)
        }
      </View>
    </TouchableOpacity>
  );
}

export default CardListNotif;

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.primary,
  },
  wrapper: {
    flexDirection: 'row',
  },

  image: {
    marginRight: 16,
    width: 48,
    height: 48,
    borderRadius: borderRadius.large,
    borderWidth: 1,
    borderColor: colors.border.secondary,
  },

  text: {
    marginRight: 16,
    fontSize: fontSize.medium,
    fontFamily: fonts.Poppins.Regular,
    color: colors.text.primary,
  },

  productNego: {
    fontFamily: fonts.Poppins.Regular,
    fontSize: 10,
    color: colors.text.subtitle,
  },

  date: {
    fontFamily: fonts.Poppins.Regular,
    fontSize: 10,
    color: colors.text.subtitle,
    marginLeft: 'auto',
    marginRight: 8,
  },

  textLineMiddle: {
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
    fontFamily: fonts.Poppins.Regular,
    fontSize: fontSize.medium,
    color: colors.text.primary,
  },

  textSubtitle: {
    fontFamily: fonts.Poppins.Regular,
    fontSize: fontSize.verySmall,
    color: colors.text.subtitle,
  },

});

CardListNotif.propTypes = {
  name: propTypes.string,
  harga: propTypes.number,
  hargaNego: propTypes.number,
  onPress: propTypes.func,
  date: propTypes.string,

};

CardListNotif.defaultProps = {
  hargaNego: undefined,
  onPress: undefined,
  name: undefined,
  harga: undefined,
  date: undefined,
};
