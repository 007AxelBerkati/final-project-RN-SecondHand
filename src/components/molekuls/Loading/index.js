import React from 'react';
import {
  ActivityIndicator, StyleSheet, Text, View,
} from 'react-native';
import { colors, fonts, fontSize } from '../../../utils';

export default function Loading({ type }) {
  if (type === 'full') {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.wrapper}>
      <ActivityIndicator size="large" color={colors.background.secondary} />
      <Text style={styles.text}>Loading...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    position: 'absolute',
    alignItems: 'center',
    backgroundColor: colors.loadingBackground,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
  text: {
    fontFamily: fonts.Poppins.Regular,
    fontSize: fontSize.xlarge,
    color: colors.text.tertiary,
    marginTop: 12,
  },
});
