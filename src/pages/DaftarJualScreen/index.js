import {
  FlatList, StyleSheet, View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { useSelector, useDispatch } from 'react-redux';
import {
  CardCategory, CardList, CardProduct, Headers,
} from '../../components';
import { keranjang, listDaftarJual } from '../../assets';
import { getAkun, getProductSeller } from '../../redux';

function DaftarJualScreen({ navigation }) {
  const dataDummy = ['ha', 'sdf'];
  const [active, setActive] = useState(1);
  const dispatch = useDispatch();

  const dataDaftarJual = useSelector((state) => state.dataDaftarJual.daftarJual);

  const dataProfile = useSelector((state) => state.dataProfile.profile);
  const getDaftarJual = (id) => {
    setActive(id);
  };

  useEffect(() => {
    dispatch(getProductSeller());
    dispatch(getAkun());
  }, []);

  const dataForRender = () => {
    switch (active) {
      case 1:
        return dataDaftarJual;
      case 2:
        return dataDummy;
      default:
        return null;
    }
  };

  const header = () => (
    <View style={styles.header}>
      <Headers title="Daftar Jual Saya" />
      <CardList type="role" name={dataProfile.full_name} source={{ uri: dataProfile.image_url }} kota={dataProfile.city} onPress={() => navigation.goBack()} />
      <ScrollView horizontal style={{ marginVertical: 24 }}>
        {
        listDaftarJual.data.map((item) => (
          <CardCategory
            key={item.id}
            active={active === item.id}
            name={item.name}
            kategori={item.category}
            onPress={() => getDaftarJual(item.id)}
          />
        ))
      }
      </ScrollView>
    </View>
  );
  return (
    <View style={styles.pages}>

      <FlatList
        ListHeaderComponent={header}
        data={dataForRender()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => {
          switch (active) {
            case 1:
              return (
                <View>
                  <CardProduct
                    name={item.name}
                    jenis={item.Categories}
                    source={{ uri: item.image_url }}
                    harga={item.base_price}
                  />
                </View>
              );
            case 2:
              return (
                <CardList
                  name="Jam tangan Casio"
                  title="Penawaran Produk"
                  source={keranjang}
                  date="20 april, 14:04"
                  onPress={() => navigation.goBack()}
                  harga="200000"
                  hargaNego="1500000"
                />
              );
            default:
              return null;
          }
        }}
        keyExtractor={(item) => item.id}
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
