import {
  FlatList, StyleSheet, Text, View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Headers, CardProduct, EmptySkeletonProduct } from '../../components';
import { deleteWishlistBuyer, getWishlistBuyer } from '../../redux';
import {
  colors, fonts, fontSize, sortDate, windowHeight, windowWidth,
} from '../../utils';
import { IconSellNull } from '../../assets';

function DaftarSimpanScreen({ navigation }) {
  const dispatch = useDispatch();

  const [isSubmit, setIsSubmit] = useState(false);

  const dataWishlist = useSelector((state) => state.dataWishlist);
  useEffect(() => {
    dispatch(getWishlistBuyer());
  }, [isSubmit]);

  const handleBookmark = (id) => {
    dispatch(deleteWishlistBuyer(id));
    setIsSubmit(true);
  };

  const emptyContent = () => (
    <View style={styles.empty}>
      <IconSellNull style={styles.image} />
      <Text style={styles.emptyText}>History Transaksi Anda Masih Kosong </Text>
    </View>
  );

  const renderItem = ({ item }) => (
    dataWishlist?.loading ? (
      <View style={{
        flex: 1,
        marginHorizontal: 5,
        marginBottom: 10,
        justifyContent: 'space-between',
      }}
      >
        <EmptySkeletonProduct />
      </View>
    )
      : (
        <CardProduct
          source={item?.Product?.image_url}
          harga={item?.Product?.base_price}
          name={item?.Product?.name}
          icon="bookmark"
          onPressBookmark={() => handleBookmark(item?.id)}
          onPress={() => navigation.navigate('DetailProductScreen', { id: item?.Product?.id })}
        />
      )
  );

  return (
    <View style={{ flex: 1, margin: 16 }}>
      <Headers type="back-title" onPress={() => navigation.goBack()} title="Daftar Simpan" />
      <FlatList
        data={dataWishlist?.data.sort(sortDate)}
        numColumns={2}
        maxToRenderPerBatch={5}
        initialNumToRender={5}
        removeClippedSubviews
        ListEmptyComponent={emptyContent}
        windowSize={10}
        columnWrapperStyle={{
          flex: 1,
          marginHorizontal: 5,
          marginBottom: 10,
          justifyContent: 'space-between',
        }}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />

    </View>
  );
}

export default DaftarSimpanScreen;

const styles = StyleSheet.create({
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
