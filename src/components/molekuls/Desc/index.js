import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import propTypes from 'prop-types';
import { colors, fonts, fontSize } from '../../../utils';

function Desc({ label, desc }) {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.txtTitle}>{label}</Text>
      <Text style={styles.des}>{desc}</Text>
    </View>
  );
}

export default Desc;

const styles = StyleSheet.create({
  wrapper: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 16,
    backgroundColor: colors.background.primary,
    marginHorizontal: 16,
    marginBottom: 30,
    elevation: 5,
  },

  txtTitle: {
    fontFamily: fonts.Poppins.Regular,
    fontSize: fontSize.Regular,
    color: 'black',
  },
  des: {
    fontFamily: fonts.Poppins.Regular,
    fontSize: fontSize.Regular,
  },
});

Desc.propTypes = {
  label: propTypes.string,
  desc: propTypes.string,
};

Desc.defaultProps = {
  label: undefined,
  desc: undefined,
};
