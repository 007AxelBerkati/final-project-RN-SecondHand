import AsyncStorage from '@react-native-async-storage/async-storage';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import logger from 'redux-logger';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import {
  globalReducer, loginReducer,
  registerReducer, homeReducer,
  profileReducer, jualReducer, daftarJualReducer,
  detailProductSellerReducer, updateDetailProductSellerReducer,
  detailProductBuyerReducer, infoPenawaranReducer, notifikasiReducer, gantiPassReducer,
} from '../reducer';

const persistConfig = {
  key: 'root',
  // blacklist: ['dataPokemon, dataGlobal, dataPokemonDetail'],
  // blacklist: ['dataGlobal, dataProfile, dataLogin, dataHome, dataJual, dataDaftarJual'],
  Whitelist: ['dataLogin'],
  storage: AsyncStorage,
};

const rootReducer = {
  dataGlobal: globalReducer,
  dataLogin: loginReducer,
  dataRegister: registerReducer,
  dataHome: homeReducer,
  dataProfile: profileReducer,
  dataJual: jualReducer,
  dataDaftarJual: daftarJualReducer,
  dataDetailProductSeller: detailProductSellerReducer,
  dataUpdateDetailProductSeller: updateDetailProductSellerReducer,
  dataDetailProductBuyer: detailProductBuyerReducer,
  dataInfoPenawaran: infoPenawaranReducer,
  dataNotifikasi: notifikasiReducer,
  dataGantiPass: gantiPassReducer,
};

const configPersist = persistReducer(persistConfig, combineReducers(rootReducer));

export const Store = createStore(
  configPersist,
  applyMiddleware(thunk, logger),
);

export const Persistore = persistStore(Store);
