import {
  StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';
import React from 'react';
import moment from 'moment';
import FastImage from 'react-native-fast-image';
import propTypes from 'prop-types';
import {
  borderRadius, colors, fonts, fontSize,
} from '../../../utils';
import CardListRole from './CardListRole';
import CardListAccount from './CardListAccount';
import CardListNotif from './CardListNotif';

function CardList({
  source, name, harga, hargaNego, onPress, date, title, type, kota, status, read,
}) {
  if (type === 'role') {
    return (
      <CardListRole source={source} name={name} kota={kota} onPress={onPress} />
    );
  }

  if (type === 'account') {
    return (
      <CardListAccount title={title} name={name} onPress={onPress} />
    );
  }

  if (type === 'notif') {
    return (
      <CardListNotif
        name={name}
        onPress={onPress}
        harga={harga}
        hargaNego={hargaNego}
        date={date}
        status={status}
        source={source}
        read={read}
      />
    );
  }
  const hargaConvert = `Rp. ${parseFloat(harga).toLocaleString('id-ID')}`;
  const hargaNegoConvert = `Rp. ${parseFloat(hargaNego).toLocaleString('id-ID')}`;
  const dateConvert = moment(date).format('DD MMM, hh:mm');

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.wrapper}>
        <FastImage source={source} style={styles.image} />
        <View>
          <Text style={styles.productNego}>{title}</Text>
          <Text style={styles.text}>{name}</Text>
          <Text style={styles.text}>{hargaConvert}</Text>
          {
            hargaNego !== undefined ? (
              <Text style={styles.text}>
                Ditawar
                {' '}
                {hargaNegoConvert}
              </Text>
            ) : null
          }

        </View>
        <Text style={styles.date}>{dateConvert}</Text>
      </View>
    </TouchableOpacity>
  );
}

export default CardList;

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.primary,
  },
  wrapper: {
    flexDirection: 'row',
    backgroundColor: colors.background.primary,
    shadowColor: colors.background.grey,
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
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

});

CardList.propTypes = {
  name: propTypes.string,
  harga: propTypes.number,
  hargaNego: propTypes.number,
  onPress: propTypes.func,
  date: propTypes.string,
  title: propTypes.string,
  type: propTypes.string,
  kota: propTypes.string,
};

CardList.defaultProps = {
  hargaNego: undefined,
  kota: undefined,
  onPress: undefined,
  type: undefined,
  title: undefined,
  name: undefined,
  harga: undefined,
  date: undefined,
};
