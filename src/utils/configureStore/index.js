import { combineReducers, createStore } from 'redux';
import { rootReducer } from '../../redux/store';

const initialStore = {
  data: [],
};

export function configureStore(initialState = initialStore) {
  return createStore(combineReducers(rootReducer), initialState);
}
