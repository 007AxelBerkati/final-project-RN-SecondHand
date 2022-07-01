import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { ButtonComponent } from '../../atoms';
import { colors, fonts, fontSize } from '../../../utils';

function NotLogin({ onPress }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <View style={styles.notLogin}>
        <Text style={styles.notLoginText}>
          Anda belum login
        </Text>
      </View>
      <ButtonComponent onPress={onPress} title="Login" />
    </View>
  );
}

export default NotLogin;

const styles = StyleSheet.create({
  notLogin: {
    justifyContent: 'center',
    marginVertical: 24,
    alignItems: 'center',
  },
  notLoginText: {
    fontFamily: fonts.Poppins.Medium,
    fontSize: fontSize.medium,
    color: colors.text.primary,
  },
});
