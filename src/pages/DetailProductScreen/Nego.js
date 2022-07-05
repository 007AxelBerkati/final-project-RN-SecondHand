import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik } from 'formik';
import {
  bidPriceSchema,
  colors, fonts, windowHeight, windowWidth,
} from '../../utils';
import {
  CardList, Gap, Input,
} from '../../components';
import { getAllBidProduct } from '../../redux/action/detailProductBuyer';

function Nego({ navigation }) {
  const dataDetailProductBuyer = useSelector((state) => state.dataDetailProductBuyer.detailBuyer);
  const dispatch = useDispatch();

  const submitBid = (bid) => {
    const data = {
      bid_price: bid,
    };
    dispatch(getAllBidProduct(data, navigation));
  };

  return (
    <Formik
      validationSchema={bidPriceSchema}
      initialValues={{ bid_price: '' }}
      onSubmit={(values) => submitBid(values.bid_price)}
    >
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
          source={{ uri: dataDetailProductBuyer?.image_url }}
          name={dataDetailProductBuyer?.name}
          harga={dataDetailProductBuyer?.base_price}
        />
        <Text style={{ fontFamily: fonts.Poppins.SemiBold }}>Harga Tawar</Text>
        <Input
          label="Rp 0.0"
        />
      </View>
    </Formik>

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
