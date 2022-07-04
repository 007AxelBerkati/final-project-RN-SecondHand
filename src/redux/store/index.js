import AsyncStorage from '@react-native-async-storage/async-storage';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import logger from 'redux-logger';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import {
  globalReducer, loginReducer,
  registerReducer, homeReducer,
  profileReducer, jualReducer, daftarJualReducer,

} from '../reducer';
import { detailProductBuyerReducer } from '../reducer/detailProductBuyerReducer';
import { detailProductSellerReducer } from '../reducer/detailProductSellerReducer';
import { updateDetailProductSellerReducer } from '../reducer/updateDetailProductSeller';

const persistConfig = {
  key: 'root',
  // blacklist: ['dataPokemon, dataGlobal, dataPokemonDetail'],
  blacklist: ['dataGlobal, dataProfile, dataLogin, dataHome, dataJual, dataDaftarJual'],
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
};

const configPersist = persistReducer(persistConfig, combineReducers(rootReducer));

export const Store = createStore(
  configPersist,
  applyMiddleware(thunk, logger),
);

export const Persistore = persistStore(Store);
