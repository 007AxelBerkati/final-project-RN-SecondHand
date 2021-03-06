import {
  StyleSheet, View,
} from 'react-native';
import React from 'react';
import { CardAddProduct, CardProduct, EmptySkeletonProduct } from '../../components';

function Produk({ dataDaftarJual, navigation }) {
  return (
    <View style={styles.wrapperProduk}>
      {
        dataDaftarJual?.loading ? (
          <View style={{ marginBottom: 5 }}>
            <EmptySkeletonProduct />
          </View>
        ) : (
          <>
            {
              dataDaftarJual?.daftarJual.length < 5 && (
                <CardAddProduct onPress={() => navigation.navigate('Jual', { screen: 'MainApp' })} />
              )
            }
            {
              dataDaftarJual?.daftarJual.map((item) => (
                <View style={{ marginBottom: 16 }} key={item.id}>
                  <CardProduct
                    name={item.name}
                    jenis={item.Categories}
                    source={item.image_url}
                    harga={item.base_price}
                    onPress={() => navigation.navigate('DetailProductSellerScreen', { id: item.id })}
                  />
                </View>
              ))
            }
          </>

        )
      }

    </View>
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
