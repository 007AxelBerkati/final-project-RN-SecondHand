import BottomSheet from '@gorhom/bottom-sheet';
import React, {
  useCallback, useEffect, useMemo, useRef, useState,
} from 'react';
import {
  Alert, Linking, StatusBar, StyleSheet, Text, View,
} from 'react-native';
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import {
  BackDropComponent, ButtonComponent, CardList, Headers,
} from '../../components';
import { getSelerOrderId, patchOrderSeller } from '../../redux';
import {
  borderRadius, colors, fonts, fontSize,
} from '../../utils';
import Accept from './Accept';
import Status from './Status';

function InfoPenawaranScreen({ navigation, route }) {
  const { id } = route.params;

  const dispatch = useDispatch();

  const dataInfoPenawaran = useSelector((state) => state.dataInfoPenawaran.infoPenawaran);

  const [isSubmit, setIsSubmit] = useState(false);

  const [isAlreadyAccepted, setIsAlreadyAccepted] = useState(false);
  const [bottomSheetRender, setBottomSheetRender] = useState('');
  useEffect(() => {
    dispatch(getSelerOrderId(id));
  }, [isSubmit]);

  // handle bottom sheet
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ['1%', '60%'], []);

  const handleClosePress = () => bottomSheetRef.current?.close();
  const handleOpenPress = (index) => bottomSheetRef.current?.snapToIndex(index);
  // end handle bottom sheet

  const onAccept = useCallback((idOrder) => {
    dispatch(patchOrderSeller(idOrder, { status: 'accepted' }));
    setBottomSheetRender('hubungi');
    setIsAlreadyAccepted(true);
    handleOpenPress(1);
  }, [dispatch]);

  const onReject = useCallback((idOrder) => {
    dispatch(patchOrderSeller(idOrder, { status: 'declined' }));
    navigation.goBack();
  }, [dispatch]);

  const onHubungi = () => {
    Linking.openURL(`https://wa.me/62${dataInfoPenawaran?.User?.phone_number}`);
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ScrollView style={{ margin: 16 }}>
        <StatusBar backgroundColor="transparent" translucent />
        <Headers type="back-title" onPress={() => navigation.goBack()} title="Info Penawar" />
        <View style={{ marginHorizontal: 3 }}>
          <CardList
            type="role"
            source={{ uri: dataInfoPenawaran?.User?.image_url }}
            style={styles.bgProduk}
            name={dataInfoPenawaran?.User?.full_name}
            kota={dataInfoPenawaran?.User?.city}
          />
        </View>

        <Text style={styles.Detail}>Daftar Produkmu yang Ditawar</Text>

        {
          dataInfoPenawaran?.Product?.status !== 'seller' && (
            <CardList
              source={{ uri: dataInfoPenawaran?.image_product !== null ? dataInfoPenawaran?.image_product : 'https://avatars.services.sap.com/images/naushad124_small.png' }}
              title="penawaran produk"
              date={dataInfoPenawaran?.updatedAt}
              name={dataInfoPenawaran?.product_name}
              harga={dataInfoPenawaran?.base_price}
              hargaNego={dataInfoPenawaran?.price}
            />
          )
        }
        {
          dataInfoPenawaran?.Product?.status !== 'seller' && (
            <View>
              {
                dataInfoPenawaran?.status === 'pending' && !isAlreadyAccepted ? (
                  <View style={styles.btnWrapper}>
                    <ButtonComponent
                      style={styles.btnTolak}
                      type="secondary"
                      title="Tolak"
                      onPress={() => {
                        Alert.alert(
                          'Tolak Penawaran',
                          'Apakah anda yakin ingin menolak penawaran ini?',
                          [
                            { text: 'Tidak', style: 'cancel' },
                            { text: 'Ya', onPress: () => onReject(dataInfoPenawaran?.id) },
                          ],
                        );
                      }}
                    />
                    <ButtonComponent
                      style={styles.btnTerima}
                      title="Terima"
                      onPress={() => {
                        Alert.alert(
                          'Terima Penawaran',
                          'Apakah anda yakin ingin menerima penawaran ini?',
                          [
                            { text: 'Tidak', style: 'cancel' },
                            { text: 'Ya', onPress: () => { onAccept(dataInfoPenawaran?.id); } },
                          ],
                        );
                      }}
                    />
                  </View>

                )
                  : (
                    <View style={styles.btnWrapper}>
                      <ButtonComponent
                        style={styles.btnTolak}
                        type="secondary"
                        title="Status"
                        onPress={() => {
                          setBottomSheetRender('status');
                          handleOpenPress(1);
                        }}
                      />
                      <ButtonComponent
                        style={styles.btnTerima}
                        title="Hubungi"
                        onPress={() => {
                          setBottomSheetRender('hubungi');
                          handleOpenPress(1);
                        }}
                        icon="whatsapp"
                      />
                    </View>
                  )
              }
            </View>
          )
        }

        {
          dataInfoPenawaran?.Product?.status === 'seller'
            ? (
              <CardList
                source={{ uri: dataInfoPenawaran?.image_product }}
                title="Berhasil Terjual"
                date={dataInfoPenawaran?.updatedAt}
                name={dataInfoPenawaran?.product_name}
                harga={dataInfoPenawaran?.base_price}
                hargaNego={dataInfoPenawaran?.price}
              />
            ) : null
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
        snapPoints={snapPoints}
        backdropComponent={BackDropComponent}
      >
        {
          bottomSheetRender === 'status' ? (
            <Status
              dataInfoPenawaran={dataInfoPenawaran}
              handleClosePress={handleClosePress}
              navigation={navigation}
              setIsSubmit={setIsSubmit}
            />
          ) : (
            <Accept dataInfoPenawaran={dataInfoPenawaran} onPress={() => onHubungi()} />
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
