import {
  SafeAreaView, ScrollView, StyleSheet, View,
  StatusBar,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { ImageSlider } from 'react-native-image-slider-banner';
import { useDispatch, useSelector } from 'react-redux';
import FormData from 'form-data';
import {
  ButtonComponent, CardList, CardProduct, Desc, Gap,
} from '../../components';
import {
  colors, windowHeight, windowWidth,
} from '../../utils';
import { postProduct, updateDetailProduct } from '../../redux';

function PreviewScreen({ route, navigation }) {
  const { values } = route.params;
  const { valuesDetail } = route.params;
  const { id } = route.params;

  const [dataDetail, setDataDetail] = useState({});

  useEffect(() => {
    if (values) {
      setDataDetail(values);
    } else if (
      valuesDetail
    ) {
      setDataDetail(valuesDetail);
    }
  }, []);

  const dataCategory = useSelector((state) => state.dataHome);
  const dataProfile = useSelector((state) => state.dataProfile.profile);

  const dispatch = useDispatch();

  const onSubmitPost = (dataValues) => {
    const formData = new FormData();
    formData.append('name', dataValues.namaProduk);
    formData.append('description', dataValues.deskripsi);
    formData.append('base_price', dataValues.hargaProduk);
    formData.append('category_ids', dataValues.kategori_id.toString());
    formData.append('location', dataValues.location);
    formData.append('image', {
      uri: dataValues.image.uri ? dataValues.image.uri : dataValues.image,
      type: 'image/jpeg',
      name: dataValues.image.fileName ? dataValues.image.fileName : 'image.jpg',
    });

    if (values) {
      dispatch(postProduct(formData, navigation));
    } else if (valuesDetail) {
      dispatch(updateDetailProduct(id, formData, navigation));
    }
  };

  return (
    <SafeAreaView style={styles.pages}>
      <ScrollView showsVerticalScrollIndicator>
        <StatusBar backgroundColor="transparent" translucent />
        <ImageSlider
          data={[
            { img: dataDetail?.image?.uri ? dataDetail.image.uri : dataDetail.image },
          ]}
          autoPlay
          timer={5000}
          closeIconColor={colors.background.primary}
          caroselImageStyle={{ height: windowHeight * 0.4 }}
          indicatorContainerStyle={{ bottom: windowHeight * 0.05 }}
          activeIndicatorStyle={{ backgroundColor: colors.background.secondary }}
        />
        <View style={styles.btnBackContainer}>
          <ButtonComponent
            type="icon-button"
            label="BackButton"
            onPress={() => navigation.goBack()}
          />
        </View>
        <View style={{ marginTop: windowHeight * -0.07 }}>
          <View style={styles.productWrapper}>
            <CardProduct
              name={dataDetail.namaProduk}
              jenis={dataCategory.category}
              idJenis={dataDetail.kategori_id}
              harga={dataDetail.hargaProduk}
            />
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
            <Desc label="Deskripsi" desc={dataDetail.deskripsi} />
          </View>
        </View>
        <Gap height={60} />
      </ScrollView>
      <View style={styles.btnNego}>
        <ButtonComponent title={values ? 'Terbitkan' : 'Update produk'} onPress={() => onSubmitPost(dataDetail)} />
      </View>
    </SafeAreaView>
  );
}

export default PreviewScreen;

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
  },

  pages: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  btnNego: {
    padding: 16,
    position: 'absolute',
    width: '100%',
    bottom: 1,
  },
  productWrapper: {
    marginHorizontal: 16,
  },
});
