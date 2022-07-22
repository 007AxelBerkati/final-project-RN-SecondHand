import { Formik } from 'formik';
import React from 'react';
import {
  Alert, Keyboard, SafeAreaView, StyleSheet, Text, TouchableWithoutFeedback, View,
} from 'react-native';
import TouchID from 'react-native-touch-id';
import { useDispatch, useSelector } from 'react-redux';
import {
  ButtonComponent, Gap, Headers, Input, LinkComponent,
} from '../../components';
import {
  colors, fonts, fontSize, getDataSecure, loginSchema,
  optionalConfigObject, showError, storeDataSecure, windowHeight,
} from '../../utils';

import { getLogin, setLoading } from '../../redux';

function LoginScreen({ navigation }) {
  const dispatch = useDispatch();
  const dataLogin = useSelector((state) => state.dataLogin);
  const stateGlobal = useSelector((state) => state.dataGlobal);

  const onSubmit = (email, password) => {
    storeDataSecure('user', { email, password });
    dispatch(getLogin(email, password, navigation, dataLogin));
  };

  const onFingerprint = () => {
    TouchID.isSupported(optionalConfigObject).then((biometryType) => {
      if (biometryType === 'FaceID') {
        Alert.alert('This device supports FaceID');
      } else {
        TouchID.authenticate('To access your account', optionalConfigObject)
          .then(() => {
            dispatch(setLoading(true));
            getDataSecure('user').then((user) => {
              if (user) {
                const users = {
                  email: user.email,
                  password: user.password,
                };
                onSubmit(users.email, users.password);
              } else {
                dispatch(setLoading(false));
                showError('Please Login first');
              }
            });
          })
          .catch((error) => {
            showError(error.message);
          });
      }
    });
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} testID="login-screen">
      <View style={{ flex: 1, margin: 16 }}>
        <Headers type="back" onPress={() => navigation.goBack()} />
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
                testID="email"
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
                testID="password"
              />
              {errors.password
                && touched.password && <Text style={styles.errorText}>{errors.password}</Text>}

              <View style={styles.iconWrapper}>
                <ButtonComponent
                  type="icon-button"
                  onPress={onFingerprint}
                  style={styles.iconButton}
                />
              </View>
              <Gap height={24} />
              <ButtonComponent
                title="Login"
                onPress={handleSubmit}
                disable={!(dirty && isValid) || stateGlobal.isLoading}
                testID="login"
              />
            </SafeAreaView>
          )}
        </Formik>
        <Gap height={windowHeight * 0.1} />
        <View style={styles.goRegisterWrapper}>
          <Text style={styles.registerTitle}>
            Belum Punya Akun ?
            {' '}
          </Text>
          <LinkComponent disable={stateGlobal.isLoading} title="Register" color={colors.text.tertiary} size={fontSize.medium} onPress={() => navigation.navigate('RegisterScreen')} />
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
    fontSize: fontSize.small,
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
    fontSize: fontSize.medium,
    color: colors.text.primary,
  },

  iconWrapper: {
    marginTop: 16,
    alignItems: 'center',
  },

  iconButton: {
    width: 54,
    height: 54,
    borderRadius: 54 / 5,
  },
});
