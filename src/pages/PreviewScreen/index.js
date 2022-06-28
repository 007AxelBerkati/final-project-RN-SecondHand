import {
  SafeAreaView, ScrollView, StyleSheet, View,
  StatusBar,
  Image,
} from 'react-native';
import React from 'react';
import { moderateScale } from 'react-native-size-matters';
import {
  ButtonComponent, CardList, CardProduct, Desc, Gap,
} from '../../components';
import { keranjang } from '../../assets';
import {
  colors, fonts, fontSize, windowHeight, windowWidth,
} from '../../utils';

function PreviewScreen() {
  return (
    <SafeAreaView style={styles.pages}>
      <ScrollView>
        <StatusBar backgroundColor="transparent" translucent />
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={keranjang}
          />
          <View style={styles.btnBackContainer}>
            <ButtonComponent
              type="icon-button"
              label="BackButton"
            />
          </View>
          <View style={styles.productWrapper}>
            <CardProduct name="Jam tangan" jenis="Barang Antik" harga="10000" />
          </View>
        </View>
        <View style={styles.card}>
          <CardList
            source={keranjang}
            name="Nama Penjual"
            kota="palangka"
            type="role"
          />
        </View>
        <View style={styles.title}>
          <Desc label="Deskripsi" desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." />
        </View>
        <Gap height={60} />
      </ScrollView>
      <View style={styles.btnNego}>
        <ButtonComponent title="Terbitkan" />
      </View>

      {/* <BottomSheet
        enablePanDownToClose
        enableContentPanningGesture
        enableHandlePanningGesture
        animateOnMount
        enableOverDrag
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
      >
        <View style={styles.contentContainer}>
          <Text style={styles.titleBtmSheet}>Masukkan Harga Tawarmu</Text>
          <Gap height={moderateScale(16)} />
          <Text style={styles.descBtmSheet}>
          </Text>
          <Gap height={moderateScale(16)} />

          <View style={styles.mainCard}>
            <View style={styles.icon}>
              <FastImage
                source={stateBuyer?.productDetail?.image_url}
                style={styles.imageBtmSheet}
                resizeMode="cover"
              />
            </View>
            <View style={styles.contentText}>
              <Text style={styles.name}>{stateBuyer?.productDetail?.name}</Text>
              <Text>
                Rp
                {' '}
                {stateBuyer?.productDetail?.base_price}
              </Text>
            </View>
          </View>

          <Gap height={moderateScale(16)} />
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <BaseInput
                label="Harga Tawar"
                type="text"
                placeholder="Rp. 0,00"
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
              />
            )}
            name="bid_price"
            rules={{ required: { value: true, message: 'Silahkan Isi Penawaran' } }}
          />
          {errors?.bid_price && <Text style={styles.errors}>{errors.bid_price.message}</Text>}

          <Gap height={moderateScale(24)} />
          <BaseButton
            disable={stateBuyer?.isLoadingBid}
            isLoading={stateBuyer?.isLoadingBid}
            title="Kirim"
            onPress={handleSubmit(async (data) => await onSubmit(data))}
          />
        </View>
      </BottomSheet> */}
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

  image: {
    height: '80%',
    width: '100%',
  },
  title: {
    marginTop: -12,
  },
  card: {
    marginHorizontal: 16,
    marginBottom: 30,
    marginTop: -24,
  },
  txtTitle: {
    fontFamily: fonts.Poppins.Regular,
    fontSize: moderateScale(14),
    color: 'black',
  },
  txtCat: {
    fontFamily: fonts.Poppins.Regular,
    fontSize: moderateScale(10),
  },
  des: {
    fontFamily: fonts.Poppins.Regular,
    fontSize: moderateScale(14),
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

  container: {
    flex: 1,
    padding: moderateScale(24),
    backgroundColor: colors.background.secondary,
  },
  contentContainer: {
    flex: 1,
    padding: moderateScale(32),
  },
  titleBtmSheet: {
    fontFamily: fonts.Poppins.Medium,
    fontSize: moderateScale(14),
    color: colors.text.primary,
  },
  descBtmSheet: {
    fontFamily: fonts.Poppins.Regular,
    fontSize: moderateScale(14),
    color: colors.background.secondary,
  },

  //   Styles for Card Product
  mainCard: {
    height: moderateScale(80),
    width: '100%',
    alignItems: 'center',
    borderRadius: moderateScale(16),
    backgroundColor: 'transparent',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 1,
    flexDirection: 'row',
  },
  icon: {
    marginLeft: moderateScale(18),
  },
  name: {
    fontFamily: fonts.Poppins.Bold,
    fontSize: moderateScale(14),
    color: colors.text.primary,
  },
  contentText: {
    marginLeft: moderateScale(16),
  },
  imageBtmSheet: {
    width: moderateScale(48),
    height: moderateScale(48),
    borderRadius: moderateScale(12),
    backgroundColor: colors.background.tertiary,
  },
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  errorText: {
    fontFamily: fonts.Poppins.Medium,
    color: colors.warning,
    fontSize: fontSize.small,
  },
  productWrapper: {
    marginHorizontal: 16,
    marginTop: moderateScale(-40),
  },

});
