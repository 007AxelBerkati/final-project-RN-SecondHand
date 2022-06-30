import { ADD_PRODUCT_FAIL, ADD_PRODUCT_LOADING, ADD_PRODUCT_SUCCESS } from '../types';

const initialJualState = {
  jual: [],
  isLoading: false,
  isSuccess: false,
};

export const jualReducer = (state = initialJualState, action = {}) => {
  switch (action.type) {
    case ADD_PRODUCT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        jual: action.payload,
      };

    case ADD_PRODUCT_LOADING:
      return {
        ...state,
        isLoading: true,
      };

    case ADD_PRODUCT_FAIL:
      return {
        ...state,
        isLoading: false,
        isSuccess: false,
      };

    default:
      return state;
  }
};
