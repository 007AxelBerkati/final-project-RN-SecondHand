/* eslint-disable react/jsx-props-no-spreading */
import React, { memo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { TextInput } from 'react-native-paper';
import { colors, fonts } from '../../../utils';

function Input({
  onChangeText,
  value,
  label,
  onBlur,
  cannotEdited,
  secureTextEntry,
  leftIcon,
  ...props

}) {
  const [passwordVisible, setPasswordVisible] = useState(false);
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
    fontSize: 15,
    color: colors.text.primary,
  },
});
