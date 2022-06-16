import {
  Image, StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';
import React from 'react';
import { colors, fonts } from '../../../utils';
import CardListRole from './CardListRole';
import CardListAccount from './CardListAccount';

function CardList({
  source, name, harga, hargaNego, onPress, date, title, type, kota,
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

  const hargaConvert = `Rp. ${parseFloat(harga).toLocaleString('id-ID')}`;
  const hargaNegoConvert = `Rp. ${parseFloat(hargaNego).toLocaleString('id-ID')}`;

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.wrapper}>
        <Image source={source} style={styles.image} />
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
        <Text style={styles.date}>{date}</Text>
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
    borderBottomColor: colors.border,
  },
  wrapper: {
    flexDirection: 'row',
  },

  image: {
    marginRight: 16,
    width: 48,
    height: 48,
    borderRadius: 12,
  },

  text: {
    marginRight: 16,
    fontSize: 14,
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