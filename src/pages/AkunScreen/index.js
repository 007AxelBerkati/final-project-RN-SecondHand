import {
  ScrollView, StyleSheet, Text, View,
} from 'react-native';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Fade, Placeholder, PlaceholderMedia } from 'rn-placeholder';
import {
  CardList, Headers, NotLogin, Profile,
} from '../../components';
import {
  borderRadius,
  colors, fonts, fontSize, windowHeight, windowWidth,
} from '../../utils';
import { version } from '../../../package.json';
import { getAkun, logout } from '../../redux';

function AkunScreen({ navigation }) {
  const dispatch = useDispatch();
  const dataProfile = useSelector((state) => state.dataProfile);
  const dataLogin = useSelector((state) => state.dataLogin);

  useEffect(() => {
    dispatch(getAkun());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onLogout = () => {
    dispatch(logout());
    navigation.replace('MainApp');
  };

  return (
    <View style={styles.pages}>
      <Headers title="Akun Saya" />
      {
        !dataLogin.isLoggedIn ? (
          <NotLogin onPress={() => navigation.navigate('LoginScreen')} />
        ) : (
          <ScrollView>
            {
              dataProfile.isLoading ? (
                <Placeholder
                  Animation={Fade}
                  style={styles.photoSection}
                >
                  <PlaceholderMedia style={styles.placeholder} />
                </Placeholder>
              ) : (
                <Profile source={{ uri: dataProfile.profile?.image_url }} />
              )
            }
            <CardList type="account" name="edit" title="Ubah Akun" onPress={() => navigation.navigate('ProfileScreen')} />
            <CardList type="account" name="setting" title="Pengaturan Akun" onPress={() => navigation.navigate('PengaturanScreen')} />
            <CardList type="account" name="logout" title="Keluar" onPress={onLogout} />
            <Text style={styles.version}>
              Version
              {' '}
              {version}
            </Text>
          </ScrollView>
        )

      }
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
    fontSize: fontSize.small,
    color: colors.text.subtitle,
    marginTop: 16,
    alignSelf: 'center',
  },

  placeholder: {
    borderRadius: borderRadius.xlarge,
    width: windowWidth * 0.3,
    height: windowHeight * 0.15,
    alignSelf: 'center',
  },

  photoSection: {
    alignItems: 'center',
    marginVertical: 24,
  },
});
