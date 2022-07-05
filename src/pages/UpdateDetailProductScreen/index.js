import {
  StyleSheet, Text, View, TouchableWithoutFeedback, Keyboard, ScrollView,
} from 'react-native';
import React from 'react';
import { Formik } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import FormData from 'form-data';
import {
  ButtonComponent, Gap, Headers, Input2, Select2, UploadPhoto,
} from '../../components';
import {
  borderRadius,
  colors, fonts, fontSize, getImage, TambahDataSchema, windowHeight,
} from '../../utils';
import { updateDetailProduct } from '../../redux';

function UpdateDetailProductScreen({ route, navigation }) {
  const { dataDetail } = route.params;

  const stateGlobal = useSelector((state) => state.dataGlobal);
  const dataCategory = useSelector((state) => state.dataHome);

  const dispatch = useDispatch();

  const onSubmitPost = (values) => {
    const formData = new FormData();
    formData.append('name', values.namaProduk);
    formData.append('description', values.deskripsi);
    formData.append('base_price', parseFloat(values.hargaProduk));
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
      <View>
        <Headers title="Lengkapi Detail Produk" type="back-title" onPress={() => navigation.goBack()} />
      </View>
      <Formik
        initialValues={{
          namaProduk: dataDetail.name,
          hargaProduk: dataDetail.base_price.toString(),
          kategori_id: dataDetail.Categories?.map((item) => item.id),
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
                  onPress={() => getImage(setFieldValue, '')}
                />
                <Gap height={windowHeight * 0.03} />
                <View style={styles.btnWrapper}>
                  <ButtonComponent style={styles.btnPreview} type="secondary" title="Preview" onPress={() => navigation.navigate('PreviewScreen', { values })} disable={!(isValid && dirty) || stateGlobal.isLoading} />
                  <ButtonComponent style={styles.btnTerbitkan} title="Terbitkan" onPress={handleSubmit} disable={!(isValid && dirty) || stateGlobal.isLoading} />
                </View>
              </View>
            </TouchableWithoutFeedback>
          </ScrollView>
        )}
      </Formik>

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
  btnWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  btnPreview: {
    width: '48%',
    borderRadius: borderRadius.xlarge,
  },
  btnTerbitkan: { width: '48%' },
});
