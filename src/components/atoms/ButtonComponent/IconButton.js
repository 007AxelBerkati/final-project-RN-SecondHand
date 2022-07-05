import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import React from 'react';
import propTypes from 'prop-types';
import { borderRadius, colors } from '../../../utils';

function Icons({ label }) {
  if (label === 'BackButton') return <Icon name="arrow-back" size={24} color={colors.background.black} />;
  return <Icon name="fingerprint" size={25} color={colors.background.secondary} />;
}
function IconButton({
  onPress, nonButton, label, style,
}) {
  return (
    <View>
      {nonButton ? (
        <View style={styles.iconNonButton}>
          <View style={styles.icon}>
            <Icons label={label} />
          </View>
        </View>
      ) : (
        <TouchableOpacity style={{ ...styles.iconWrapper, ...style }} onPress={onPress}>
          <View style={styles.icon}>
            <Icons label={label} />
          </View>
        </TouchableOpacity>
      )}
    </View>

  );
}

export default IconButton;

const styles = StyleSheet.create({
  iconWrapper: {
    width: 24,
    height: 24,
    borderRadius: 24 / 2,
    justifyContent: 'center',
    backgroundColor: colors.background.primary,
    elevation: 6,
  },
  icon: {
    alignSelf: 'center',
    borderRadius: borderRadius.medium,
  },
  iconNonButton: {
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    backgroundColor: colors.background.icon,
    opacity: 0.8,
    justifyContent: 'center',
  },

});

IconButton.propTypes = {
  onPress: propTypes.func.isRequired,
  nonButton: propTypes.bool,
  label: propTypes.string.isRequired,
  style: propTypes.shape({}),
};

IconButton.defaultProps = {
  nonButton: false,
  style: {},
};
