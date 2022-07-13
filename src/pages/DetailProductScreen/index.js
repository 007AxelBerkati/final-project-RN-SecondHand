import {
  ScrollView, StyleSheet, View,
  StatusBar,
} from 'react-native';
import React, {
  useCallback, useEffect, useMemo, useRef, useState,
} from 'react';
import { ImageSlider } from 'react-native-image-slider-banner';
import { useDispatch, useSelector } from 'react-redux';
import BottomSheet from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {

  ButtonComponent, CardList, CardProduct, Desc, Gap, BackDropComponent, Loading,
} from '../../components';
import {
  colors, windowHeight, windowWidth,
} from '../../utils';

import { getAllBidProduct, getDetailProduct } from '../../redux';
import Nego from './Nego';

function DetailProductScreen({ route, navigation }) {
  const { id } = route.params;

  const dispatch = useDispatch();

  const [isAlreadyBid, setisAlreadyBid] = useState(false);

  const dataLogin = useSelector((state) => state.dataLogin);
  const dataDetailProductBuyer = useSelector((state) => state.dataDetailProductBuyer.detailBuyer);
  const { isLoading } = useSelector((state) => state.dataDetailProductBuyer);

  const dataDetailBid = useSelector((state) => state.dataDetailProductBuyer.allBidProduct
    .filter((item) => item.product_id === id));

  useEffect(() => {
    dispatch(getDetailProduct(id));
    if (dataLogin.isLoggedIn) {
      dispatch(getAllBidProduct());
    }
  }, []);

  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ['1%', '60%'], []);
  const handleSheetChanges = useCallback((index) => {
    // eslint-disable-next-line no-console
    console.log('sheet index', index);
  }, []);
  const handleOpenPress = (index) => bottomSheetRef.current?.snapToIndex(index);
  const handleClosePress = () => bottomSheetRef.current?.close();

  const checkUser = () => {
    if (!dataLogin.isLoggedIn) {
      navigation.navigate('LoginScreen');
    } else {
      handleOpenPress(1);
    }
  };

  const checkStatusBid = () => {
    if (dataDetailBid[0].status === 'pending' || isAlreadyBid) {
      return 'Menunggu respon penjual';
    }
    if (dataDetailBid[0].status === 'declined') {
      return 'Update penawaran anda';
    }
    if (dataDetailBid[0].status === 'accepted') {
      return 'Penawaran anda diterima, Silahkan tunggu dihubungi oleh penjual';
    }
    if (dataDetailBid[0]?.Product?.status === 'sold') {
      return 'Maaf, produk ini telah terjual';
    }
    return 'Belum ada penawaran';
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
            <CardProduct
              name={dataDetailProductBuyer?.name}
              jenis={dataDetailProductBuyer?.Categories}
              harga={dataDetailProductBuyer?.base_price}
            />
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
      <View style={styles.btnNego}>
        <ButtonComponent
          title={checkStatusBid()}
          onPress={() => checkUser()}
          disable={dataDetailBid[0]?.status === ('pending' || 'accepted') || isAlreadyBid
            || dataDetailBid[0]?.Product?.status === 'sold'}
        />
      </View>
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
        onChange={handleSheetChanges}
      >
        <Nego
          handleCloseSheet={handleClosePress}
          setisAlreadyBid={setisAlreadyBid}
          dataDetailBid={dataDetailBid}
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

});
