import {
  StyleSheet, View,
  RefreshControl,
} from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { useSelector, useDispatch } from 'react-redux';
import {
  CardCategory, CardList, Headers, NotLogin,
} from '../../components';
import { listDaftarJual } from '../../assets';
import {
  getAkun, getOrderSeller, getProductSeller,
} from '../../redux';
import {
  colors, fonts, fontSize, windowHeight,
} from '../../utils';
import Produk from './Produk';
import Favorite from './Favorite';
import Terjual from './Terjual';

function DaftarJualScreen({ navigation }) {
  const [active, setActive] = useState(1);
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);

  const dataDaftarJual = useSelector((state) => state.dataDaftarJual.daftarJual);
  const dataLogin = useSelector((state) => state.dataLogin);
  const dataProfile = useSelector((state) => state.dataProfile.profile);
  const dataOrder = useSelector((state) => state.dataDaftarJual.productDiminati);

  const getDaftarJual = (id) => {
    setActive(id);
    switch (id) {
      case 1:
        dispatch(getProductSeller());
        break;
      case 2:
        dispatch(getOrderSeller());
        break;
      case 3:
        dispatch(getOrderSeller());
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    dispatch(getAkun());
    dispatch(getProductSeller());
  }, []);

  const onRefresh = useCallback(async (id) => {
    setRefreshing(true);
    getDaftarJual(id);
    setRefreshing(false);
  }, []);

  const dataForRender = () => {
    switch (active) {
      case 1:
        return <Produk dataDaftarJual={dataDaftarJual} navigation={navigation} />;
      case 2:
        return <Favorite productDiminati={dataOrder} navigation={navigation} />;
      case 3:
        return <Terjual dataTerjual={dataOrder} navigation={navigation} />;
      default:
        return null;
    }
  };

  return (
    <View style={styles.pages}>
      <Headers title="Daftar Jual Saya" />
      {
        !dataLogin.isLoggedIn ? (
          <NotLogin onPress={() => navigation.navigate('LoginScreen')} />
        ) : (
          <ScrollView
            showsVerticalScrollIndicator={false}
            refreshControl={(
              <RefreshControl
                refreshing={refreshing}
                onRefresh={() => onRefresh(active)}
              />
            )}
          >
            <View style={{ marginHorizontal: 3 }}>
              <CardList type="role" name={dataProfile.full_name} source={{ uri: dataProfile.image_url }} kota={dataProfile.city} onPress={() => navigation.navigate('ProfileScreen')} />
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={{ marginVertical: 24 }}
              >
                {
                  listDaftarJual.data.map((item) => (
                    <View key={item.id}>
                      <CardCategory
                        active={active === item.id}
                        name={item.name}
                        kategori={item.category}
                        onPress={() => getDaftarJual(item.id)}
                      />
                    </View>
                  ))
                }
              </ScrollView>
              {dataForRender()}
            </View>
          </ScrollView>
        )
      }

    </View>
  );
}

export default DaftarJualScreen;

const styles = StyleSheet.create({
  pages: {
    flex: 1,
    margin: 16,
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
