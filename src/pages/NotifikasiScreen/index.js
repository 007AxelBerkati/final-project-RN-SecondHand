import { useIsFocused } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  Alert, FlatList, StyleSheet, Text, View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { IconSellNull } from '../../assets';
import {
  CardList, EmptySkeletonNotif, Headers, NotLogin,
} from '../../components';
import { getNotifikasi, getNotifikasiLoading, patchNotifikasi } from '../../redux';
import {
  colors, fonts, fontSize, showInfo, sortDate, windowHeight, windowWidth,
} from '../../utils';

function NotifikasiScreen({ navigation }) {
  const [refreshing, setRefreshing] = useState(false);
  const dataLogin = useSelector((state) => state.dataLogin);

  const dispatch = useDispatch();
  const dataNotif = useSelector((state) => state.dataNotifikasi);

  const isFocused = useIsFocused();

  useEffect(() => {
    dispatch(getNotifikasiLoading(true));
    dispatch(getNotifikasi());
  }, [isFocused, dispatch]);

  const onRefresh = () => {
    setRefreshing(true);
    dispatch(getNotifikasi());
    setRefreshing(false);
  };

  const onClick = (item) => {
    dispatch(patchNotifikasi(item?.id));

    switch (item?.status) {
      case 'accepted':
        showInfo('Penawaranmu telah diterima, silahkan tunggu konfirmasi dari penjual');
        break;
      case 'declined':
        Alert.alert('Tawar Lagi?', 'Apakah anda menawar lagi?', [
          { text: 'Tidak', style: 'cancel' },
          {
            text: 'Ya',
            onPress: () => {
              if (item?.Product !== null) {
                navigation.navigate('DetailProductScreen', { id: item?.Product?.id });
              } else {
                Alert.alert('Barang tidak ditemukan', 'Barang yang ingin anda tawarkan tidak ditemukan, mungkin telah dihapus');
              }
            },
          },
        ]);
        break;
      case 'bid':
        if (item?.Product !== null || item?.order_id !== null) {
          navigation.navigate('InfoPenawaranScreen', { id: item?.order_id });
        } else {
          Alert.alert('Produk Terhapus', 'Produk ini telah dihapus oleh penjual');
        }
        break;
      case 'create':
        Alert.alert(
          'Tambah Produk',
          'Apakah anda ingin menambah produk lain yang ingin dijual?',
          [
            { text: 'Tidak', style: 'cancel' },
            {
              text: 'Ya',
              onPress: () => {
                navigation.navigate('Jual', { screen: 'MainApp' });
              },
            },
          ],
          { cancelable: false },
        );
        break;

      default:
        break;
    }
  };

  const emptyComponent = () => (
    <View style={styles.empty}>
      <IconSellNull style={styles.image} />
      <Text style={styles.emptyText}>Notifikasi Anda Masih Kosong </Text>
    </View>
  );

  const renderItem = ({ item }) => (
    dataNotif.loading ? (
      <EmptySkeletonNotif />
    ) : (
      <CardList
        source={{ uri: item.image_url ? item.image_url : 'https://avatars.services.sap.com/images/naushad124_small.png' }}
        status={item.status}
        type="notif"
        date={item.createdAt}
        harga={item.base_price}
        hargaNego={item.bid_price}
        name={item.product_name}
        read={item.read}
        onPress={() => onClick(item)}
      />
    )
  );

  return (
    <View style={styles.pages}>
      <Headers title="Notifikasi" />
      {!dataLogin.isLoggedIn ? (
        <NotLogin onPress={() => navigation.navigate('LoginScreen')} />
      ) : (
        <FlatList
          data={dataNotif.notifikasi.sort(sortDate)}
          renderItem={renderItem}
          ListEmptyComponent={emptyComponent}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          maxToRenderPerBatch={5}
          initialNumToRender={5}
          removeClippedSubviews
          refreshing={refreshing}
          onRefresh={() => onRefresh()}
        />
      )}

    </View>
  );
}

export default NotifikasiScreen;

const styles = StyleSheet.create({
  pages: {
    flex: 1,
    margin: 16,
  },
  emptyText: {
    fontSize: fontSize.medium,
    color: colors.text.subtitle,
    fontFamily: fonts.Poppins.Regular,
  },
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 16,

  },

  image: {
    width: windowWidth * 0.8,
    height: windowHeight * 0.5,
    resizeMode: 'contain',

  },
});
