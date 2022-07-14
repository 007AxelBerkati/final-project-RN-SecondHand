import {
  Alert, StyleSheet, Text, View,
} from 'react-native';
import React, { useState, useCallback } from 'react';
import { RadioButton } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import {
  colors, fonts, fontSize, windowHeight,
} from '../../utils';
import { ButtonComponent, Gap } from '../../components';
import { patchOrderSeller } from '../../redux';

function Status({ idOrder, handleClosePress }) {
  const dispatch = useDispatch();
  const onAccept = useCallback(() => {
    dispatch(patchOrderSeller(idOrder, { status: 'accepted' }));
  }, [dispatch]);

  const onReject = useCallback(() => {
    dispatch(patchOrderSeller(idOrder, { status: 'declined' }));
  }, [dispatch]);

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
            Kamu telah sepakat menjual produk ini kepada pembeli
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
            handleClosePress();
          }
          if (checked === 'second') {
            Alert.alert('Batalkan Transaksi', 'Apakah anda yakin ingin membatalkan transaksi ini?', [
              { text: 'Tidak', style: 'cancel' },
              {
                text: 'Ya',
                onPress: () => {
                  onReject();
                  handleClosePress();
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
