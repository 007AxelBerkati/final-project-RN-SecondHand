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
import { getSelerOrderId, patchOrderSeller } from '../../redux';
import Accept from './Accept';
import Status from './Status';

function InfoPenawaranScreen({ navigation, route }) {
  const { id } = route.params;

  const dispatch = useDispatch();

  const dataInfoPenawaran = useSelector((state) => state.dataInfoPenawaran.infoPenawaran);

  useEffect(() => {
    dispatch(getSelerOrderId(id));
  }, []);

  // handle bottom sheet
  const bottomSheetRef = useRef(null);
  const snapPointsAccept = useMemo(() => ['1%', '60%'], []);
  const snapPointsStatus = useMemo(() => ['1%', '50%'], []);
  const handleSheetChanges = useCallback((index) => {
    console.log('sheet index', index);
  }, []);
  const handleClosePress = () => bottomSheetRef.current?.close();
  const handleOpenPress = (index) => bottomSheetRef.current?.snapToIndex(index);
  // end handle bottom sheet

  const onAccept = useCallback((idOrder) => {
    dispatch(patchOrderSeller(idOrder, { status: 'accepted' }));
    handleOpenPress(1);
  }, [dispatch]);

  const onReject = useCallback((idOrder) => {
    dispatch(patchOrderSeller(idOrder, { status: 'declined' }));
  }, [dispatch]);

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

        <CardList
          source={{ uri: dataInfoPenawaran?.image_product }}
          title="penawaran produk"
          date={dataInfoPenawaran?.updatedAt}
          name={dataInfoPenawaran?.product_name}
          harga={dataInfoPenawaran?.base_price}
          hargaNego={dataInfoPenawaran?.price}
        />
        {
          dataInfoPenawaran?.status === 'pending' && (
            <View style={styles.btnWrapper}>
              <ButtonComponent style={styles.btnTolak} type="secondary" title="Tolak" onPress={() => onReject(dataInfoPenawaran?.id)} />
              <ButtonComponent style={styles.btnTerima} title="Terima" onPress={() => onAccept(dataInfoPenawaran?.id)} />
            </View>

          )
        }
        {
          dataInfoPenawaran?.status === 'accepted' && (
            <View style={styles.btnWrapper}>
              <ButtonComponent style={styles.btnTolak} type="secondary" title="Status" onPress={() => handleOpenPress(1)} />
              <ButtonComponent style={styles.btnTerima} title="Hubungi" onPress={() => { }} icon="whatsapp" />
            </View>
          )
        }

        {
          dataInfoPenawaran?.status === ('declined' || 'accepted') && (
            <CardList
              source={{ uri: dataInfoPenawaran?.image_product }}
              title={dataInfoPenawaran?.status === 'accepted' ? 'Berhasil Terjual' : 'Penawaran Anda Ditolak'}
              date={dataInfoPenawaran?.updatedAt}
              name={dataInfoPenawaran?.product_name}
              harga={dataInfoPenawaran?.base_price}
              hargaNego={dataInfoPenawaran?.price}
            />
          )
        }
      </ScrollView>
      <BottomSheet
        enablePanDownToClose
        enableContentPanningGesture
        enableHandlePanningGesture
        animateOnMount
        enableOverDrag
        ref={bottomSheetRef}
        index={0}
        snapPoints={dataInfoPenawaran?.status === 'pending' ? snapPointsAccept : snapPointsStatus}
        backdropComponent={BackDropComponent}
        onChange={handleSheetChanges}
      >
        {
          dataInfoPenawaran?.status === 'pending' ? (
            <Accept dataInfoPenawaran={dataInfoPenawaran} />
          ) : (
            <Status idOrder={dataInfoPenawaran?.id} handleClosePress={handleClosePress} />
          )

        }
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
