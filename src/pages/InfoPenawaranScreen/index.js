import {
  StyleSheet, Text, View,
  StatusBar,
} from 'react-native';
import React, {
  useCallback, useEffect, useMemo, useRef,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';
import BottomSheet from '@gorhom/bottom-sheet';
import {
  Headers, CardList, ButtonComponent, BackDropComponent,
} from '../../components';
import {
  fonts, colors, borderRadius, fontSize,
} from '../../utils';
import { keranjang } from '../../assets';
import { getSelerOrderId } from '../../redux';
import Accept from './Accept';

function InfoPenawaranScreen({ navigation, route }) {
  const { id } = route.params;

  const dispatch = useDispatch();

  const dataInfoPenawaran = useSelector((state) => state.dataInfoPenawaran.infoPenawaran);

  useEffect(() => {
    dispatch(getSelerOrderId(id));
  }, []);

  const bottomSheetRef = useRef(null);

  // handle bottom sheet
  const snapPoints = useMemo(() => ['1%', '60%'], []);
  const handleSheetChanges = useCallback((index) => {
    console.log('sheet index', index);
  }, []);
  const handleClosePress = () => bottomSheetRef.current?.close();
  const handleOpenPress = (index) => bottomSheetRef.current?.snapToIndex(index);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ScrollView style={{ margin: 16 }}>
        <StatusBar backgroundColor="transparent" translucent />
        <Headers type="back-title" onPress={() => navigation.goBack()} title="Info Penawar" />
        <View style={{ marginHorizontal: 3 }}>
          <CardList
            type="role"
            source={keranjang}
            style={styles.bgProduk}
            name={dataInfoPenawaran?.User?.full_name}
            kota={dataInfoPenawaran?.User?.city}
          />
        </View>

        <Text style={styles.Detail}>Daftar Produkmu yang Ditawar</Text>

        <CardList source={{ uri: dataInfoPenawaran?.image_product }} title="penawaran produk" date={dataInfoPenawaran?.updatedAt} name={dataInfoPenawaran?.product_name} harga={dataInfoPenawaran?.base_price} hargaNego={dataInfoPenawaran?.price} />

        <View style={styles.btnWrapper}>
          <ButtonComponent style={styles.btnTolak} type="secondary" title="Tolak" />
          <ButtonComponent style={styles.btnTerima} title="Terima" onPress={() => handleOpenPress(1)} />
        </View>
      </ScrollView>
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
        <Accept dataInfoPenawaran={dataInfoPenawaran} />
      </BottomSheet>
    </GestureHandlerRootView>

  );
}

export default InfoPenawaranScreen;

const styles = StyleSheet.create({
  Info: {
    fontFamily: fonts.Poppins.Bold,
  },
  Detail: {
    fontFamily: fonts.Poppins.Bold,
    color: colors.background.black,
    marginTop: 24,
    fontSize: fontSize.medium,
  },
  btnWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },

  btnTolak: {
    width: '48%',
    borderRadius: borderRadius.xlarge,
  },
  btnTerima: { width: '48%' },
});
