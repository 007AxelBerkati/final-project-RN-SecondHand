import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { ButtonComponent, CardProductMatch, Gap } from '../../components';
import { colors, fonts, fontSize } from '../../utils';
import { keranjang } from '../../assets';

function Accept({ dataInfoPenawaran }) {
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>
        Yeay kamu berhasil mendapat harga yang sesuai
      </Text>
      <Text style={styles.subTitle}>
        Segera hubungi penjual melalui whatsapp untuk transaksi selanjutnya
      </Text>
      <View style={styles.productMatchWrapper}>
        <Text style={styles.textProductMatch}>
          Product Match
        </Text>
        <Gap height={16} />
        <CardProductMatch
          source={keranjang}
          city={dataInfoPenawaran?.User?.city}
          name={dataInfoPenawaran?.User?.full_name}
        />
        <Gap height={16} />

        <CardProductMatch
          source={{ uri: dataInfoPenawaran?.image_product }}
          name={dataInfoPenawaran?.product_name}
          harga={dataInfoPenawaran?.base_price}
          hargaNego={dataInfoPenawaran?.price}
        />
      </View>
      <ButtonComponent title="Hubungi via Whatsapp" icon="whatsapp" />
    </View>
  );
}

export default Accept;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 32,
  },

  titleText: {
    fontSize: fontSize.medium,
    fontFamily: fonts.Poppins.Medium,
    color: colors.text.primary,
    marginTop: 16,
    marginBottom: 8,
  },

  subTitle: {
    fontSize: fontSize.medium,
    fontFamily: fonts.Poppins.Regular,
    color: colors.text.subtitle,
    marginBottom: 16,
  },

  productMatchWrapper: {
    padding: 16,
  },

  textProductMatch: {
    fontSize: fontSize.medium,
    fontFamily: fonts.Poppins.Medium,
    color: colors.text.primary,
    alignSelf: 'center',
  },

});
