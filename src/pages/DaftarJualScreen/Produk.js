import {
  ScrollView, StyleSheet, View,
} from 'react-native';
import React from 'react';
import { CardAddProduct, CardProduct, Gap } from '../../components';
import { windowHeight } from '../../utils';

function Produk({ dataDaftarJual }) {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.wrapperProduk}>
        {
       dataDaftarJual.length < 5 && (
         <CardAddProduct />
       )
         }
        {
        dataDaftarJual.map((item) => (
          <View style={{ marginBottom: 16 }}>
            <CardProduct
              key={item.id}
              name={item.name}
              jenis={item.Categories}
              source={{ uri: item.image_url }}
              harga={item.base_price}
            />
          </View>
        ))
      }
      </View>
      <Gap height={windowHeight * 0.35} />
    </ScrollView>
  );
}

export default Produk;

const styles = StyleSheet.create({
  wrapperProduk: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

});
