import {
  GET_ORDER_SELLER_FAIL,
  GET_ORDER_SELLER_LOADING,
  GET_ORDER_SELLER_SUCCESS,
  GET_PRODUCT_SELLER_FAIL, GET_PRODUCT_SELLER_LOADING, GET_PRODUCT_SELLER_SUCCESS, LOGOUT,
} from '../types';

const initialDaftarJualState = {
  daftarJual: [],
  loading: false,
  error: null,
  isSuccess: false,
  productDiminati: [],
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

    case GET_ORDER_SELLER_SUCCESS:
      return {
        ...state,
        productDiminati: action.payload,
        loading: false,
        isSuccess: true,
        error: null,
      };

    case GET_ORDER_SELLER_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
        isSuccess: false,
      };

    case GET_ORDER_SELLER_LOADING:
      return {
        ...state,
        loading: action.payload,
      };

    case LOGOUT:
      return {
        ...state,
        daftarJual: [],
        loading: false,
        isSuccess: false,
        error: null,
      };

    default:
      return state;
  }
};
