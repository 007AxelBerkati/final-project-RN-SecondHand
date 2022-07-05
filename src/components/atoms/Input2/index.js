/* eslint-disable react/jsx-props-no-spreading */
import React, { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import { TextInput } from 'react-native-paper';
import { colors, fonts, fontSize } from '../../../utils';

function Input2({
  onChangeText,
  value,
  label,
  onBlur,
  cannotEdited,
  ...props

}) {
  return (
    <View>
      <TextInput
        onChangeText={onChangeText}
        value={value}
        label={label}
        onBlur={onBlur}
        mode="outlined"
        activeOutlineColor={colors.lineTextInput}
        outlineColor={
          cannotEdited ? colors.disable.background : colors.outlineInput
        }
        style={{ ...styles.input, ...props.style }}
        {...props}
      />
    </View>
  );
}

export default memo(Input2);

const styles = StyleSheet.create({
  input: {
    fontFamily: fonts.Poppins.Regular,
    fontSize: fontSize.medium,
    color: colors.text.primary,

  },
});
