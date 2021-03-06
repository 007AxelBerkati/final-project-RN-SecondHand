import { StyleSheet, View } from 'react-native';
import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import { CardList, Headers, Profile } from '../../components';

function PengaturanScreen({ navigation }) {
  const dataProfile = useSelector((state) => state.dataProfile);
  return (
    <View style={styles.pages}>
      <Headers title="Pengaturan Akun" type="back-title" onPress={() => navigation.goBack()} />
      <ScrollView>
        <Profile source={dataProfile.profile?.image_url !== null ? { uri: dataProfile.profile?.image_url } : { uri: 'https://avatars.services.sap.com/images/naushad124_small.png' }} />
        <CardList type="account" name="key" title="Ganti Password" onPress={() => navigation.navigate('ForgotPasswordScreen')} />
        <CardList type="account" name="menuunfold" title="History Transaksi" onPress={() => navigation.navigate('HistoryScreen')} />
      </ScrollView>
    </View>
  );
}

export default PengaturanScreen;

const styles = StyleSheet.create({
  pages: {
    flex: 1,
    margin: 16,
  },

  photoSection: {
    alignItems: 'center',
    marginVertical: 24,
  },
});
