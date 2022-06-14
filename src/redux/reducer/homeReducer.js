import { GET_PRODUCT_FAIL, GET_PRODUCT_LOADING, GET_PRODUCT_SUCCESS } from '../types';

const initialStateHome = {
  isLoading: false,
  isSuccess: false,
  data: [],
  error: '',
};

export const homeReducer = (state = initialStateHome, action = {}) => {
  switch (action.type) {
    case GET_PRODUCT_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    case GET_PRODUCT_SUCCESS:
      return {
        ...state,
        isSuccess: true,
        isLoading: false,
        data: action.payload,
      };
    case GET_PRODUCT_FAIL:
      return {
        ...state,
        isSuccess: false,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
