import {
  SafeAreaView, ScrollView, StyleSheet, View,
  StatusBar, Text,
} from 'react-native';
import React, { useCallback, useMemo, useRef } from 'react';
import { ImageSlider } from 'react-native-image-slider-banner';
import BottomSheetModal from '@gorhom/bottom-sheet';
import {
  ButtonComponent, CardList, CardProduct, Desc, Gap,
} from '../../components';
import { keranjang } from '../../assets';
import {
  colors, windowHeight, windowWidth,
} from '../../utils';

function BuyerScreen() {
  const bottomSheetModalRef = useRef(null);

  // variables
  const snapPoints = useMemo(() => ['25%', '50%'], []);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSheetChanges = useCallback((index) => {
    console.log('handleSheetChanges', index);
  }, []);
  return (
    <SafeAreaView style={styles.pages}>
      <ScrollView showsVerticalScrollIndicator>
        <StatusBar backgroundColor="transparent" translucent />
        <View style={styles.imageContainer}>
          <ImageSlider
            data={[
              { img: 'https://img.freepik.com/free-vector/online-shopping-concept-illustration_114360-1084.jpg?w=1060&t=st=1655909482~exp=1655910082~hmac=17398ae027564d6d34625f5b83f8ab39616da2ea74d55677a11eb56ce8eb70bd' },
              { img: 'https://media.istockphoto.com/photos/male-outfit-set-on-white-background-closeup-top-view-picture-id1176614800?k=20&m=1176614800&s=612x612&w=0&h=uM0CkYhsM12_OYWhnO641tXqD3ZCOx61dyGZClkrv6k=' },
              { img: 'https://images.unsplash.com/photo-1479064555552-3ef4979f8908?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80' },
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
        <ButtonComponent title="saya tertarik dan ingin nego" onPress={handlePresentModalPress} />
      </View>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
      >
        <View style={styles.contentContainer}>
          <Text>Awesome 🎉</Text>
        </View>
      </BottomSheetModal>
    </SafeAreaView>
  );
}

export default BuyerScreen;

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
