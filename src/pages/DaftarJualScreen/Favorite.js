import {
  FlatList,
  StyleSheet, Text, View,
} from 'react-native';
import React from 'react';
import { CardList, EmptySkeletonNotif } from '../../components';
import { IconSellNull } from '../../assets';
import {
  colors, fonts, fontSize, sortDate, windowHeight, windowWidth,
} from '../../utils';

function Favorite({ navigation, productDiminati }) {
  const emptyComponent = () => (
    <View style={styles.empty}>
      <IconSellNull style={styles.image} />
      <Text style={styles.emptyText}>Belum ada produkmu yang diminati nih, </Text>
      <Text style={styles.emptyText}>Sabar ya rejeki ngga kemana kok </Text>
    </View>
  );

  const renderItem = ({ item }) => (
    productDiminati.loading ? (
      <EmptySkeletonNotif />
    )
      : (
        <CardList
          key={item?.id}
          name={item?.Product?.name}
          title="Penawaran Produk"
          source={{ uri: item?.Product?.image_url }}
          date={item?.createdAt}
          harga={item?.Product?.base_price}
          hargaNego={item?.price}
          onPress={() => navigation.navigate('InfoPenawaranScreen', { id: item.id })}
        />
      )

  );

  return (
    <View>
      <FlatList
        data={productDiminati?.productDiminati?.sort(sortDate)}
        ListEmptyComponent={emptyComponent}
        keyExtractor={(item) => item?.id}
        renderItem={renderItem}
      />

    </View>
  );
}

export default Favorite;

const styles = StyleSheet.create({
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 16,

  },
  image: {
    width: windowWidth * 0.5,
    height: windowHeight * 0.3,
    resizeMode: 'contain',

  },
  emptyText: {
    fontSize: fontSize.medium,
    color: colors.text.subtitle,
    fontFamily: fonts.Poppins.Regular,
  },

});
