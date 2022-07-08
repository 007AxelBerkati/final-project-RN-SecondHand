import {
  GET_ORDER_SELLER_FAIL,
  GET_ORDER_SELLER_LOADING,
  GET_ORDER_SELLER_SUCCESS,
  GET_SELLER_PRODUCT_SUCCESS, GET_SELLER_PRODUCT_LOADING,
  GET_SELLER_PRODUCT_FAIL, LOGOUT, GET_HISTORY_SUCCESS, GET_HISTORY_LOADING, GET_HISTORY_FAIL,
} from '../types';

const initialDaftarJualState = {
  daftarJual: [],
  loading: false,
  error: null,
  isSuccess: false,
  productDiminati: [],
  productDijual: [],
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

    case GET_HISTORY_SUCCESS:
      return {
        ...state,
        productDijual: action.payload,
        loading: false,
        isSuccess: true,
        error: null,
      };

    case GET_HISTORY_LOADING:
      return {
        ...state,
        loading: action.payload,
      };

    case GET_HISTORY_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
        isSuccess: false,
      };

    case LOGOUT:
      return initialDaftarJualState;

    default:
      return state;
  }
};
