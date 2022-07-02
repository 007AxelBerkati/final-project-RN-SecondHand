import {
  SafeAreaView, ScrollView, StyleSheet, View,
  StatusBar,
} from 'react-native';
import React from 'react';
import { ImageSlider } from 'react-native-image-slider-banner';
import { useDispatch, useSelector } from 'react-redux';
import FormData from 'form-data';
import {
  ButtonComponent, CardList, CardProduct, Desc, Gap,
} from '../../components';
import {
  colors, windowHeight, windowWidth,
} from '../../utils';
import { postProduct } from '../../redux';

function PreviewScreen({ route, navigation }) {
  const { values } = route.params;

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

    dispatch(postProduct(formData, navigation));
  };

  return (
    <SafeAreaView style={styles.pages}>
      <ScrollView showsVerticalScrollIndicator>
        <StatusBar backgroundColor="transparent" translucent />
        <View style={styles.imageContainer}>
          <ImageSlider
            data={[
              { img: values.image.uri },
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
              name={values.namaProduk}
              jenis={dataCategory.category}
              idJenis={values.kategori_id}
              harga={values.hargaProduk}
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
          <Desc label="Deskripsi" desc={values.deskripsi} />
        </View>
        <Gap height={60} />
      </ScrollView>
      <View style={styles.btnNego}>
        <ButtonComponent title="Terbitkan" onPress={() => onSubmitPost(values)} />
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
    marginTop: -24,
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
    marginTop: -40,
  },

});
