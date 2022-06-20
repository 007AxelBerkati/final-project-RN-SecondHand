import { Formik } from 'formik';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  StatusBar,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Gap, Input, ButtonComponent, Headers, LinkComponent,
} from '../../components';
import {
  colors, fonts, loginSchema, windowHeight,
} from '../../utils';

import { getLogin } from '../../redux';

function LoginScreen({ navigation }) {
  const dispatch = useDispatch();
  const dataLogin = useSelector((state) => state.dataLogin);
  const stateGlobal = useSelector((state) => state.dataGlobal);

  const onSubmit = (email, password) => {
    dispatch(getLogin(email, password, navigation, dataLogin));
  };
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={{ flex: 1, margin: 16 }}>
        <StatusBar barStyle="light-content" backgroundColor={colors.white} />
        <Headers type="back" />
        <Formik
          initialValues={{ email: '', password: '' }}
          onSubmit={(values) => onSubmit(values.email, values.password)}
          validationSchema={loginSchema}
        >
          {({
            handleChange, handleSubmit, errors, isValid, values, handleBlur, touched, dirty,
          }) => (
            <SafeAreaView>
              <Text
                style={{
                  marginTop: windowHeight * 0.05,
                  alignSelf: 'flex-start',
                  fontFamily: fonts.Poppins.Bold,
                  color: colors.text.tertiary,
                  fontSize: 30,
                }}
              >
                Masuk
              </Text>
              <Gap height={windowHeight * 0.05} />
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
              <Gap height={16} />
              <Input
                onChangeText={handleChange('password')}
                value={values.password}
                label="Password"
                onBlur={handleBlur('password')}
                secureTextEntry
                leftIcon="key"
              />
              {errors.password
              && touched.password && <Text style={styles.errorText}>{errors.password}</Text>}
              <Gap height={24} />
              <ButtonComponent
                title="Login"
                onPress={handleSubmit}
                disabled={!isValid}
                disable={!(dirty && isValid) || stateGlobal.isLoading}
              />
            </SafeAreaView>
          )}
        </Formik>
        <Gap height={windowHeight * 0.30} />
        <View style={styles.goRegisterWrapper}>
          <Text style={styles.registerTitle}>
            Don&lsquo;t have an account?
            {' '}
          </Text>
          <LinkComponent disable={stateGlobal.isLoading} title="Register" color={colors.text.tertiary} size={14} onPress={() => navigation.replace('RegisterScreen')} />
        </View>
      </View>
    </TouchableWithoutFeedback>

  );
}

export default LoginScreen;

const styles = StyleSheet.create({
  errorText: {
    fontFamily: fonts.Poppins.Medium,
    color: colors.warning,
    fontSize: 12,
  },
  RegisterText: {
    color: colors.text.secondary,
    fontFamily: fonts.Poppins.Bold,
  },

  goRegisterWrapper: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',

  },

  registerTitle: {
    fontFamily: fonts.Poppins.Medium,
    fontSize: 14,
    color: colors.text.black,
  },
});
