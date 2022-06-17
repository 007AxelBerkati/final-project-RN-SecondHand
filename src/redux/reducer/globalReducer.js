import { SET_LOADING } from '../types';

const initialState = {
  isLoading: false,
};

export const globalReducer = (state = initialState, action = {}) => {
  if (action.type === SET_LOADING) {
    return {
      ...state,
      isLoading: action.loading,
    };
  }
  return state;
};
