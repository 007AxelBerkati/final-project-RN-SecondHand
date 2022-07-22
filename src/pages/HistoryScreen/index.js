import React, { useEffect } from 'react';
import {
  FlatList, StyleSheet, Text, View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { IconSellNull } from '../../assets';
import {
  CardList, EmptySkeletonNotif, Headers,
} from '../../components';
import { getDataHistory } from '../../redux';
import {
  colors, fonts, fontSize, sortDate, windowHeight, windowWidth,
} from '../../utils';

function HistoryScreen({ navigation }) {
  const dataHistory = useSelector((state) => state.dataHistory);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDataHistory());
  }, []);

  const emptyComponent = () => (
    <View style={styles.empty}>
      <IconSellNull style={styles.image} />
      <Text style={styles.emptyText}>History Transaksi anda masih kosong </Text>
    </View>
  );

  const renderItem = ({ item }) => (
    dataHistory?.isLoading ? (
      <EmptySkeletonNotif />
    ) : (
      <CardList
        source={{ uri: item.image_url ? item.image_url : 'https://avatars.services.sap.com/images/naushad124_small.png' }}
        status={item.status}
        type="notif"
        date={item.transaction_date}
        harga={item.price}
        name={item.product_name}
        type2="history"
      />
    )
  );

  return (
    <View style={styles.pages}>
      <Headers title="History Transaksi" type="back-title" onPress={() => navigation.goBack()} />
      <FlatList
        data={dataHistory?.history.sort(sortDate)}
        renderItem={renderItem}
        ListEmptyComponent={emptyComponent}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        maxToRenderPerBatch={5}
        initialNumToRender={5}
        removeClippedSubviews
      />

    </View>
  );
}

export default HistoryScreen;

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
