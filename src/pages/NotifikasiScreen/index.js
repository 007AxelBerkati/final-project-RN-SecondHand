import {
  StyleSheet, View, FlatList,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CardList, EmptySkeletonNotif, Headers } from '../../components';
import { getNotifikasi } from '../../redux';

function NotifikasiScreen() {
  const [refreshing, setRefreshing] = useState(false);

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
      />
    )
  );

  return (
    <View style={styles.pages}>
      <Headers title="Notifikasi" />
      <FlatList
        data={dataNotif.notifikasi}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        maxToRenderPerBatch={5}
        initialNumToRender={5}
        removeClippedSubviews
        refreshing={refreshing}
        onRefresh={() => onRefresh()}
      />
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
