import {
  StyleSheet, View, Text, Image,
} from 'react-native';
import React from 'react';
import { Headers } from '../../components';
import {
  fonts, fontSize, windowHeight, windowWidth,
} from '../../utils';
import { ILNullPhoto } from '../../assets';

function NotifikasiScreen() {
  return (
    <View style={styles.pages}>
      <Headers title="Notifikasi" />
      <View style={styles.kotak}>
        <Image style={styles.gambar} source={ILNullPhoto} />
        <View style={styles.huruf}>
          <Text>Penawaran Produk</Text>
          <Text>20 Apr, 14:04</Text>
        </View>
        <Text style={styles.text1}>
          Jam Tangan Casio
        </Text>
        <Text style={styles.text1}>
          Rp 250.000
        </Text>
        <Text style={styles.text1}>
          Ditawar Rp 200.000
        </Text>
      </View>
      <View style={styles.kotak2}>
        <Image style={styles.gambar} source={ILNullPhoto} />
        <View style={styles.huruf}>
          <Text>Berhasil di terbtikan</Text>
          <Text>19 Apr, 12:00</Text>
        </View>
        <Text style={styles.text1}>
          Jam Tangan Casio
        </Text>
        <Text style={styles.text1}>
          Rp 250.000
        </Text>
      </View>
    </View>
  );
}

export default NotifikasiScreen;

const styles = StyleSheet.create({
  pages: {
    flex: 1,
    margin: 16,
  },
  huruf: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginLeft: windowWidth * 0.17,
    marginTop: windowHeight * -0.08,
  },
  text1: {
    fontSize: fontSize.medium,
    fontFamily: fonts.Poppins.Bold,
    marginLeft: windowWidth * 0.17,
  },
  gambar: {
    width: 60,
    height: 60,
    borderRadius: 12,
  },
  kotak: {
    marginTop: windowHeight * 0.04,
    borderBottomWidth: 1,
  },
  kotak2: {
    marginTop: windowHeight * 0.03,
  },
});
