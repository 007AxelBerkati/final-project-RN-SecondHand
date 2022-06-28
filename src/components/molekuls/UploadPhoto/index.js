import React from 'react';
import {
  View, TouchableOpacity, StyleSheet, Text,
} from 'react-native';
import { moderateScale, scale } from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/AntDesign';
import { colors, fonts } from '../../../utils';
import { Gap } from '../../atoms';

function UploadPhoto({ label }) {
  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <Gap height={4} />
      <TouchableOpacity style={styles.parent}>
        <Icon name="plus" size={scale(20)} color={colors.disable} />
      </TouchableOpacity>
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
});

export default UploadPhoto;
