/* eslint-disable react/jsx-props-no-spreading */
import React, { memo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { TextInput } from 'react-native-paper';
import propTypes from 'prop-types';
import {
  borderRadius, colors, fonts, fontSize,
} from '../../../utils';

function Input({
  onChangeText,
  value,
  label,
  placeholder,
  onBlur,
  cannotEdited,
  secureTextEntry,
  leftIcon,
  ...props

}) {
  const [passwordVisible, setPasswordVisible] = useState(true);
  return (
    <View style={{ borderRadius: borderRadius.xxlarge }}>
      <TextInput
        onChangeText={onChangeText}
        value={value}
        label={label}
        onBlur={onBlur}
        placeholder={placeholder}
        mode="outlined"
        activeOutlineColor={colors.lineTextInput}
        outlineColor={
          cannotEdited ? colors.disable.background : colors.outlineInput
        }
        style={styles.input}
        secureTextEntry={secureTextEntry ? passwordVisible : false}
        left={<TextInput.Icon name={leftIcon} />}
        right={
          secureTextEntry ? (
            <TextInput.Icon
              name={passwordVisible ? 'eye-off' : 'eye'}
              onPress={() => setPasswordVisible(!passwordVisible)}
              color={passwordVisible ? colors.warning : colors.background.black}
            />
          ) : null
        }
        {...props}
      />
    </View>
  );
}

export default memo(Input);

const styles = StyleSheet.create({
  input: {
    fontFamily: fonts.Poppins.Regular,
    fontSize: fontSize.medium,
    color: colors.text.primary,

  },
});

Input.propTypes = {
  onChangeText: propTypes.func.isRequired,
  value: propTypes.string.isRequired,
  label: propTypes.string.isRequired,
  onBlur: propTypes.func.isRequired,
  cannotEdited: propTypes.bool,
  secureTextEntry: propTypes.bool,
  leftIcon: propTypes.string.isRequired,
};

Input.defaultProps = {
  cannotEdited: false,
  secureTextEntry: false,
};
