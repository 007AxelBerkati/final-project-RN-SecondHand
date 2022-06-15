import { Formik } from 'formik';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  StatusBar,
  Dimensions,
} from 'react-native';

import * as yup from 'yup';
import React from 'react';
import Input from '../../components/atoms/Input';
import Button from '../../components/atoms/Button';
import { colors } from '../../utils';

function LoginScreen({ navigation }) {
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
  const windowHeight = Dimensions.get('window').height;
  return (
    <View style={{ backgroundColor: 'white', height: windowHeight }}>
      <StatusBar barStyle="light-content" backgroundColor={colors.white} />
      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={(values) => (values)}
        validationSchema={loginValidationSchema}
      >
        {({
          handleChange, handleSubmit, errors, isValid, values, handleBlur,
        }) => (
          <SafeAreaView>
            <Text
              style={{
                marginTop: 90,
                alignSelf: 'center',
                marginBottom: 70,
                fontWeight: 'bold',
                color: colors.green,
                fontSize: 18,
              }}
            >
              Masuk
            </Text>
            <Input
              placeHolder="Email"
              onChangeText={handleChange('email')}
              value={values.email}
              onBlur={handleBlur('email')}
            />
            {errors.email && <Text style={styles.error}>{errors.email}</Text>}
            <Input
              onChangeText={handleChange('password')}
              value={values.password}
              label="Password"
              onBlur={handleBlur('password')}
            />
            {errors.password && (
            <Text style={styles.error}>{errors.password}</Text>
            )}
            <Button
              title="Login"
              onPress={handleSubmit}
              disabled={!isValid}
            />
            <Text style={{ color: colors.text.primary }}>Belum Punya Akun ?</Text>
            <TouchableOpacity
              style={styles.RegisterText}
              onPress={() => navigation.navigate('RegisterScreen')}
            >
              <Text> Daftar Disini </Text>
            </TouchableOpacity>
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
    alignSelf: 'center',
    color: colors.secondary,
    fontWeight: 'bold',
  },
});
