import { View } from 'react-native';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CardProduct from '../../components/molekuls/CardProduct';
import { Headers } from '../../components';
import { getWishlistBuyer } from '../../redux';

function DaftarSimpanScreen({ navigation }) {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.data);
  useEffect(() => {
    dispatch(getWishlistBuyer);
  });

  return (
    <View style={{ flex: 1, margin: 16 }}>
      <Headers type="back-title" onPress={() => navigation.goBack()} title="Daftar Simpan" />
      {data?.Product?.map((item) => (
        <CardProduct source={item.image_url} harga={item.base_price} name={item.name} icon="bookmark" />
      ))}

    </View>
  );
}

export default DaftarSimpanScreen;
