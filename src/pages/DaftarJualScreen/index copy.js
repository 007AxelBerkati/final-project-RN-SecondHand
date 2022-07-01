import {
  FlatList, StyleSheet, View,
  Image,
  Text,
} from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { useSelector, useDispatch } from 'react-redux';
import {
  CardCategory, CardList, CardProduct, Headers,
} from '../../components';
import { daftarJualKosong, keranjang, listDaftarJual } from '../../assets';
import { getAkun, getProductSeller } from '../../redux';
import {
  colors, fonts, fontSize, windowHeight,
} from '../../utils';

function DaftarJualScreen({ navigation }) {
  const dataDummy = ['ha', 'sdf'];
  const [active, setActive] = useState(1);
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);

  const dataDaftarJual = useSelector((state) => state.dataDaftarJual.daftarJual);
  const dataLogin = useSelector((state) => state.dataLogin);
  const dataProfile = useSelector((state) => state.dataProfile.profile);
  const getDaftarJual = (id) => {
    setActive(id);
  };

  useEffect(() => {
    dispatch(getProductSeller());
    dispatch(getAkun());
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    dispatch(getProductSeller());
    dispatch(getAkun());
    setRefreshing(false);
  }, [dispatch]);

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
      {
        !dataLogin.isLoggedIn || dataDaftarJual.length === 0 ? (
          <View style={styles.notLogin}>
            <Image source={daftarJualKosong} style={styles.image} />
            <Text style={styles.notLoginText}>Daftar Jual Anda Kosong</Text>
          </View>
        ) : (
          <>

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
          </>

        )

      }

    </View>
  );
  return (
    <View style={styles.pages}>

      <FlatList
        ListHeaderComponent={header}
        data={dataForRender()}
        onRefresh={onRefresh}
        refreshing={refreshing}
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

  notLogin: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 24,
  },

  image: {
    width: '100%',
    height: windowHeight / 3,
    resizeMode: 'contain',
    marginTop: windowHeight * 0.15,
  },

  notLoginText: {
    fontFamily: fonts.Poppins.Medium,
    fontSize: fontSize.medium,
    color: colors.text.primary,
  },

});
