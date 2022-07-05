import React, { memo } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import propTypes from 'prop-types';
import { fonts } from '../../../utils';

function LinkComponent({
  title, size, align, onPress, color, disable, style,
}) {
  return (
    <TouchableOpacity onPress={onPress} style={style} disabled={disable}>
      <Text style={styles.text(size, align, color)}>{title}</Text>
    </TouchableOpacity>
  );
}

export default memo(LinkComponent);

const styles = StyleSheet.create({
  text: (size, align, color) => ({
    fontFamily: fonts.Poppins.Bold,
    fontSize: size,
    color,
    textAlign: align,
  }),

});

LinkComponent.propTypes = {
  title: propTypes.string.isRequired,
  size: propTypes.number.isRequired,
  align: propTypes.string.isRequired,
  onPress: propTypes.func.isRequired,
  color: propTypes.string.isRequired,
  disable: propTypes.bool.isRequired,
  style: propTypes.shape({}),
};

LinkComponent.defaultProps = {
  style: {},
};
