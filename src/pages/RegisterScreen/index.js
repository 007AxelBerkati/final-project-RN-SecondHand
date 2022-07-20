/* eslint-disable no-undef */
/* eslint-disable camelcase */
import {
  SafeAreaView, StyleSheet, Text, View, TouchableWithoutFeedback, Keyboard, ScrollView,
} from 'react-native';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik } from 'formik';
import FormData from 'form-data';
import {
  colors, fonts, fontSize, signupSchema, windowHeight,
} from '../../utils';
import {
  ButtonComponent, Gap, Headers, Input, LinkComponent, Select2,
} from '../../components';
import { getRegister } from '../../redux';
import { kabupaten } from '../../assets';

function RegisterScreen({ navigation }) {
  const dispatch = useDispatch();
  const stateGlobal = useSelector((state) => state.dataGlobal);

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append('full_name', data.full_name);
    formData.append('email', data.email);
    formData.append('password', data.password);
    formData.append('city', data.city);
    formData.append('address', data.address);
    formData.append('phone_number', parseInt(data.phone_number, 10));
    dispatch(getRegister(formData, navigation));
  };
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} testID="register-screen">
      <View style={{ flex: 1, margin: 16 }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Headers type="back" onPress={() => navigation.goBack()} />
          <Formik
            initialValues={{
              full_name: '', email: '', password: '', phone_number: '', address: '', city: '', image: 'https://avatars.services.sap.com/images/naushad124_small.png',
            }}
            onSubmit={(values) => onSubmit(values)}
            validationSchema={signupSchema}
          >
            {({
              handleChange, handleSubmit, errors, isValid, values, handleBlur, touched, dirty,
              setFieldValue,
            }) => (
              <SafeAreaView>
                <Text
                  style={{
                    marginTop: windowHeight * 0.02,
                    alignSelf: 'flex-start',
                    color: colors.text.tertiary,
                    fontSize: 30,
                    fontFamily: fonts.Poppins.Bold,
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
                  testId="email"
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
                  testId="password"
                />
                {errors.password && touched.password
                  && <Text style={styles.errorText}>{errors.password}</Text>}

                <Gap height={10} />
                <Select2
                  data={kabupaten}
                  setFieldValue={setFieldValue}
                  value={values.city}
                  initialData={values.city}
                  schema={{
                    label: 'name',
                    value: 'name',
                  }}
                  name="city"
                  placeholder="Pilih Kabupaten/Kota"
                />
                {errors.city && touched.city
                  && <Text style={styles.errorText}>{errors.city}</Text>}
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
                  label="Phone Number +62"
                  onBlur={handleBlur('phone_number')}
                  leftIcon="phone"
                  keyboardType="numeric"
                />
                {errors.phone_number && touched.phone_number
                  && <Text style={styles.errorText}>{errors.phone_number}</Text>}

                <Gap height={20} />

                <ButtonComponent
                  title="Daftar"
                  onPress={handleSubmit}
                  disable={!(dirty && isValid) || stateGlobal.isLoading}
                  testID="register"
                />
                <Gap height={20} />
                <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                  <Text style={{
                    color: colors.text.primary,
                    fontFamily: fonts.Poppins.Regular,
                    fontSize: fontSize.medium,
                  }}
                  >
                    Sudah Punya Akun ?
                    {' '}

                  </Text>
                  <LinkComponent
                    title="Masuk disini"
                    color={colors.text.tertiary}
                    onPress={() => navigation.navigate('LoginScreen')}
                    size={fontSize.medium}
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
    fontSize: fontSize.small,
  },
});
