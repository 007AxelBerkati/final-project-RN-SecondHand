import {
  SafeAreaView, ScrollView, StyleSheet, View,
  StatusBar,
} from 'react-native';
import React, { useEffect, useCallback } from 'react';
import { ImageSlider } from 'react-native-image-slider-banner';
import { useDispatch, useSelector } from 'react-redux';
import {
  ButtonComponent, CardList, CardProduct, Desc, Gap,
} from '../../components';
import {
  borderRadius,
  colors, windowHeight, windowWidth,
} from '../../utils';
import { deleteSellerProduct, getSellerProductId } from '../../redux';

function DetailProductSellerScreen({ route, navigation }) {
  const { id } = route.params;

  const dataProfile = useSelector((state) => state.dataProfile.profile);
  const dataDetailProduct = useSelector((state) => state.dataDetailProductSeller
    .detailProductSeller);
  const stateGlobal = useSelector((state) => state.dataGlobal);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSellerProductId(id));
  }, [id]);

  const onDelete = useCallback(() => {
    dispatch(deleteSellerProduct(id, navigation));
  }, [dispatch, id]);

  return (
    <SafeAreaView style={styles.pages}>
      <ScrollView showsVerticalScrollIndicator>
        <StatusBar backgroundColor="transparent" translucent />
        <View style={styles.imageContainer}>
          <ImageSlider
            data={[
              { img: dataDetailProduct.image_url },
            ]}
            autoPlay
            timer={5000}
            closeIconColor={colors.background.primary}
            caroselImageStyle={{ height: windowHeight * 0.4 }}
            indicatorContainerStyle={{ bottom: windowHeight * 0.05 }}
          />
          <View style={styles.btnBackContainer}>
            <ButtonComponent
              type="icon-button"
              label="BackButton"
              onPress={() => navigation.goBack()}
            />
          </View>
          <View style={styles.productWrapper}>
            <CardProduct
              name={dataDetailProduct.name}
              jenis={dataDetailProduct.Categories}
              harga={dataDetailProduct.base_price}
            />
          </View>
        </View>
        <View style={styles.card}>
          <CardList
            source={{ uri: dataProfile.image_url }}
            name={dataProfile.full_name}
            kota={dataProfile.city}
            type="role"
          />
        </View>
        <View style={styles.title}>
          <Desc label="Deskripsi" desc={dataDetailProduct.description} />
        </View>
        <Gap height={60} />
      </ScrollView>
      <View style={styles.btnWrapper}>
        <ButtonComponent style={styles.btnPreview} type="secondary" title="Perbarui Produk" onPress={() => navigation.navigate('UpdateDetailProductScreen', { dataDetail: dataDetailProduct })} disable={stateGlobal.isLoading} />
        <ButtonComponent style={styles.btnTerbitkan} title="Hapus Produk" onPress={() => onDelete()} disable={stateGlobal.isLoading} />
      </View>
    </SafeAreaView>
  );
}

export default DetailProductSellerScreen;

const styles = StyleSheet.create({
  imageContainer: {
    height: windowHeight * 0.5,
    width: windowWidth,
  },

  btnBackContainer: {
    position: 'absolute',
    top: 44,
    left: 16,
  },

  title: {
    marginTop: -12,
  },

  card: {
    marginHorizontal: 16,
    marginBottom: 30,
    marginTop: -24,
  },

  pages: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },

  productWrapper: {
    marginHorizontal: 16,
    marginTop: -40,
  },

  btnWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    position: 'absolute',
    width: '100%',
    bottom: 1,
  },

  btnPreview: {
    width: '48%',
    borderRadius: borderRadius.xlarge,
  },
  btnTerbitkan: { width: '48%' },
});
