import {
  ScrollView, StyleSheet, View,
  StatusBar,
} from 'react-native';
import React, {
  useCallback, useEffect, useMemo, useRef,
} from 'react';
import { ImageSlider } from 'react-native-image-slider-banner';
import { useDispatch, useSelector } from 'react-redux';
import BottomSheet from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {
  ButtonComponent, CardList, CardProduct, Desc, Gap,
} from '../../components';
import {
  colors, windowHeight, windowWidth,
} from '../../utils';
import {} from '../../redux';

import BackDropComponent from '../../components/molekuls/BackDropSomponent';
import { getDetailProduct } from '../../redux/action/detailProductBuyer';
import Nego from './Nego';

function DetailProductScreen({ route, navigation }) {
  const { id } = route.params;

  const dataDetailProductBuyer = useSelector((state) => state.dataDetailProductBuyer.detailBuyer);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDetailProduct(id));

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const bottomSheetRef = useRef(null);

  //   variables
  const snapPoints = useMemo(() => ['1%', '60%'], []);

  // callbacks
  const handleSheetChanges = useCallback((index) => {
    // eslint-disable-next-line no-console
    console.log('sheet index', index);
  }, []);

  const handleClosePress = () => bottomSheetRef.current?.close();

  const handleOpenPress = (index) => bottomSheetRef.current?.snapToIndex(index);

  return (
    <GestureHandlerRootView style={styles.pages}>
      <ScrollView showsVerticalScrollIndicator>

        <StatusBar backgroundColor="transparent" translucent />
        <View style={styles.imageContainer}>
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
          <View style={styles.productWrapper}>
            <CardProduct
              name={dataDetailProductBuyer?.name}
              jenis={dataDetailProductBuyer?.Categories}
              harga={dataDetailProductBuyer?.base_price}
            />
          </View>
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
        <Gap height={60} />
      </ScrollView>
      <View style={styles.btnNego}>
        <ButtonComponent title="Saya tertarik dan ingin nego" onPress={() => handleOpenPress(1)} />
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
        onClose={() => handleClosePress()}
      >
        <Nego />
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
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: 'grey',
  },

});
