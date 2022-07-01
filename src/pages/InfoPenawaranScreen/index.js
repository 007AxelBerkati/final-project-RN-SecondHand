import {
  StyleSheet, Text, View,
} from 'react-native';
import React from 'react';
import { Headers, CardList, ButtonComponent } from '../../components';
import {
  fonts, colors, borderRadius, fontSize,
} from '../../utils';
import { keranjang } from '../../assets';

function InfoPenawaranScreen({ navigation }) {
  return (
    <View style={{ margin: 16, flex: 1 }}>
      <Headers type="back-title" onPress={() => navigation.goBack()} title="Info Penawar" />
      <View>
        <CardList
          type="role"
          source={keranjang}
          style={styles.bgProduk}
          name="Gama"
          kota="Bengkulu"
        />
      </View>

      <Text style={styles.Detail}>Daftar Produkmu yang Ditawar</Text>

      <CardList source={keranjang} title="penawaran produk" date="29 Juni 2022" name="Jam tangan Casio" harga="250000" hargaNego="200000" />

      <View style={styles.btnWrapper}>
        <ButtonComponent style={styles.btnPreview} type="secondary" title="Tolak" />
        <ButtonComponent style={styles.btnTerbitkan} title="Terima" />
      </View>
    </View>
  );
}

export default InfoPenawaranScreen;

const styles = StyleSheet.create({
  Info: {
    fontFamily: fonts.Poppins.Bold,
  },
  Detail: {
    fontFamily: fonts.Poppins.Bold,
    color: colors.background.black,
    marginTop: 24,
    fontSize: fontSize.medium,
  },
  btnWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },

  btnPreview: {
    width: '48%',
    borderRadius: borderRadius.xlarge,
  },
  btnTerbitkan: { width: '48%' },
});
