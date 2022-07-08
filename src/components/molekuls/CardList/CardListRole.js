import {
  StyleSheet, Text, View,
} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';
import propTypes from 'prop-types';
import {
  borderRadius, colors, fonts, fontSize,
} from '../../../utils';
import { ButtonComponent } from '../../atoms';

function CardListRole({
  source, onPress, kota, name,
}) {
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <FastImage source={source} style={styles.image} />
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
    </View>
  );
}

export default CardListRole;

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    paddingBottom: 16,
    padding: 16,
    elevation: 4,
    backgroundColor: colors.background.primary,
    borderRadius: borderRadius.xlarge,
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

CardListRole.propTypes = {
  source: propTypes.shape({}) || propTypes.string,
  onPress: propTypes.func,
  kota: propTypes.string,
  name: propTypes.string,
};

CardListRole.defaultProps = {
  source: undefined,
  onPress: undefined,
  kota: undefined,
  name: undefined,
};
