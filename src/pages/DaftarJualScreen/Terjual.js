import React from 'react';
import {
  FlatList,
  StyleSheet, Text, View,
} from 'react-native';
import { IconSellNull } from '../../assets';
import { CardList, EmptySkeletonNotif } from '../../components';
import {
  colors, fonts, fontSize, sortDate, windowHeight, windowWidth,
} from '../../utils';

function Terjual({ navigation, dataTerjual }) {
  const emptyComponent = () => (
    <View style={styles.empty}>
      <IconSellNull style={styles.image} />
      <Text style={styles.emptyText}>Belum ada produkmu yang terjual nih, </Text>
      <Text style={styles.emptyText}>Sabar ya rejeki ngga kemana kok </Text>
    </View>
  );

  const renderItem = ({ item }) => (
    dataTerjual.loading ? (
      <EmptySkeletonNotif />
    ) : (
      <CardList
        key={item.id}
        name={item.product_name}
        title="Berhasil Terjual"
        source={{ uri: item?.Product?.image_url }}
        date={item.transaction_date}
        harga={item.base_price}
        hargaNego={item.price}
        onPress={() => navigation.navigate('InfoPenawaranScreen', { id: item.id })}
      />
    )
  );

  return (
    <View style={styles.page}>
      <FlatList
        data={dataTerjual?.productTerjual?.sort(sortDate)}
        ListEmptyComponent={emptyComponent}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
  );
}

export default Terjual;

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
