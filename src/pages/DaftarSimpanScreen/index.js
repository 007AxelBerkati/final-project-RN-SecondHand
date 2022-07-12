import { StyleSheet, View } from 'react-native';
import React from 'react';
import CardProduct from '../../components/molekuls/CardProduct';
import { Headers } from '../../components';

function DaftarSimpanScreen({ navigation }) {
  return (
    <View style={{ flex: 1, margin: 16 }}>
      <Headers type="back-title" onPress={() => navigation.goBack()} title="Daftar Simpan" />
      <CardProduct source="https://www.figma.com/file/LnwgSoGFdbKQesG0hoOU8j/SecondHand?node-id=25053%3A4889" harga={250000} name="Jam Tangan Casio" icon="bookmark" />
    </View>
  );
}

export default DaftarSimpanScreen;

const styles = StyleSheet.create({});
