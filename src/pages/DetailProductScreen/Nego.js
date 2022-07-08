import {
  StyleSheet, Text, TouchableWithoutFeedback, View,
  Keyboard,
} from 'react-native';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik } from 'formik';
import {
  bidPriceSchema,
  colors, fonts, windowHeight, windowWidth,
} from '../../utils';
import {
  ButtonComponent,
  CardList, Gap, Input2,
} from '../../components';
// eslint-disable-next-line import/namespace
import { bidProduct } from '../../redux/action/detailProductBuyer';

function Nego({ navigation }) {
  const dataDetailProductBuyer = useSelector((state) => state.dataDetailProductBuyer.detailBuyer);
  const dispatch = useDispatch();

  const submitBid = (bid) => {
    const data = {
      bid_price: bid,
    };
    dispatch(bidProduct(data, navigation));
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <Formik
        validationSchema={bidPriceSchema}
        initialValues={{ bid_price: '' }}
        onSubmit={(values) => submitBid(values.bid_price)}
      >
        {({
          handleChange, handleSubmit, errors, isValid, values, handleBlur, touched, dirty,
        }) => (
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
            <Gap height={windowHeight * 0.02} />
            <Text style={{ fontFamily: fonts.Poppins.SemiBold }}>Harga Tawar</Text>
            <Input2
              placeholder="Rp 0.0"
              onChangeText={handleChange('bid_price')}
              value={values.bid_price}
              onBlur={handleBlur('bid_price')}
            />
            {errors.bid_price && touched.bid_price
            && <Text style={styles.errorText}>{errors.bid_price}</Text>}
            <Gap height={windowHeight * 0.03} />
            <ButtonComponent
              title="Kirim"
              onPress={handleSubmit}
              disable={!(dirty && isValid)}
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
});
