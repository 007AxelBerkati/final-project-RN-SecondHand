import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {fonts} from '../../utils';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {windowHeight, windowWidth} from '../../utils/dimensions';
import Input from '../../components/atoms/Input';
import {Formik} from 'formik';
import SelectDropdown from 'react-native-select-dropdown';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Profile from '../../components/molekuls/Profile';
import {ILNullPhoto} from '../../assets';
import Headers from '../../components/molekuls/Headers';

function ProfileScreen({navigation}) {
  const getImage = () => {
    launchImageLibrary(
      {
        quality: 0.5,
        maxWidth: 200,
        maxHeight: 200,
        includeBase64: true,
      },
      response => {
        // console.log('response : ', response);
        if (response.didCancel || response.error) {
          showError('Sepertinya anda tidak memilih fotonya');
        } else {
          const source = response?.assets[0];
          // console.log('response GetImage : ', source);
          setPhotoForDB(`data:${source.type};base64, ${source.base64}`);
          const Uri = {uri: source.uri};
          setPhoto(Uri);
          setHasPhoto(true);
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
        <Profile source={ILNullPhoto} />
      </View>
      <Formik
        initialValues={{nama: '', alamat: '', handphone: ''}}
        onSubmit={values => console.log(values)}>
        {({handleChange, handleBlur, handleSubmit, values}) => (
          <View style={{paddingHorizontal: 5, margin: 15}}>
            <Input
              leftIcon="account"
              label="Nama"
              onChangeText={handleChange('nama')}
              value={values.nama}
              onBlur={handleBlur('nama')}
            />

            <SelectDropdown
              data={kota}
              // defaultValueByIndex={1}
              // defaultValue={'Egypt'}
              onSelect={(selectedItem, index) => {
                console.log(selectedItem, index);
              }}
              defaultButtonText={'Pilih Kota'}
              buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem;
              }}
              rowTextForSelection={(item, index) => {
                return item;
              }}
              buttonStyle={styles.dropdown1BtnStyle}
              buttonTextStyle={styles.dropdown1BtnTxtStyle}
              renderDropdownIcon={isOpened => {
                return (
                  <FontAwesome
                    name={isOpened ? 'chevron-up' : 'chevron-down'}
                    color={'#444'}
                    size={18}
                  />
                );
              }}
              dropdownIconPosition={'right'}
              dropdownStyle={styles.dropdown1DropdownStyle}
              rowStyle={styles.dropdown1RowStyle}
              rowTextStyle={styles.dropdown1RowTxtStyle}
              selectedRowStyle={styles.dropdown1SelectedRowStyle}
              search
              searchInputStyle={styles.dropdown1searchInputStyleStyle}
              searchPlaceHolder={'Search here'}
              searchPlaceHolderColor={'darkgrey'}
              renderSearchInputLeftIcon={() => {
                return <FontAwesome name={'search'} color={'#444'} size={18} />;
              }}
            />

            <Input
              leftIcon="home"
              label="Alamat"
              onChangeText={handleChange('alamat')}
              value={values.alamat}
              onBlur={handleBlur('alamat')}
            />
            <Input
              leftIcon="cellphone"
              label="No. Handphone"
              onChangeText={handleChange('handphone')}
              value={values.handphone}
              onBlur={handleBlur('handphone')}
            />

            <View style={styles.Button}>
              <Button title="Simpan" color="red" />
            </View>
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
  },
  borderText: {
    marginLeft: windowWidth * 0.3,
    marginTop: windowHeight * -0.06,
  },
  text1: {
    color: '#112340',
    fontSize: 16,
    marginTop: 10,
    fontFamily: fonts.Poppins.SemiBold,
  },
  icon1: {
    marginRight: 64,
  },
  name: {
    marginTop: windowHeight * 0.3,
  },
  input1: {
    borderWidth: 1,
    height: 50,
    width: windowWidth * 0.93,
    borderRadius: 12,
  },
  Button: {
    width: 250,
    marginLeft: windowWidth * 0.13,
    marginTop: windowHeight * 0.13,
  },

  text: {
    fontSize: 24,
  },
  kota: {
    borderWidth: 1,
    borderRadius: 12,
    marginTop: 15,
  },
  dropdown1BtnStyle: {
    width: windowWidth * 0.9,
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
  photo: {
    marginTop: windowHeight * 0.04,
  },
});
