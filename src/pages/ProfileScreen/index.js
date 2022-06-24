import { StyleSheet, View, Text } from 'react-native';
import React, { useState } from 'react';
import { Formik } from 'formik';
import { launchImageLibrary } from 'react-native-image-picker';
import FormData from 'form-data';
import { useDispatch, useSelector } from 'react-redux';
import DropDownPicker from 'react-native-dropdown-picker';
import {
  showError, updateProfileSchema, fonts, colors,
  windowHeight, windowWidth,
} from '../../utils';
import {
  Headers,
  Input, Profile, ButtonComponent, Gap, Select,
} from '../../components';
import { putDataProfile } from '../../redux';
import { kota } from '../../assets';

function ProfileScreen({ navigation }) {
  const dispatch = useDispatch();
  const stateGlobal = useSelector((state) => state.dataGlobal);
  const dataProfile = useSelector((state) => state.dataProfile.profile);
  const [photo, setPhoto] = useState(dataProfile.image_url);

  const getImage = (setFieldValue) => {
    launchImageLibrary(
      {
        quality: 1,
        maxWidth: windowWidth * 0.3,
        maxHeight: windowHeight * 0.15,
        includeBase64: true,
      },
      (response) => {
        if (response.didCancel || response.error) {
          showError('Sepertinya anda tidak memilih fotonya');
        } else {
          const source = response?.assets[0];
          const Uri = source.uri;
          setPhoto(Uri);
          setFieldValue('image', source, true);
        }
      },
    );
  };

  const updateProfile = (data) => {
    const formData = new FormData();
    formData.append('full_name', data.full_name);
    formData.append('city', data.city);
    formData.append('address', data.address);
    formData.append('phone_number', parseInt(data.phone_number, 10));
    formData.append('image', {
      uri: data.image.uri,
      type: 'image/jpeg',
      name: data.image.fileName,
    });
    dispatch(putDataProfile(formData, navigation));
  };
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState([]);
  const [items, setItems] = useState([
    { label: 'Spain', value: 'spain' },
    { label: 'Madrid', value: 'madrid', parent: 'spain' },
    { label: 'Barcelona', value: 'barcelona', parent: 'spain' },

    { label: 'Italy', value: 'italy' },
    { label: 'Rome', value: 'rome', parent: 'italy' },

    { label: 'Finland', value: 'finland' },
  ]);

  return (
    <View style={styles.pages}>
      <View>
        <Headers
          title="Lengkapi Info Akun"
          type="back-title"
          onPress={() => navigation.goBack()}
        />
      </View>
      <Formik
        initialValues={{
          full_name: dataProfile.full_name,
          city: dataProfile.city,
          address: dataProfile.address,
          phone_number: dataProfile.phone_number,
          image: dataProfile.image_url,
        }}
        onSubmit={(values) => updateProfile(values)}
        validationSchema={updateProfileSchema}
      >
        {({
          handleChange, handleSubmit, errors, values, handleBlur, touched, setFieldValue, isValid,
        }) => (
          <View>
            <View style={styles.photo}>
              <Profile
                source={{ uri: photo }}
                isRemove
                onPress={() => getImage(setFieldValue)}
              />
            </View>
            <Input
              leftIcon="account-circle"
              label="Nama"
              onChangeText={handleChange('full_name')}
              value={values.full_name}
              onBlur={handleBlur('full_name')}
            />
            {errors.full_name && touched.full_name
              && <Text style={styles.errorText}>{errors.full_name}</Text>}
            <Gap height={15} />

            {/* <Select
              data={kota}
              onSelect={(selectedItem) => {
                // eslint-disable-next-line no-param-reassign
                values.city = selectedItem;
              }}
              defaultValue={values.city}
            /> */}
            <DropDownPicker
              open={open}
              value={value}
              items={items}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
              dropDownContainerStyle={styles.dropdown1DropdownStyle}
            />
            {errors.city && touched.city
              && <Text style={styles.errorText}>{errors.city}</Text>}
            <Gap height={15} />
            <Input
              leftIcon="map-marker"
              label="Alamat"
              onChangeText={handleChange('address')}
              value={values.address}
              onBlur={handleBlur('address')}
            />
            {errors.address && touched.address
              && <Text style={styles.errorText}>{errors.address}</Text>}
            <Gap height={15} />
            <Input
              leftIcon="phone"
              label="Nomor Telepon +62"
              onChangeText={handleChange('phone_number')}
              value={values.phone_number}
              onBlur={handleBlur('phone_number')}
            />
            {errors.phone_number && touched.phone_number
              && <Text style={styles.errorText}>{errors.phone_number}</Text>}
            <Gap height={windowHeight * 0.05} />
            <ButtonComponent title="Simpan" onPress={handleSubmit} disable={!(isValid) || stateGlobal.isLoading} />
          </View>
        )}
      </Formik>
    </View>
  );
}

export default ProfileScreen;

const styles = StyleSheet.create({
  pages: {
    flex: 1,
    backgroundColor: 'white',
    margin: 16,
  },
  input1: {
    borderWidth: 1,
    height: 50,
    width: windowWidth * 0.93,
    borderRadius: 12,
  },

  text: {
    fontSize: 24,
  },
  city: {
    borderWidth: 1,
    borderRadius: 12,
    marginTop: 15,
  },
  photo: {
    marginTop: windowHeight * 0.04,
  },
  errorText: {
    fontFamily: fonts.Poppins.Medium,
    color: colors.warning,
    fontSize: 12,
  },

});
