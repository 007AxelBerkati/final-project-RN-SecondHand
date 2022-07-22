import React, { useCallback, useState } from 'react';
import {
  Alert, StyleSheet, Text, View,
} from 'react-native';
import { RadioButton } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import FormData from 'form-data';
import { ButtonComponent, Gap } from '../../components';
import { patchSellerProduct } from '../../redux';
import {
  colors, fonts, fontSize, windowHeight,
} from '../../utils';

function Status({
  dataInfoPenawaran, handleClosePress, navigation, setIsSubmit,
}) {
  const dispatch = useDispatch();

  const onAccept = useCallback(() => {
    const formData = new FormData();
    formData.append('status', 'seller');
    dispatch(patchSellerProduct(dataInfoPenawaran?.product_id, formData));
    handleClosePress();
    setIsSubmit(true);
  }, [dataInfoPenawaran?.product_id, dispatch]);

  const onReject = useCallback(() => {
    const formData = new FormData();
    formData.append('status', 'available');
    dispatch(patchSellerProduct(dataInfoPenawaran?.product_id, formData));
    handleClosePress();
    setIsSubmit(true);
    navigation.goBack();
  }, [dataInfoPenawaran?.product_id, dispatch]);

  const [checked, setChecked] = useState(null);
  return (
    <View style={styles.container}>
      <Gap height={16} />
      <Text style={styles.titleText}>Perbarui status penjualan produkmu</Text>
      <View style={styles.radioButtonWrapper}>
        <View style={styles.radioButton}>
          <RadioButton
            value="first"
            status={checked === 'first' ? 'checked' : 'unchecked'}
            onPress={() => setChecked('first')}
            color={colors.background.tertiary}
          />
        </View>
        <View style={styles.desc}>
          <Text style={styles.titleText}>Berhasil Terjual</Text>
          <Text style={styles.subtitle}>
            Kamu telah sepakat menjual produk ini kepada pembeli
          </Text>
        </View>
      </View>
      <View style={styles.radioButtonWrapper}>
        <View style={styles.radioButton}>
          <RadioButton
            value="second"
            status={checked === 'second' ? 'checked' : 'unchecked'}
            onPress={() => setChecked('second')}
            color={colors.background.tertiary}
          />
        </View>
        <View style={styles.desc}>
          <Text style={styles.titleText}>Batalkan Transaksi</Text>
          <Text style={styles.subtitle}>
            Kamu membatalkan transaksi produk ini dengan pembeli
          </Text>
        </View>
      </View>
      <Gap height={windowHeight * 0.04} />
      <ButtonComponent
        title="kirim"
        disable={!checked}
        onPress={() => {
          if (checked === 'first') {
            onAccept();
          }
          if (checked === 'second') {
            Alert.alert('Batalkan Transaksi', 'Apakah anda yakin ingin membatalkan transaksi ini?', [
              { text: 'Tidak', style: 'cancel' },
              {
                text: 'Ya',
                onPress: () => {
                  onReject();
                },
              },
            ], { cancelable: false });
          }
        }}
      />
    </View>
  );
}

export default Status;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 32,
  },

  titleText: {
    fontSize: fontSize.medium,
    fontFamily: fonts.Poppins.Medium,
    color: colors.text.primary,
  },

  radioButtonWrapper: {
    flexDirection: 'row',
    marginBottom: 8,
    marginTop: 24,
  },
  radioButton: {
    flex: 1,
  },

  desc: {
    flex: 7,
  },

  subtitle: {
    fontSize: fontSize.small,
    fontFamily: fonts.Poppins.Regular,
    color: colors.text.subtitle,
    marginTop: 8,
  },

});
