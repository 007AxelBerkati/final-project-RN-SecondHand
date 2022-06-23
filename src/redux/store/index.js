import AsyncStorage from '@react-native-async-storage/async-storage';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import reduxLogger from 'redux-logger';
import { persistReducer, persistStore } from 'redux-persist';
import ReduxThunk from 'redux-thunk';
import {
  globalReducer, loginReducer, registerReducer, homeReducer, profileReducer,
} from '../reducer';

const persistConfig = {
  key: 'root',
  // blacklist: ['dataPokemon, dataGlobal, dataPokemonDetail'],
  blacklist: ['dataGlobal'],
  storage: AsyncStorage,
};

const rootReducer = {
  dataGlobal: globalReducer,
  dataLogin: loginReducer,
  dataRegister: registerReducer,
  dataHome: homeReducer,
  dataProfile: profileReducer,
};

const configPersist = persistReducer(persistConfig, combineReducers(rootReducer));

export const Store = createStore(
  configPersist,
  applyMiddleware(ReduxThunk, reduxLogger),
);

export const Persistore = persistStore(Store);
