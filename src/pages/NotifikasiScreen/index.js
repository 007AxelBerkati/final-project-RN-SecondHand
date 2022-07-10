import {
  StyleSheet, View, FlatList, Text,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  CardList, EmptySkeletonNotif, Headers, NotLogin,
} from '../../components';
import { getNotifikasi, patchNotifikasi } from '../../redux';
import { IconSellNull } from '../../assets';

function NotifikasiScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const dataLogin = useSelector((state) => state.dataLogin);

  const dispatch = useDispatch();
  const dataNotif = useSelector((state) => state.dataNotifikasi);

  useEffect(() => {
    dispatch(getNotifikasi());
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    dispatch(getNotifikasi());
    setRefreshing(false);
  };

  const onClick = (id) => {
    dispatch(patchNotifikasi(id));
  };

  const emptyComponent = () => (
    <View style={styles.empty}>
      <IconSellNull style={styles.image} />
      <Text style={styles.emptyText}>Belum ada produkmu yang terjual nih, </Text>
      <Text style={styles.emptyText}>Sabar ya rejeki ngga kemana kok </Text>
    </View>
  );

  const renderItem = ({ item }) => (
    dataNotif.loading ? (
      <EmptySkeletonNotif />
    ) : (
      <CardList
        source={{ uri: item.image_url }}
        status={item.status}
        type="notif"
        date={item.createdAt}
        harga={item.base_price}
        hargaNego={item.bid_price}
        name={item.product_name}
        read={item.read}
        onPress={() => onClick(item.id)}
      />
    )
  );

  return (
    <View style={styles.pages}>
      <Headers title="Notifikasi" />
      {!dataLogin.isLoggedIn ? (
        <NotLogin />
      ) : (
        <FlatList
          data={dataNotif.notifikasi}
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
});
