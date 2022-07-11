import {
  FlatList,
  StyleSheet, Text, View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { IconSellNull } from '../../assets';
import {
  colors, fonts, fontSize, sortDate, windowHeight, windowWidth,
} from '../../utils';
import { CardList, EmptySkeletonNotif } from '../../components';

function Terjual({ navigation, dataTerjual }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const newArray = [];
    // eslint-disable-next-line array-callback-return
    dataTerjual?.productDiminati?.map((item) => {
      if (item?.Product?.status === 'sold') {
        newArray.push(item);
      }
    });
    setData(newArray);
  }, []);

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
        title={item?.Product?.status}
        source={{ uri: item?.Product?.image_url }}
        date={item.transaction_date}
        harga={item.base_price}
        hargaNego={item.price}
        onPress={() => navigation.navigate('InfoPenawaranScreen')}
      />
    )
  );

  return (
    <View style={styles.page}>
      <FlatList
        data={data.sort(sortDate)}
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
