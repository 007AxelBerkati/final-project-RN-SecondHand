import {
  StyleSheet, Text, View, TouchableWithoutFeedback, Keyboard, ScrollView,
} from 'react-native';
import React from 'react';
import { Formik } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import FormData from 'form-data';
import {
  ButtonComponent, Gap, Headers, Input2, NotLogin, Select2, UploadPhoto,
} from '../../components';
import {
  borderRadius, colors, fonts, fontSize, getImage, TambahDataSchema, windowHeight,
} from '../../utils';
import { postProduct } from '../../redux';

function JualScreen({ navigation }) {
  const stateGlobal = useSelector((state) => state.dataGlobal);
  const dataCategory = useSelector((state) => state.dataHome);
  const dataProfile = useSelector((state) => state.dataProfile.profile);
  const dataLogin = useSelector((state) => state.dataLogin);

  const dispatch = useDispatch();

  const onSubmitPost = (values) => {
    console.log(values.location);
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

    dispatch(postProduct(formData));
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
              namaProduk: '',
              hargaProduk: '',
              kategori_id: [],
              location: dataProfile?.city,
              deskripsi: '',
              image: '',
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
                  <View style={{ marginTop: windowHeight * 0.02 }}>
                    <Input2
                      label="Nama Produk"
                      placeholder="Nama Produk"
                      onChangeText={handleChange('namaProduk')}
                      value={values.namaProduk}
                      onBlur={handleBlur('namaProduk')}
                    />
                    {errors.namaProduk && touched.namaProduk
                      && <Text style={styles.errorText}>{errors.namaProduk}</Text>}
                    <Gap height={windowHeight * 0.01} />
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
                    <Gap height={windowHeight * 0.01} />

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
                    <Gap height={windowHeight * 0.01} />

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
                    <Gap height={windowHeight * 0.01} />

                    <UploadPhoto
                      label="Foto Product"
                      source={values.image}
                      onPress={() => getImage(setFieldValue, '')}
                    />
                    <Gap height={windowHeight * 0.02} />
                    <View style={styles.btnWrapper}>
                      <ButtonComponent style={styles.btnPreview} type="secondary" title="Preview" onPress={() => navigation.navigate('PreviewScreen', { values })} disable={!(isValid && dirty) || stateGlobal.isLoading} />
                      <ButtonComponent style={styles.btnTerbitkan} title="Terbitkan" onPress={handleSubmit} disable={!(isValid && dirty) || stateGlobal.isLoading} />
                    </View>
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

export default JualScreen;

const styles = StyleSheet.create({
  pages: {
    flex: 1,
    margin: 16,
  },
  btnWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  btnPreview: {
    width: '48%',
    borderRadius: borderRadius.xlarge,
  },
  btnTerbitkan: { width: '48%' },
  errorText: {
    fontFamily: fonts.Poppins.Medium,
    color: colors.warning,
    fontSize: fontSize.small,
  },
});
