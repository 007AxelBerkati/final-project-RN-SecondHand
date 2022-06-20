import {
  SafeAreaView, StyleSheet, Text, View, StatusBar, ScrollView,
} from 'react-native';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik } from 'formik';

import {
  colors, showSuccess, signupSchema, windowHeight,
} from '../../utils';
import {
  Button, Gap, Input, LinkComponent,
} from '../../components';
import { getRegister } from '../../redux/action/authRegister';

function RegisterScreen({ navigation }) {
  const dispatch = useDispatch();
  const dataRegister = useSelector((state) => state.dataRegister);

  const onSubmit = (fullname, email, password, address, phonenumber) => {
    dispatch(getRegister(fullname, email, password, address, phonenumber, navigation));
    if (dataRegister.isSuccess) {
      showSuccess('Register Success');
    } else {
      showSuccess(dataRegister.error);
    }
  };
  return (
    <View style={{ backgroundColor: 'white', height: windowHeight, marginHorizontal: 30 }}>
      <ScrollView showsVerticalScrollIndicator>
        <StatusBar barStyle="light-content" backgroundColor={colors.white} />
        <Formik
          initialValues={{
            email: '', password: '', fullname: '', address: '', phonenumber: '',
          }}
        // eslint-disable-next-line max-len
          onSubmit={(values) => onSubmit(values.fullname, values.email, values.password, values.address, values.phonenumber)}
          validationSchema={signupSchema}
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
                  color: colors.text.tertiary,
                  fontSize: 30,
                }}
              >
                Daftar
              </Text>
              <Input leftIcon="account-circle" label="Fullname" onChangeText={handleChange('fullname')} value={values.fullname} onBlur={handleBlur('fullname')} />
              {errors.fullname && <Text style={styles.error}>{errors.fullname}</Text>}
              <Gap height={10} />
              <Input
                onChangeText={handleChange('address')}
                value={values.address}
                label="Address"
                onBlur={handleBlur('address')}
                leftIcon="map-marker"
              />
              {errors.address && (
              <Text style={styles.error}>{errors.address}</Text>
              )}
              <Gap height={10} />
              <Input
                onChangeText={handleChange('phonenumber')}
                value={values.phonenumber}
                label="Phone Number"
                onBlur={handleBlur('phonenumber')}
                leftIcon="phone"
              />
              {errors.address && (
              <Text style={styles.error}>{errors.address}</Text>
              )}
              <Gap height={10} />
              <Input
                placeHolder="Email"
                onChangeText={handleChange('email')}
                value={values.email}
                label="Email"
                onBlur={handleBlur('email')}
                leftIcon="email"
              />
              {errors.email && <Text style={styles.error}>{errors.email}</Text>}
              <Gap height={10} />
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
              <Gap height={10} />
              <Button
                title="Daftar"
                onPress={handleSubmit}
                disabled={!isValid}
              />
              <Gap height={70} />
              <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                <Text style={{ color: colors.text.primary }}>Sudah Punya Akun ? </Text>
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
  );
}

export default RegisterScreen;

const styles = StyleSheet.create({
  pages: {
    justifyContent: 'center',
    alignItems: 'center',

  },
});
