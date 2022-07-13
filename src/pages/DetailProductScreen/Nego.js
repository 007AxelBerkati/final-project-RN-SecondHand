import { Formik } from 'formik';
import React from 'react';
import {
  Alert, Keyboard, StyleSheet, Text, TouchableWithoutFeedback, View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  ButtonComponent,
  CardList, Gap, Input2,
} from '../../components';
import { bidProduct, getAllBidProduct, putBid } from '../../redux';
import {
  bidPriceSchema, colors, fonts, fontSize, windowHeight, windowWidth,
} from '../../utils';

function Nego({
  handleCloseSheet, setisAlreadyBid, dataDetailBid, setIsSubmit,
}) {
  const dataDetailProductBuyer = useSelector((state) => state.dataDetailProductBuyer.detailBuyer);

  const dispatch = useDispatch();

  const submitBid = (bid) => {
    if (dataDetailBid.length > 0) {
      if (parseFloat(dataDetailBid[0]?.price) >= parseFloat(bid)) {
        Alert.alert('Bid tidak valid', 'Bid harus lebih besar dari penawaran harga awal');
        return;
      }
      dispatch(putBid(dataDetailBid[0]?.id, { bid_price: parseFloat(bid) }));
      setisAlreadyBid(true);
      setIsSubmit(true);
      handleCloseSheet();
      return;
    }
    const data = {
      product_id: dataDetailProductBuyer.id,
      bid_price: bid,
    };
    dispatch(bidProduct(data));
    setisAlreadyBid(true);
    dispatch(getAllBidProduct());
    setIsSubmit(true);
    handleCloseSheet();
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <Formik
        validationSchema={bidPriceSchema}
        initialValues={{ bid_price: dataDetailBid[0]?.price ? dataDetailBid[0]?.price.toString() : '' }}
        onSubmit={(values) => submitBid(values.bid_price)}
      >
        {({
          handleChange, handleSubmit, errors, isValid, values, handleBlur, touched,
        }) => (
          <View style={styles.contentContainer}>
            <Text style={{ color: colors.text.primary, fontFamily: fonts.Poppins.SemiBold }}>
              Masukan Harga Tawarmu
            </Text>
            <Gap height={windowHeight * 0.02} />
            <Text style={{ color: colors.text.subtitle, fontFamily: fonts.Poppins.Regular }}>
              Harga tawaranmu akan diketahui penjual, jika penjual cocok kamu
              akan segera dihubungi penjual.
            </Text>
            <Gap height={windowHeight * 0.02} />
            <CardList
              source={{ uri: dataDetailProductBuyer?.image_url }}
              name={dataDetailProductBuyer?.name}
              harga={dataDetailProductBuyer?.base_price}
            />
            <Gap height={windowHeight * 0.02} />
            <Text style={{ fontFamily: fonts.Poppins.SemiBold }}>Harga Tawar</Text>
            <Input2
              placeholder="Rp 0.0"
              onChangeText={handleChange('bid_price')}
              value={values.bid_price}
              onBlur={handleBlur('bid_price')}
              keyboardType="numeric"
            />
            {errors.bid_price && touched.bid_price
              && <Text style={styles.errorText}>{errors.bid_price}</Text>}
            <Gap height={windowHeight * 0.03} />
            <ButtonComponent
              title="Kirim"
              onPress={() => Alert.alert('Kirim', 'Kirim tawaranmu?', [
                { text: 'Batal', style: 'cancel' },
                { text: 'Kirim', onPress: handleSubmit },
              ])}
              disable={!(isValid)}
            />
          </View>
        )}
      </Formik>
    </TouchableWithoutFeedback>

  );
}

export default Nego;

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    marginHorizontal: windowWidth * 0.09,
    marginVertical: windowHeight * 0.03,

  },
  errorText: {
    fontFamily: fonts.Poppins.Medium,
    color: colors.warning,
    fontSize: fontSize.small,
  },
});
