/* eslint-disable max-len */
/* eslint-disable camelcase */
import {
  SafeAreaView, StyleSheet, Text, View, StatusBar, ScrollView, TouchableWithoutFeedback, Keyboard,
} from 'react-native';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik } from 'formik';

import {
  colors, fonts, signupSchema, windowHeight,
} from '../../utils';
import {
  ButtonComponent, Gap, Input, LinkComponent,
} from '../../components';
import { getRegister } from '../../redux/action/authRegister';

function RegisterScreen({ navigation }) {
  const dispatch = useDispatch();
  const stateGlobal = useSelector((state) => state.dataGlobal);
  const dataRegister = useSelector((state) => state.dataRegister);

  // eslint-disable-next-line camelcase
  const onSubmit = (full_name, email, password, phone_number, address, image, city) => {
    dispatch(getRegister({
      full_name, email, password, phone_number, address, image: null, city,
    }, navigation, dataRegister));
  };
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={{ flex: 1, margin: 16 }}>
        <ScrollView showsVerticalScrollIndicator>
          <StatusBar barStyle="light-content" backgroundColor={colors.white} />
          <Formik
            initialValues={{
              full_name: '', email: '', password: '', phone_number: '', address: '', image: null, city: '',
            }}
        // eslint-disable-next-line max-len
            onSubmit={(values) => onSubmit(values.full_name, values.email, values.password, values.phone_number, values.address, values.image, values.city)}
            validationSchema={signupSchema}
          >
            {({
              handleChange, handleSubmit, errors, isValid, values, handleBlur, touched, dirty,
            }) => (
              <SafeAreaView>
                <Text
                  style={{
                    marginTop: windowHeight * 0.05,
                    alignSelf: 'flex-start',
                    marginBottom: 70,
                    fontWeight: 'bold',
                    color: colors.text.tertiary,
                    fontSize: 30,
                  }}
                >
                  Daftar
                </Text>
                <Input leftIcon="account-circle" label="Fullname" onChangeText={handleChange('full_name')} value={values.full_name} onBlur={handleBlur('full_name')} />
                {errors.full_name && touched.full_name
              && <Text style={styles.errorText}>{errors.full_name}</Text>}
                <Gap height={10} />
                <Input
                  placeHolder="Email"
                  onChangeText={handleChange('email')}
                  value={values.email}
                  label="Email"
                  onBlur={handleBlur('email')}
                  leftIcon="email"
                />
                {errors.email && touched.email
              && <Text style={styles.errorText}>{errors.email}</Text>}
                <Gap height={10} />
                <Input
                  onChangeText={handleChange('password')}
                  value={values.password}
                  label="Password"
                  onBlur={handleBlur('password')}
                  secureTextEntry
                  leftIcon="key"
                />
                {errors.password && touched.password
              && <Text style={styles.errorText}>{errors.password}</Text>}
                <Gap height={10} />
                <Input
                  onChangeText={handleChange('address')}
                  value={values.address}
                  label="Address"
                  onBlur={handleBlur('address')}
                  leftIcon="map-marker"
                />
                {errors.address && touched.address
              && <Text style={styles.errorText}>{errors.address}</Text>}
                <Gap height={10} />
                <Input
                  onChangeText={handleChange('phone_number')}
                  value={values.phone_number}
                  label="Phone Number"
                  onBlur={handleBlur('phone_number')}
                  leftIcon="phone"
                />
                {errors.phone_number && touched.phone_number
              && <Text style={styles.errorText}>{errors.phone_number}</Text>}
                <Gap height={10} />

                <ButtonComponent
                  title="Daftar"
                  onPress={handleSubmit}
                  disable={!(dirty && isValid) || stateGlobal.isLoading}
                />
                <Gap height={70} />
                <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                  <Text style={{ color: colors.text.primary, fontFamily: fonts.Poppins.Regular, fontSize: 14 }}>Sudah Punya Akun ? </Text>
                  <LinkComponent
                    title="Masuk disini"
                    color={colors.text.tertiary}
                    onPress={() => navigation.navigate('LoginScreen')}
                    size={13}
                  />
                </View>
              </SafeAreaView>
            )}
          </Formik>
        </ScrollView>

      </View>
    </TouchableWithoutFeedback>

  );
}

export default RegisterScreen;

const styles = StyleSheet.create({
  pages: {
    justifyContent: 'center',
    alignItems: 'center',

  },
  errorText: {
    fontFamily: fonts.Poppins.Medium,
    color: colors.warning,
    fontSize: 12,
  },
});
