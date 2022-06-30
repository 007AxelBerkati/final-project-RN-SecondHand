import { GET_PRODUCT_SELLER_FAIL, GET_PRODUCT_SELLER_LOADING, GET_PRODUCT_SELLER_SUCCESS } from '../types';

const initialDaftarJualState = {
  daftarJual: [],
  loading: false,
  error: null,
  isSuccess: false,
};

export const daftarJualReducer = (state = initialDaftarJualState, action = {}) => {
  switch (action.type) {
    case GET_PRODUCT_SELLER_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case GET_PRODUCT_SELLER_SUCCESS:
      return {
        ...state,
        daftarJual: action.payload,
        loading: false,
        isSuccess: true,
        error: null,
      };
    case GET_PRODUCT_SELLER_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
        isSuccess: false,
      };
    default:
      return state;
  }
};
