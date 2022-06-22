/* eslint-disable no-undef */
/* eslint-disable camelcase */
import {
  SafeAreaView, StyleSheet, Text, View, TouchableWithoutFeedback, Keyboard, ScrollView,
} from 'react-native';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik } from 'formik';
import SelectDropdown from 'react-native-select-dropdown';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FormData from 'form-data';
import {
  colors, fonts, signupSchema, windowHeight,
} from '../../utils';
import {
  ButtonComponent, Gap, Headers, Input, LinkComponent,
} from '../../components';
import { getRegister } from '../../redux';

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
    formData.append('image', {
      uri: data.image,
      type: 'image/jpeg',
      name: 'image.jpg',
    });
    dispatch(getRegister(formData, navigation));
  };
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
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
            }) => (
              <SafeAreaView>
                <Text
                  style={{
                    marginTop: windowHeight * 0.05,
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
                <SelectDropdown
                  data={kota}
                  onSelect={(selectedItem) => {
                  // eslint-disable-next-line no-param-reassign
                    values.city = selectedItem;
                  }}
                  defaultValue={values.city}
                  defaultButtonText="Pilih Kota"
                  buttonTextAfterSelection={(selectedItem) => selectedItem}
                  rowTextForSelection={(item) => item}
                  buttonStyle={styles.dropdown1BtnStyle}
                  buttonTextStyle={styles.dropdown1BtnTxtStyle}
                  renderDropdownIcon={(isOpened) => (
                    <FontAwesome
                      name={isOpened ? 'chevron-up' : 'chevron-down'}
                      color="#444"
                      size={18}
                    />
                  )}
                  dropdownIconPosition="right"
                  dropdownStyle={styles.dropdown1DropdownStyle}
                  rowStyle={styles.dropdown1RowStyle}
                  rowTextStyle={styles.dropdown1RowTxtStyle}
                  selectedRowStyle={styles.dropdown1SelectedRowStyle}
                  search
                  searchInputStyle={styles.dropdown1searchInputStyleStyle}
                  searchPlaceHolder="Search here"
                  searchPlaceHolderColor="darkgrey"
                  renderSearchInputLeftIcon={() => (
                    <FontAwesome name="search" color="#444" size={18} />
                  )}
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
                  label="Phone Number"
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
                />
                <Gap height={20} />
                <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                  <Text style={{
                    color: colors.text.primary,
                    fontFamily: fonts.Poppins.Regular,
                    fontSize: 14,
                  }}
                  >
                    Sudah Punya Akun ?
                    {' '}

                  </Text>
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

  kota: {
    borderWidth: 1,
    borderRadius: 12,
    marginTop: 15,
  },
  dropdown1BtnStyle: {
    width: null,
    height: 50,
    backgroundColor: '#F0F0F0',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#B0B0B0',
    marginTop: 6,
  },
  dropdown1BtnTxtStyle: {
    color: '#444',
    textAlign: 'left',
  },
  dropdown1DropdownStyle: {
    backgroundColor: '#EFEFEF',
  },
  dropdown1RowStyle: {
    backgroundColor: '#EFEFEF',
    borderBottomColor: '#C5C5C5',
  },
  dropdown1RowTxtStyle: {
    color: '#444',
    textAlign: 'left',
  },
  dropdown1SelectedRowStyle: {
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  dropdown1searchInputStyleStyle: {
    backgroundColor: '#EFEFEF',
    borderRadius: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#444',
  },
});
