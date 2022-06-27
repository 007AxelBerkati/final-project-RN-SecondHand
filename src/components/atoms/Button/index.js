import {
  StyleSheet, Text, View, TouchableOpacity,
} from 'react-native';
import React, { memo } from 'react';
import { borderRadius, colors, fonts } from '../../../utils';

function Button({ title, onPress }) {
  return (
    <TouchableOpacity style={styles.Wrapper} onPress={onPress}>
      <View>
        <Text style={styles.text}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
}

export default memo(Button);

const styles = StyleSheet.create({
  Wrapper: {
    borderRadius: borderRadius.small,
    marginVertical: 7,
    paddingVertical: 5,
    backgroundColor: colors.button.primary.background,
    width: 330,
    height: 50,
    alignSelf: 'center',
  },
  text: {
    color: colors.text.secondary,
    fontFamily: fonts.Poppins.SemiBold,
    margin: 4,
    paddingVertical: 3,
    textAlign: 'center',
  },
});
