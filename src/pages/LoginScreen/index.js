import { Formik } from 'formik';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  StatusBar,
} from 'react-native';

import * as yup from 'yup';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Input from '../../components/atoms/Input';
import Button from '../../components/atoms/Button';
import {
  colors, fonts, showSuccess, windowHeight,
} from '../../utils';

import Gap from '../../components/atoms/Gap';
import { LinkComponent } from '../../components';

function LoginScreen({ navigation }) {
  const dispatch = useDispatch();
  const dataLogin = useSelector((state) => state.dataLogin);

  const onSubmit = () => {
    dispatch(getLogin(email, password, navigation));
    if (dataLogin.isSuccess) {
      showSuccess('Login Success');
    } else {
      showSuccess(dataLogin.error);
    }
  };
  const loginValidationSchema = yup.object().shape({
    email: yup
      .string()
      .email('Please enter valid email')
      .required('Email Address is Required'),
    password: yup
      .string()
      .min(6, ({ min }) => `Password must be at least ${min} characters`)
      .required('Password is required'),
  });

  return (
    <View style={{ backgroundColor: 'white', height: windowHeight, marginHorizontal: 30 }}>
      <StatusBar barStyle="light-content" backgroundColor={colors.white} />
      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={(values) => onSubmit(values)}
        validationSchema={loginValidationSchema}
      >
        {({
          handleChange, handleSubmit, errors, isValid, values, handleBlur,
        }) => (
          <SafeAreaView>
            <Text
              style={{
                marginTop: 90,
                alignSelf: 'flex-start',
                marginBottom: 70,
                fontWeight: 'bold',
                color: colors.text.secondary,
                fontSize: 30,
              }}
            >
              Masuk
            </Text>
            <Input
              placeHolder="Email"
              onChangeText={handleChange('email')}
              value={values.email}
              label="Email"
              onBlur={handleBlur('email')}
              leftIcon="email"
            />
            {errors.email && <Text style={styles.error}>{errors.email}</Text>}
            <Gap height={30} />
            <Input
              onChangeText={handleChange('password')}
              value={values.password}
              label="Password"
              onBlur={handleBlur('password')}
              secureTextEntry
              leftIcon="key"
            />
            {errors.password && (
            <Text style={styles.error}>{errors.password}</Text>
            )}
            <Gap height={30} />
            <Button
              title="Login"
              onPress={handleSubmit}
              disabled={!isValid}
            />
            <Gap height={250} />
            <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
              <Text style={{ color: colors.text.primary }}>Belum Punya Akun ? </Text>
              <LinkComponent
                title="Daftar disini"
                color={colors.text.secondary}
                onPress={() => navigation.navigate()}
                size={13}
              />
            </View>
          </SafeAreaView>
        )}
      </Formik>
    </View>
  );
}

export default LoginScreen;

const styles = StyleSheet.create({
  error: {
    fontSize: 13,
    color: 'red',
    marginLeft: 50,
  },
  RegisterText: {
    color: colors.text.secondary,
    fontFamily: fonts.Poppins.Bold,
  },
});
