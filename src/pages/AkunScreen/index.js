import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CardList, Headers, Profile } from '../../components';
import {
  colors, fonts,
} from '../../utils';
import { version } from '../../../package.json';
import { getAkun, logout } from '../../redux';

function AkunScreen({ navigation }) {
  const dispatch = useDispatch();
  const dataUser = useSelector((state) => state.dataAkun.dataAkun);

  useEffect(() => {
    dispatch(getAkun());
  }, []);

  const onLogout = () => {
    dispatch(logout());
    navigation.replace('LoginScreen');
  };

  return (
    <View style={styles.pages}>
      <Headers title="Akun Saya" />
      <Profile source={dataUser.image_url} />
      <CardList type="account" name="edit" title="Ubah Akun" />
      <CardList type="account" name="setting" title="Pengaturan Akun" />
      <CardList type="account" name="logout" title="Keluar" onPress={onLogout} />
      <Text style={styles.version}>
        Version
        {' '}
        {version}
      </Text>

    </View>
  );
}

export default AkunScreen;

const styles = StyleSheet.create({
  pages: {
    flex: 1,
    margin: 16,
  },

  version: {

    fontFamily: fonts.Poppins.Regular,
    fontSize: 12,
    color: colors.text.subtitle,
    marginTop: 16,
    alignSelf: 'center',

  },
});
