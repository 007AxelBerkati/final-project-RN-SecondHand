import {
  StyleSheet, Text, View, TouchableWithoutFeedback, Keyboard, ScrollView,
} from 'react-native';
import React, { useEffect } from 'react';
import { Formik } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { launchImageLibrary } from 'react-native-image-picker';
import FormData from 'form-data';
import {
  ButtonComponent, Gap, Headers, Input2, NotLogin, Select2, UploadPhoto,
} from '../../components';
import {
  colors, fonts, fontSize, showError, TambahDataSchema, windowHeight,
} from '../../utils';
import { updateDetailProduct } from '../../redux';

function UpdateDetailProductScreen({ route, navigation }) {
  const { dataDetail } = route.params;

  const stateGlobal = useSelector((state) => state.dataGlobal);
  const dataCategory = useSelector((state) => state.dataHome);
  const dataLogin = useSelector((state) => state.dataLogin);

  useEffect(() => {
    console.log(dataDetail);
  }, []);
  const dispatch = useDispatch();

  const getImage = (setFieldValue) => {
    launchImageLibrary(
      {
        quality: 1,
        maxWidth: 1000,
        maxHeight: 1000,
        includeBase64: true,
      },
      (response) => {
        if (response.didCancel || response.error) {
          showError('Sepertinya anda tidak memilih fotonya');
        } else {
          const source = response?.assets[0];
          setFieldValue('image', source, true);
        }
      },
    );
  };

  const onSubmitPost = (values) => {
    const formData = new FormData();
    formData.append('name', values.namaProduk);
    formData.append('description', values.deskripsi);
    formData.append('base_price', values.hargaProduk);
    formData.append('category_ids', values.kategori_id.toString());
    formData.append('location', values.location);
    formData.append('image', {
      uri: values.image.uri ? values.image.uri : values.image,
      type: 'image/jpeg',
      name: values.image.fileName ? values.image.fileName : 'image.jpg',
    });

    dispatch(updateDetailProduct(dataDetail.id, formData, navigation));
  };

  return (
    <View style={styles.pages}>
      <Headers title="Lengkapi Detail Produk" type="back-title" onPress={() => navigation.goBack()} />
      {
          !dataLogin.isLoggedIn ? (
            <NotLogin onPress={() => navigation.navigate('LoginScreen')} />
          ) : (
            <Formik
              initialValues={{
                namaProduk: dataDetail.name,
                hargaProduk: dataDetail.base_price.toString(),
                kategori_id: dataDetail.Categories,
                location: dataDetail.location,
                deskripsi: dataDetail.description,
                image: dataDetail.image_url,
              }}
              onSubmit={(values, { resetForm }) => {
                onSubmitPost(values);
                resetForm();
              }}
              validationSchema={TambahDataSchema}
            >
              {({
                handleChange, handleSubmit, errors, values, handleBlur, touched, setFieldValue,
                isValid, dirty,
              }) => (
                <ScrollView showsVerticalScrollIndicator={false}>
                  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                    <View style={{ marginTop: 24 }}>
                      <Input2
                        label="Nama Produk"
                        placeholder="Nama Produk"
                        onChangeText={handleChange('namaProduk')}
                        value={values.namaProduk}
                        onBlur={handleBlur('namaProduk')}
                      />
                      {errors.namaProduk && touched.namaProduk
                && <Text style={styles.errorText}>{errors.namaProduk}</Text>}
                      <Gap height={15} />

                      <Input2
                        label="Harga Produk"
                        placeholder="Rp. 0,00"
                        onChangeText={handleChange('hargaProduk')}
                        value={values.hargaProduk}
                        onBlur={handleBlur('hargaProduk')}
                        keyboardType="numeric"
                      />
                      {errors.hargaProduk && touched.hargaProduk
                && <Text style={styles.errorText}>{errors.hargaProduk}</Text>}
                      <Gap height={15} />
                      <Select2
                        data={dataCategory?.category}
                        setFieldValue={setFieldValue}
                        value={values.kategori_id}
                        initialData={values.kategori_id}
                        schema={{
                          label: 'name',
                          value: 'id',
                        }}
                        multiple
                        mode="BADGE"
                        name="kategori_id"
                        placeholder="Pilih Kategori"
                      />
                      {errors.kategori_id && touched.kategori_id
                && <Text style={styles.errorText}>{errors.kategori_id}</Text>}
                      <Gap height={15} />
                      <Input2
                        label="Deskripsi"
                        placeholder="Contoh: Produk ini sangat bagus"
                        onChangeText={handleChange('deskripsi')}
                        value={values.deskripsi}
                        onBlur={handleBlur('deskripsi')}
                        multiline
                        numberOfLines={4}
                      />
                      {errors.deskripsi && touched.deskripsi
                && <Text style={styles.errorText}>{errors.deskripsi}</Text>}
                      <Gap height={16} />
                      <UploadPhoto
                        label="Foto Product"
                        source={values.image.uri ? { uri: values.image.uri }
                          : { uri: values.image }}
                        onPress={() => getImage(setFieldValue)}
                      />
                      <Gap height={windowHeight * 0.03} />
                      <ButtonComponent title="Perbarui Produk" onPress={handleSubmit} disable={!(isValid && dirty) || stateGlobal.isLoading} />
                    </View>
                  </TouchableWithoutFeedback>
                </ScrollView>
              )}
            </Formik>

          )
        }

    </View>

  );
}

export default UpdateDetailProductScreen;

const styles = StyleSheet.create({
  pages: {
    flex: 1,
    margin: 16,
  },

  errorText: {
    fontFamily: fonts.Poppins.Medium,
    color: colors.warning,
    fontSize: fontSize.small,
  },
});