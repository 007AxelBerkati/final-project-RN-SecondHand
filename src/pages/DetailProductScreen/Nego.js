import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  colors, fonts, windowHeight, windowWidth,
} from '../../utils';
import { CardList, Gap, Input2 } from '../../components';
import { getDetailProduct } from '../../redux/action/detailProductBuyer';

function Nego() {
  const dataDetailProductBuyer = useSelector((state) => state.dataDetailProductBuyer.detailBuyer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDetailProduct());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <View style={styles.contentContainer}>
      <Text style={{ color: colors.text.primary, fontFamily: fonts.Poppins.SemiBold }}>
        Masukan Harga Tawarmu
      </Text>
      <Gap height={windowHeight * 0.02} />
      <Text style={{ color: colors.border, fontFamily: fonts.Poppins.Regular }}>
        Harga tawaranmu akan diketahui penjual, jika penjual cocok kamu
        akan segera dihubungi penjual.
      </Text>
      <Gap height={windowHeight * 0.02} />
      <CardList
        source={dataDetailProductBuyer?.image_url}
        name={dataDetailProductBuyer?.name}
        harga={dataDetailProductBuyer?.base_price}
      />
      <Text style={{ fontFamily: fonts.Poppins.SemiBold }}>Harga Tawar</Text>
      <Input2 />
    </View>
  );
}

export default Nego;

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    marginHorizontal: windowWidth * 0.09,
    marginVertical: windowHeight * 0.03,

  },
});
