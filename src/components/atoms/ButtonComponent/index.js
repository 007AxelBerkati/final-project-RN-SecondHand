import React, { memo } from 'react';
import {
  StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import propTypes from 'prop-types';
import {
  borderRadius, colors, fonts, fontSize,
} from '../../../utils';

import IconButton from './IconButton';
import FloatingButton from './FloatingButton';

function ButtonComponent({
  type, title, onPress, icon, disable, nonButton, label, style, styleText,
}) {
  if (type === 'icon-button') {
    return (
      <IconButton
        onPress={onPress}
        nonButton={nonButton}
        label={label}
        style={style}
      />
    );
  }
  if (type === 'floating-btn') {
    return <FloatingButton icon={icon} onPress={onPress} />;
  }

  if (disable) {
    return (
      <View style={{ ...styles.disableBG, ...style }}>
        <Text style={styles.disableText}>{title}</Text>
      </View>
    );
  }

  return (
    <TouchableOpacity style={{ ...styles.container(type), ...style }} onPress={onPress}>
      <Text style={{ ...styles.text(type), ...styleText }}>{title}</Text>
      {
        icon && (
          <Icon name={icon} size={24} color={colors.background.primary} style={styles.icon} />
        )

      }
    </TouchableOpacity>
  );
}

export default memo(ButtonComponent);

const styles = StyleSheet.create({
  container: (type) => ({
    backgroundColor:
      type === 'secondary' ? colors.button.secondary.background : colors.button.primary.background,
    paddingVertical: 10,
    borderRadius: borderRadius.large,
    borderWidth: 1,
    borderColor: type === 'secondary' ? colors.button.secondary.border : colors.button.primary.border,
  }),
  disableBG: {
    paddingVertical: 10,
    borderRadius: borderRadius.large,
    backgroundColor: colors.disable.background,
  },
  disableText: {
    fontSize: fontSize.large,
    fontFamily: fonts.Poppins.Regular,
    color: colors.disable.text,
    textAlign: 'center',
  },
  text: (type) => ({
    fontSize: fontSize.large,
    fontFamily: fonts.Poppins.Regular,
    textAlign: 'center',
    color: type === 'secondary' ? colors.button.secondary.text : colors.button.primary.text,
  }),

  icon: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
});

ButtonComponent.propTypes = {
  type: propTypes.string,
  title: propTypes.string.isRequired,
  onPress: propTypes.func.isRequired,
  icon: propTypes.string,
  disable: propTypes.bool,
  nonButton: propTypes.bool,
  label: propTypes.string,
  style: propTypes.shape({}),
  styleText: propTypes.shape({}),
};

ButtonComponent.defaultProps = {
  type: 'primary',
  icon: null,
  disable: false,
  nonButton: false,
  label: null,
  style: {},
  styleText: {},
};
