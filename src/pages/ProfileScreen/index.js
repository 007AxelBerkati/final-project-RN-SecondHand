import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Button,
  Image,
} from 'react-native';
import React from 'react';
import {Icon} from 'react-native-vector-icons/Ionicons';

import {Avatar} from '@rneui/themed';

import Ionicons from 'react-native-vector-icons/Ionicons';

function ProfileScreen() {
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

  return (
    <View style={styles.pages}>
      <View style={styles.header}>
        <View style={styles.icon1}>
          <Ionicons name="arrow-back-outline" color="black" size={20} />
        </View>
        <View>
          <Text style={styles.text1}>Lengkapi Info Akun</Text>
        </View>
      </View>
      <View style={styles.name}>
        <TextInput
          style={styles.input1}
          placeholder="Nama"
          placeholderTextColor={'black'}
          selectionColor={'black'}
        />
        <TextInput
          style={styles.input2}
          placeholder="Kota"
          placeholderTextColor={'black'}
          selectionColor={'black'}
        />
        <TextInput
          style={styles.input3}
          placeholder="Alamat"
          placeholderTextColor={'black'}
          selectionColor={'black'}
        />
        <TextInput
          style={styles.input4}
          placeholder="No Handphone"
          placeholderTextColor={'black'}
          selectionColor={'black'}
        />
      </View>

      <View style={styles.Button}>
        <Button title="Simpan" color="red" />
      </View>
    </View>
  );
}

export default ProfileScreen;

const styles = StyleSheet.create({
  pages: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    marginTop: -50,
  },
  text1: {
    color: '#112340',
    marginRight: 120,
  },
  icon1: {
    marginRight: 105,
  },
  input1: {
    borderWidth: 1,
    height: 40,
    width: 350,
    marginTop: 170,
    borderRadius: 12,
  },
  input2: {
    borderWidth: 1,
    height: 40,
    width: 350,
    borderRadius: 12,
    marginTop: 35,
  },
  input3: {
    borderWidth: 1,
    height: 90,
    width: 350,
    borderRadius: 12,
    marginTop: 35,
  },
  input4: {
    borderWidth: 1,
    height: 40,
    width: 350,
    borderRadius: 12,
    marginTop: 35,
  },
  Button: {
    width: 200,
    margin: 50,
  },
});
