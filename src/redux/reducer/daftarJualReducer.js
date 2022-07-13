import {
  GET_ORDER_SELLER_FAIL,
  GET_ORDER_SELLER_LOADING,
  GET_ORDER_SELLER_SUCCESS,
  GET_SELLER_PRODUCT_SUCCESS, GET_SELLER_PRODUCT_LOADING,
  GET_SELLER_PRODUCT_FAIL, LOGOUT,
  GET_PRODUCT_DIMINATI,
  GET_PRODUCT_TERJUAL,
} from '../types';

const initialDaftarJualState = {
  daftarJual: [],
  loading: false,
  error: null,
  isSuccess: false,
  productDiminati: [],
  productOrder: [],
  productTerjual: [],
};

export const daftarJualReducer = (state = initialDaftarJualState, action = {}) => {
  switch (action.type) {
    case GET_SELLER_PRODUCT_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case GET_SELLER_PRODUCT_SUCCESS:
      return {
        ...state,
        daftarJual: action.payload,
        loading: false,
        isSuccess: true,
        error: null,
      };
    case GET_SELLER_PRODUCT_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
        isSuccess: false,
      };

    case GET_PRODUCT_DIMINATI:
      return {
        ...state,
        productDiminati: action.payload,
      };

    case GET_PRODUCT_TERJUAL:
      return {
        ...state,
        productTerjual: action.payload,
      };

    case GET_ORDER_SELLER_SUCCESS:
      return {
        ...state,
        productOrder: action.payload,
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
      return initialDaftarJualState;

    default:
      return state;
  }
};
