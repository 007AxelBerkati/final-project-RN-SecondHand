import { Formik } from 'formik';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Gap, ButtonComponent, Headers, Input2,
} from '../../components';
import {
  colors, fonts, fontSize,
  gantiPassSchema,
  windowHeight,
} from '../../utils';

import { gantiPass } from '../../redux';

function ForgotPasswordScreen({ navigation }) {
  const dispatch = useDispatch();
  const stateGlobal = useSelector((state) => state.dataGlobal);

  const onSubmit = (current, newPass, confirmPass) => {
    dispatch(gantiPass(current, newPass, confirmPass, navigation));
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={{ flex: 1, margin: 16 }}>
        <Headers type="back" onPress={() => navigation.goBack()} />
        <Formik
          initialValues={{ current_password: '', new_password: '', confirm_password: '' }}
          onSubmit={(values, { resetForm }) => {
            onSubmit(
              values.current_password,
              values.new_password,
              values.confirm_password,
            );
            resetForm();
          }}
          validationSchema={gantiPassSchema}
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
                Ganti Password
              </Text>
              <Gap height={windowHeight * 0.05} />
              <Input2
                onChangeText={handleChange('current_password')}
                value={values.current_password}
                label="Password Sekarang"
                onBlur={handleBlur('current_password')}
                secureTextEntry
              />
              {errors.current_password && touched.current_password
                && <Text style={styles.errorText}>{errors.current_password}</Text>}
              <Gap height={16} />
              <Input2
                onChangeText={handleChange('new_password')}
                value={values.new_password}
                label="Password Baru"
                onBlur={handleBlur('new_password')}
                secureTextEntry
              />
              {errors.new_password && touched.new_password
                && <Text style={styles.errorText}>{errors.new_password}</Text>}
              <Gap height={16} />
              <Input2
                onChangeText={handleChange('confirm_password')}
                value={values.confirm_password}
                label="Confirm Password"
                onBlur={handleBlur('confirm_password')}
                secureTextEntry
              />
              {errors.confirm_password
                && touched.confirm_password
                && <Text style={styles.errorText}>{errors.confirm_password}</Text>}
              <Gap height={24} />
              <ButtonComponent
                title="Confirm"
                onPress={handleSubmit}
                disable={!(dirty && isValid) || stateGlobal.isLoading}
              />
            </SafeAreaView>
          )}
        </Formik>
        <Gap height={windowHeight * 0.1} />
      </View>
    </TouchableWithoutFeedback>

  );
}

export default ForgotPasswordScreen;

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
    color: colors.text.black,
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
