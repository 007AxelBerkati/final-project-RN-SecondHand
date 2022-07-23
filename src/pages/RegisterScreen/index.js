/* eslint-disable no-undef */
/* eslint-disable camelcase */
import FormData from 'form-data';
import { Formik } from 'formik';
import React from 'react';
import {
  Keyboard, SafeAreaView, ScrollView, StyleSheet, Text, TouchableWithoutFeedback, View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  ButtonComponent, Gap, Headers, Input, LinkComponent,
} from '../../components';
import { getRegister } from '../../redux';
import {
  colors, fonts, fontSize, signupSchema, windowHeight,
} from '../../utils';

function RegisterScreen({ navigation }) {
  const dispatch = useDispatch();
  const stateGlobal = useSelector((state) => state.dataGlobal);

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append('full_name', data.full_name);
    formData.append('email', data.email);
    formData.append('password', data.password);
    dispatch(getRegister(formData, navigation));
  };
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} testID="register-screen">
      <View style={{ flex: 1, margin: 16 }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Headers type="back" onPress={() => navigation.goBack()} />
          <Formik
            initialValues={{
              full_name: '', email: '', password: '',
            }}
            onSubmit={(values) => onSubmit(values)}
            validationSchema={signupSchema}
          >
            {({
              handleChange, handleSubmit, errors, isValid, values, handleBlur, touched, dirty,
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
