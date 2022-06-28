import {
  FlatList, StyleSheet, View,
} from 'react-native';
import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import {
  CardCategory, CardList, Headers,
} from '../../components';
import { keranjang } from '../../assets';

function DaftarJualScreen({ navigation }) {
  const kategori = ['Semua', 'diminati', 'terjual'];
  const dataDummy = ['ha', 'sdf'];

  const header = () => (
    <View style={styles.header}>
      <Headers title="Daftar Jual Saya" />
      <CardList type="role" name="Nama Penjual" source={keranjang} kota="palangka raya" onPress={() => navigation.goBack()} />
      <ScrollView horizontal style={{ marginVertical: 24 }}>
        {
        kategori.map((item, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <CardCategory key={index} name="search" kategori={item} onPress={() => {}} />
        ))
      }
      </ScrollView>
    </View>
  );
  return (
    <View style={styles.pages}>
      <FlatList
        ListHeaderComponent={header}
        data={dataDummy}
        // numColumns={2}
        // showsVerticalScrollIndicator={false}
        // horizontal
        renderItem={() => (
          // slicing list produk
          // <View>
          //   <CardAddProduct />
          // <CardProduct
          // name="Jam tangan Casio" jenis="Perhiasan" source={keranjang} harga="200000" />
          // </View>

          // slicing list diminati
          <CardList
            name="Jam tangan Casio"
            title="Penawaran Produk"
            source={keranjang}
            date="20 april, 14:04"
            onPress={() => navigation.goBack()}
            harga="200000"
            hargaNego="1500000"
          />
        )}
        keyExtractor={(item) => item}

      />

    </View>
  );
}

export default DaftarJualScreen;

const styles = StyleSheet.create({
  pages: {
    flex: 1,
    marginHorizontal: 16,
  },

  header: {
    marginHorizontal: 2,
    marginTop: 16,
  },

});
