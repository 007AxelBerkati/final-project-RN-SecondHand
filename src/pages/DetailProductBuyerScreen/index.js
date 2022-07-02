import {
  SafeAreaView, ScrollView, StyleSheet, View,
  StatusBar,
  Text,
} from 'react-native';
import React, {
  useCallback, useEffect, useMemo, useRef,
} from 'react';
import { ImageSlider } from 'react-native-image-slider-banner';
import { useDispatch, useSelector } from 'react-redux';
import BottomSheet from '@gorhom/bottom-sheet';
import {
  BackDropComponent,
  ButtonComponent, CardList, CardProduct, Desc, Gap,
} from '../../components';
import {
  colors, windowHeight, windowWidth,
} from '../../utils';
import { getDetailProduct } from '../../redux';

function DetailProductBuyerScreen({ route, navigation }) {
  const { id } = route.params;

  const dataDetailProductBuyer = useSelector((state) => state.dataDetailProductBuyer.detailBuyer);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDetailProduct(id));
  }, []);

  const bottomSheetRef = useRef(null);

  //   variables
  const snapPoints = useMemo(() => ['1%', '70%'], []);

  // callbacks
  const handleSheetChanges = useCallback((index) => {
    console.log('sheet index', index);
  }, []);

  const handleOpenPress = () => bottomSheetRef.current?.expand();

  const render = () => (
    <View style={styles.contentContainer}>
      <Text>Awesome 🎉</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.pages}>
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
        <ButtonComponent title="Saya tertarik dan ingin nego" onPress={() => handleOpenPress()} />
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
        {render}
      </BottomSheet>

    </SafeAreaView>

  );
}

export default DetailProductBuyerScreen;

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

  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: 'grey',
  },

});
