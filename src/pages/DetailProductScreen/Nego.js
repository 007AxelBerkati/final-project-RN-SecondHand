import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import {
  colors, fonts, windowHeight, windowWidth,
} from '../../utils';
import { CardProduct, Gap } from '../../components';

function Nego() {
  return (
    <View style={styles.contentContainer}>
      <Text style={{ color: colors.text.primary, fontFamily: fonts.Poppins.SemiBold }}>
        Masukan Harga Tawarmu
      </Text>
      <Gap height={windowHeight * 0.02} />
      <Text style={{ color: colors.border, fontFamily: fonts.Poppins.Regular }}>
        Harga tawaranmu akan diketahui penjual, jika penjual cocok kamu
        akan segera dihubungi penjual.
      </Text>
      <Gap height={windowHeight * 0.02} />
      <CardProduct />
    </View>
  );
}

export default Nego;

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    marginHorizontal: windowWidth * 0.09,
    marginVertical: windowHeight * 0.03,

  },
});
