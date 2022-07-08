import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDetailProduct } from '../../redux';

function DetailProductBuyerScreen({ route }) {
  const { id } = route.params;

  const dataDetailBuyerProduct = useSelector((state) => state.dataDetailProductBuyer.detailBuyer);

  const dispatch = useDispatch();

  useEffect(() => {
    console.log(id);
    dispatch(getDetailProduct(id));
    console.log(dataDetailBuyerProduct);
  }, []);

  return (
    <View style={styles.pages}>
      <Text>DetailProductBuyerScreen</Text>
    </View>
  );
}

export default DetailProductBuyerScreen;

const styles = StyleSheet.create({});
