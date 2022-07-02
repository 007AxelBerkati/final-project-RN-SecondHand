import { View } from 'react-native';
import React from 'react';
import { CardList } from '../../components';

function Favorite({ navigation, productDiminati }) {
  return (
    <View>
      {
        productDiminati.map((item) => (
          <CardList
            name={item.Product.name}
            title="Penawaran Produk"
            source={{ uri: item.Product.image_url }}
            date={item.createdAt}
            harga={item.Product.base_price}
            hargaNego={item.price}
            onPress={() => navigation.navigate('InfoPenawaranScreen')}
          />
        ))

      }
    </View>
  );
}

export default Favorite;
