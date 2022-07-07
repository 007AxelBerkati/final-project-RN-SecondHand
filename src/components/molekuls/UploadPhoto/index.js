import React from 'react';
import {
  View, TouchableOpacity, StyleSheet, Text,
} from 'react-native';
import { moderateScale, scale } from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/AntDesign';
import FastImage from 'react-native-fast-image';
import propTypes from 'prop-types';
import { colors, fonts } from '../../../utils';
import { Gap } from '../../atoms';

function UploadPhoto({ label, source, onPress }) {
  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <Gap height={4} />
      {source === '' ? (
        <TouchableOpacity style={styles.parent} onPress={onPress}>
          <Icon name="plus" size={scale(20)} color={colors.disable} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.parent2} onPress={onPress}>
          <FastImage source={source} style={styles.image} />
        </TouchableOpacity>
      )}

    </View>
  );
}
const styles = StyleSheet.create({
  parent: {
    width: moderateScale(96),
    height: moderateScale(96),
    borderWidth: 3,
    borderStyle: 'dashed',
    borderColor: colors.disable.background,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: moderateScale(12),
    fontFamily: fonts.Poppins.Regular,
    color: colors.text.subtitle,
  },

  parent2: {
    width: moderateScale(96),
    height: moderateScale(96),
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border.secondary,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

export default UploadPhoto;

UploadPhoto.propTypes = {
  label: propTypes.string,
  source: propTypes.shape({ }) || propTypes.string,
  onPress: propTypes.func,
};

UploadPhoto.defaultProps = {
  label: undefined,
  source: undefined,
  onPress: undefined,
};
