/* eslint-disable no-restricted-syntax */
import BottomSheet from '@gorhom/bottom-sheet';
import React, {
  useEffect, useMemo, useRef, useState,
} from 'react';
import {
  Alert, ScrollView, StatusBar, StyleSheet, View,
} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ImageSlider } from 'react-native-image-slider-banner';
import { useDispatch, useSelector } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import {
  BackDropComponent, ButtonComponent, CardList, CardProduct, Desc, Gap, Loading,
} from '../../components';
import {
  borderRadius,
  colors, showInfo, windowHeight, windowWidth,
} from '../../utils';

import {
  addWishlistBuyer, deleteBid, deleteWishlistBuyer,
  getAllBidProduct, getDetailProduct, getWishlistBuyer,
} from '../../redux';
import Nego from './Nego';

function DetailProductScreen({ route, navigation }) {
  const { id } = route.params;

  const dispatch = useDispatch();

  const [isAlreadyBid, setisAlreadyBid] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const dataLogin = useSelector((state) => state.dataLogin);
  const dataDetailProductBuyer = useSelector((state) => state.dataDetailProductBuyer.detailBuyer);
  const { isLoading } = useSelector((state) => state.dataDetailProductBuyer);
  const dataWishlist = useSelector((state) => state.dataWishlist.data
    .filter((item) => item.product_id === id));
  const [isBookmark, setIsBookmark] = useState(dataWishlist.length > 0);
  const { profile } = useSelector((state) => state.dataProfile);
  const dataProfile = useSelector((state) => state.dataProfile.profile);

  const dataDetailBid = useSelector((state) => state.dataDetailProductBuyer.allBidProduct
    .filter((item) => item.product_id === id));

  const isFocused = useIsFocused();

  useEffect(() => {
    dispatch(getDetailProduct(id));
  }, []);

  useEffect(() => {
    if (dataLogin.isLoggedIn) {
      dispatch(getAllBidProduct());
      dispatch(getWishlistBuyer());
    }
  }, [isSubmit, isBookmark, isFocused]);

  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ['1%', '70%'], []);

  const handleOpenPress = (index) => bottomSheetRef.current?.snapToIndex(index);
  const handleClosePress = () => bottomSheetRef.current?.close();

  const checkUser = () => {
    for (const key in dataProfile) {
      if (dataProfile[key] === null || dataProfile[key] === undefined || dataProfile[key] === '') {
        showInfo('Mohon lengkapi data profile anda');
        return;
      }
    }
    if (!dataLogin.isLoggedIn) {
      showInfo('Silahkan login terlebih dahulu');
      navigation.navigate('LoginScreen');
    } else {
      handleOpenPress(1);
    }
  };

  const deleteOrder = () => {
    dispatch(deleteBid(dataDetailBid[0]?.id));
    setisAlreadyBid(false);
    dispatch(getAllBidProduct());
  };

  const handleBookmark = () => {
    setIsBookmark(!isBookmark);
    if (isBookmark) {
      dispatch(deleteWishlistBuyer(dataWishlist[0]?.id));
    }

    if (!isBookmark) {
      dispatch(addWishlistBuyer(dataDetailProductBuyer?.id, navigation));
    }
  };

  const checkStatusBid = () => {
    if (dataDetailBid[0]?.status === 'pending' || isAlreadyBid) {
      return 'Menunggu respon penjual';
    }
    if (dataDetailBid[0]?.status === 'declined') {
      return 'Update penawaran anda';
    }
    if (dataDetailBid[0]?.status === 'accepted') {
      return 'Penawaran anda diterima, Silahkan tunggu dihubungi oleh penjual';
    }
    if (dataDetailBid[0]?.Product?.status === 'sold') {
      return 'Maaf, produk ini telah terjual';
    }
    if (profile.id === dataDetailProductBuyer?.User?.id) {
      return 'Anda tidak dapat menawar produk sendiri';
    }
    return 'Saya Tertarik dan Ingin Nego';
  };

  if (isLoading) {
    return (
      <Loading type="full" />
    );
  }

  return (
    <GestureHandlerRootView style={styles.pages}>
      <ScrollView showsVerticalScrollIndicator>
        <StatusBar backgroundColor="transparent" translucent />
        <ImageSlider
          data={[
            {
              img: dataDetailProductBuyer?.image_url,
            },
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
        <View style={{ marginTop: windowHeight * -0.07 }}>
          <View style={styles.productWrapper}>
            {
              dataLogin?.isLoggedIn ? (
                <CardProduct
                  name={dataDetailProductBuyer?.name}
                  jenis={dataDetailProductBuyer?.Categories}
                  harga={dataDetailProductBuyer?.base_price}
                  icon={isBookmark ? 'bookmark' : 'bookmark-outline'}
                  onPress={handleBookmark}
                />
              ) : (
                <CardProduct
                  name={dataDetailProductBuyer?.name}
                  jenis={dataDetailProductBuyer?.Categories}
                  harga={dataDetailProductBuyer?.base_price}
                />

              )
            }

          </View>
          <View style={styles.card}>
            <CardList
              source={{ uri: dataDetailProductBuyer?.User?.image_url }}
              name={dataDetailProductBuyer?.User?.full_name}
              kota={dataDetailProductBuyer?.User?.city}
              type="role"
            />
          </View>
          <View style={styles.title}>
            <Desc label="Deskripsi" desc={dataDetailProductBuyer?.description} />
          </View>
        </View>
        <Gap height={60} />
      </ScrollView>
      {
        dataDetailBid[0]?.status === ('pending' || 'accepted') || isAlreadyBid ? (
          <View style={styles.btnWrapper}>
            <ButtonComponent style={styles.btnPreview} type="secondary" title="Tunggu Respon" disable />
            <ButtonComponent
              style={styles.btnTerbitkan}
              title="Hapus Order"
              onPress={() => {
                Alert.alert(
                  'Hapus Order',
                  'Apakah anda yakin ingin menghapus order ini?',
                  [
                    { text: 'Tidak', style: 'cancel' },
                    { text: 'Ya', onPress: () => deleteOrder() },
                  ],
                  { cancelable: false },
                );
              }}
            />
          </View>
        ) : (
          <View style={styles.btnNego}>
            <ButtonComponent
              title={checkStatusBid()}
              onPress={() => checkUser()}
              disable={dataDetailBid[0]?.status === 'pending' || dataDetailBid[0]?.status === 'accepted' || isAlreadyBid
                || dataDetailBid[0]?.Product?.status === 'sold' || profile.id === dataDetailProductBuyer?.User?.id}
            />
          </View>
        )
      }

      <BottomSheet
        enablePanDownToClose
        enableContentPanningGesture
        enableHandlePanningGesture
        animateOnMount
        enableOverDrag
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPoints}
        backdropComponent={BackDropComponent}
      >
        <Nego
          handleCloseSheet={handleClosePress}
          setisAlreadyBid={setisAlreadyBid}
          dataDetailBid={dataDetailBid}
          setIsSubmit={setIsSubmit}
        />
      </BottomSheet>

    </GestureHandlerRootView>

  );
}

export default DetailProductScreen;

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
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: 'grey',
  },
  btnWrapper: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    position: 'absolute',
    bottom: 1,
  },

  btnPreview: {
    width: '48%',
    borderRadius: borderRadius.xlarge,
  },
  btnTerbitkan: { width: '48%' },

});
