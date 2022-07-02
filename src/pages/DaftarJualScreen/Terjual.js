import {
  Image, StyleSheet, Text, View,
} from 'react-native';
import React from 'react';
import { daftarJualKosong } from '../../assets';
import {
  colors, fonts, fontSize, windowHeight, windowWidth,
} from '../../utils';
import { CardList } from '../../components';

function Terjual({ navigation, dataHistory }) {
  return (
    <View style={styles.page}>
      {
      dataHistory?.length === 0 ? (
        <View style={styles.empty}>
          <Image source={daftarJualKosong} style={styles.image} />
          <Text style={styles.emptyText}>Belum ada produkmu yang terjual nih, </Text>
          <Text style={styles.emptyText}>Sabar ya rejeki ngga kemana kok </Text>
        </View>
      ) : (
        <View>
          {
        dataHistory?.map((item) => (
          <CardList
            key={item.id}
            name={item.product_name}
            title={item.category}
            source={{ uri: item.image_url }}
            date={item.transaction_date}
            harga={item.price}
            onPress={() => navigation.navigate('InfoPenawaranScreen')}
          />
        ))

      }
        </View>
      )

    }

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
