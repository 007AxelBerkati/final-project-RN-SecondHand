import {
  Image,
  StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';
import React from 'react';
import {
  borderRadius, colors, fonts, fontSize,
} from '../../../utils';
import { ButtonComponent } from '../../atoms';

function CardListRole({
  source, onPress, kota, name,
}) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.wrapper}>
        <Image source={source} style={styles.image} />
        <View style={styles.desc}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.kota}>{kota}</Text>
        </View>
        {
            onPress !== undefined ? (
              <ButtonComponent type="secondary" title="Edit" style={styles.buttonContainer} styleText={styles.buttonTitle} onPress={onPress} />
            ) : null
        }
      </View>
    </TouchableOpacity>
  );
}

export default CardListRole;

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    paddingBottom: 16,
    padding: 16,
  },
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  image: {
    marginRight: 16,
    width: 48,
    height: 48,
    borderRadius: borderRadius.large,
  },

  name: {
    fontSize: fontSize.medium,
    fontFamily: fonts.Poppins.Regular,
    color: colors.text.primary,
  },

  kota: {
    fontFamily: fonts.Poppins.Regular,
    fontSize: 10,
    color: colors.text.subtitle,
  },

  desc: {
    justifyContent: 'center',
  },

  buttonContainer: {
    paddingHorizontal: 12,
    marginLeft: 'auto',
    justifyContent: 'center',
    paddingVertical: 4,
  },

  buttonTitle: { fontSize: fontSize.small },

});
