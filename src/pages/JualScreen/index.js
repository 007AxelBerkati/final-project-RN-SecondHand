import {
  StyleSheet, Text, View, TouchableWithoutFeedback, Keyboard, ScrollView,
} from 'react-native';
import React from 'react';
import { Formik } from 'formik';
import { useSelector } from 'react-redux';
import {
  ButtonComponent, Gap, Headers, Input2, Select2, UploadPhoto,
} from '../../components';
import {
  borderRadius, colors, fonts, fontSize, TambahDataSchema, windowHeight,
} from '../../utils';

function JualScreen({ navigation }) {
  const stateGlobal = useSelector((state) => state.dataGlobal);
  const dataCategory = useSelector((state) => state.dataHome);

  return (
    <View style={styles.pages}>

      <Headers title="Lengkapi Detail Produk" type="back-title" onPress={() => navigation.goBack()} />
      <Formik
        initialValues={{
          namaProduk: '',
          hargaProduk: '',
          kategori_id: [],
          deskripsi: '',
        }}
        onSubmit={(values) => console.log(values)}
        validationSchema={TambahDataSchema}
      >
        {({
          handleChange, handleSubmit, errors, values, handleBlur, touched, setFieldValue, isValid,
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
                <UploadPhoto label="Foto Product" />
                <Gap height={windowHeight * 0.03} />
                <View style={styles.btnWrapper}>
                  <ButtonComponent style={styles.btnPreview} type="secondary" title="Preview" onPress={handleSubmit} disable={!(isValid) || stateGlobal.isLoading} />
                  <ButtonComponent style={styles.btnTerbitkan} title="Terbitkan" onPress={handleSubmit} disable={!(isValid) || stateGlobal.isLoading} />
                </View>
              </View>
            </TouchableWithoutFeedback>
          </ScrollView>

        )}

      </Formik>
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
