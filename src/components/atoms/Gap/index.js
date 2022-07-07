import { View } from 'react-native';
import React from 'react';
import propTypes from 'prop-types';

export default function Gap({ height, width }) {
  return <View style={{ height, width }} />;
}
Gap.propTypes = {
  height: propTypes.number,
  width: propTypes.number,
};

Gap.defaultProps = {
  height: 0,
  width: 0,
};
