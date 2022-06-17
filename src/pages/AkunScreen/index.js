import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CardList, Headers, Profile } from '../../components';
import {
  colors, fonts,
} from '../../utils';
import { version } from '../../../package.json';
import { getAkun } from '../../redux';
import { ILNullPhoto } from '../../assets';

function AkunScreen() {
  const dispatch = useDispatch();
  const dataUser = useSelector((state) => state.dataAkun.dataAkun);
  const token = useSelector((state) => state.dataLogin.data.access_token);

  useEffect(() => {
    dispatch(getAkun(token));
    console.log(dataUser.image_url);
  }, []);

  return (
    <View style={styles.pages}>
      <Headers title="Akun Saya" />
      <Profile source={ILNullPhoto} />
      <CardList type="account" name="edit" title="Ubah Akun" />
      <CardList type="account" name="setting" title="Pengaturan Akun" />
      <CardList type="account" name="logout" title="Keluar" />
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
