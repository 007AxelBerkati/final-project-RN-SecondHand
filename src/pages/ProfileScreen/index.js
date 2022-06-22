import { StyleSheet, View, Text } from 'react-native';
import React, { useState } from 'react';
import { Formik } from 'formik';
import { launchImageLibrary } from 'react-native-image-picker';
import {
  showError, updateProfileSchema, fonts, colors,
} from '../../utils';
import { windowHeight, windowWidth } from '../../utils/dimensions';
import Input from '../../components/atoms/Input';
import Profile from '../../components/molekuls/Profile';
import { ILNullPhoto } from '../../assets';
import Headers from '../../components/molekuls/Headers';
import { ButtonComponent, Gap, Select } from '../../components/atoms';

function ProfileScreen({ navigation }) {
  const [photo, setPhoto] = useState(ILNullPhoto);
  const getImage = () => {
    launchImageLibrary(
      {
        quality: 0.5,
        maxWidth: 200,
        maxHeight: 200,
        includeBase64: true,
      },
      (response) => {
        // console.log('response : ', response);
        if (response.didCancel || response.error) {
          showError('Sepertinya anda tidak memilih fotonya');
        } else {
          const source = response?.assets[0];
          // console.log('response GetImage : ', source);

          const Uri = { uri: source.uri };
          setPhoto(Uri);
        }
      },
    );
  };

  const kota = [
    'Ambon',
    'Balikpapan',
    'Banda Aceh',
    'Bandar Lampung',
    'Bandung',
    'Banjar',
    'Banjarbaru',
    'Banjarmasin',
    'Batam',
    'Batu',
    'Baubau',
    'Bekasi',
    'Bengkulu',
    'Bima',
    'Binjai',
    'Bitung',
    'Blitar',
    'Bogor',
    'Bontang',
    'Bukittinggi',
    'Cilegon',
    'Cimahi',
    'Cirebon',
    'Denpasar',
    'Depok',
    'Dumai',
    'Gorontalo',
    'Gunungsitoli',
    'Jakarta Barat',
    'Jakarta Pusat',
    'Jakarta Selatan',
    'Jakarta Timur',
    'Jakarta Utara',
    'Jambi',
    'Jayapura',
    'Kediri',
  ];

  return (
    <View style={styles.pages}>
      <View>
        <Headers
          title="Lengkapi Info Akun"
          type="back-title"
          onPress={() => navigation.goBack()}
        />
      </View>
      <View style={styles.photo}>
        <Profile source={photo} isRemove photo={photo} onPress={getImage} />
      </View>
      <Formik
        initialValues={{
          fullname: '', kota: '', alamat: '', nomortelepon: '',
        }}
        onSubmit={(values) => console.log(values)}
        // eslint-disable-next-line max-len
        // onSubmit={(values) => onSubmit(values.fullname, values.kota, values.alamat, values.nomortelepon)}
        validationSchema={updateProfileSchema}
      >
        {({
          handleChange, handleSubmit, errors, values, handleBlur, touched,
        }) => (
          <View style={{ paddingHorizontal: 5, margin: 15 }}>
            <Input
              leftIcon="account-circle"
              label="Nama"
              onChangeText={handleChange('fullname')}
              value={values.fullname}
              onBlur={handleBlur('fullname')}
            />
            {errors.fullname && touched.fullname
              && <Text style={styles.errorText}>{errors.fullname}</Text>}
            <Gap height={15} />

            <Select
              data={kota}
              onSelect={(selectedItem) => {
                console.log(selectedItem);
              }}
            />
            {errors.kota && touched.kota
              && <Text style={styles.errorText}>{errors.kota}</Text>}
            <Gap height={15} />
            <Input
              leftIcon="map-marker"
              label="Alamat"
              onChangeText={handleChange('alamat')}
              value={values.alamat}
              onBlur={handleBlur('alamat')}
            />
            {errors.alamat && touched.alamat
              && <Text style={styles.errorText}>{errors.alamat}</Text>}
            <Gap height={15} />
            <Input
              leftIcon="phone"
              label="Nomor Telepon"
              onChangeText={handleChange('nomortelepon')}
              value={values.nomortelepon}
              onBlur={handleBlur('nomortelepon')}
            />
            {errors.nomortelepon && touched.nomortelepon
              && <Text style={styles.errorText}>{errors.nomortelepon}</Text>}
            <Gap height={80} />
            <ButtonComponent title="Simpan" onPress={handleSubmit} />

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
  kota: {
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
