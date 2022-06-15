import {
  StyleSheet, Text, View, TouchableOpacity,
} from 'react-native';
import React from 'react';
import { colors, fonts } from '../../../utils';

function Button(title, onPress) {
  return (
    <TouchableOpacity style={styles.Wrapper} onPress={onPress}>
      <View>
        <Text style={styles.text}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
}

export default Button;

const styles = StyleSheet.create({
  Wrapper: {
    borderRadius: 5,
    marginVertical: 30,
    backgroundColor: colors.button.primary.background,
    width: 150,
    height: 40,
  },
  text: {
    color: colors.text.primary,
    fontFamily: fonts.Poppins.Regular,
    margin: 4,
    paddingVertical: 3,
    textAlign: 'center',
  },
});
