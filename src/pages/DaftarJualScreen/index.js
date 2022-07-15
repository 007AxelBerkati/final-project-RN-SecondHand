import React, { useEffect, useState } from 'react';
import {
  RefreshControl, StyleSheet, View,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import { useDispatch, useSelector } from 'react-redux';
import { listDaftarJual } from '../../assets';
import {
  CardCategory, CardList, Headers, NotLogin,
} from '../../components';
import {
  getAkun, getOrderSeller, getProductSeller,
} from '../../redux';
import {
  colors, fonts, fontSize, windowHeight,
} from '../../utils';
import Favorite from './Favorite';
import Produk from './Produk';
import Terjual from './Terjual';

function DaftarJualScreen({ navigation }) {
  const [active, setActive] = useState(1);
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);

  const dataDaftarJual = useSelector((state) => state.dataDaftarJual);
  const dataLogin = useSelector((state) => state.dataLogin);
  const dataProfile = useSelector((state) => state.dataProfile.profile);

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
  }, [dispatch]);

  const onRefresh = async (id) => {
    setRefreshing(true);
    getDaftarJual(id);
    setRefreshing(false);
  };

  const dataForRender = () => {
    switch (active) {
      case 1:
        return (
          <Produk
            dataDaftarJual={dataDaftarJual}
            navigation={navigation}
          />
        );
      case 2:
        return (
          <Favorite
            productDiminati={dataDaftarJual}
            navigation={navigation}
          />
        );
      case 3:
        return <Terjual dataTerjual={dataDaftarJual} navigation={navigation} />;
      default:
        return null;
    }
  };

  return (
    <LinearGradient
      colors={[
        colors.background.tertiary,
        colors.background.primary]}
      style={styles.linearGradient}
    >
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
                <CardList
                  type="role"
                  name={dataProfile.full_name}
                  source={dataProfile.image_url !== null
                    ? { uri: dataProfile.image_url } : { uri: 'https://avatars.services.sap.com/images/naushad124_small.png' }}
                  kota={dataProfile.city}
                  onPress={() => navigation.navigate('ProfileScreen')}
                />
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
    </LinearGradient>
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

  linearGradient: {
    flex: 1,
  },

});
