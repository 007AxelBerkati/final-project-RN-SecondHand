import {
  GET_ORDER_SELLER_ID_FAIL, GET_ORDER_SELLER_ID_LOADING, GET_ORDER_SELLER_ID_SUCCESS,
  LOGOUT,
  PATCH_ORDER_SELLER_FAIL, PATCH_ORDER_SELLER_LOADING,
  PATCH_ORDER_SELLER_SUCCESS, PATCH_PRODUCT_FAIL, PATCH_PRODUCT_SUCCESS,
} from '../types';

const initialInfoPenawaranState = {
  infoPenawaran: {},
  isLoading: false,
  isSuccess: false,
  error: null,
  updateInfoPenawaran: {},
  patchProductStatus: {},
};

export const infoPenawaranReducer = (state = initialInfoPenawaranState, action = {}) => {
  switch (action.type) {
    case GET_ORDER_SELLER_ID_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case GET_ORDER_SELLER_ID_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        infoPenawaran: action.payload,
        error: null,
      };
    case GET_ORDER_SELLER_ID_FAIL:
      return {
        ...state,
        isLoading: false,
        isSuccess: false,
        error: action.payload,
      };

    case PATCH_ORDER_SELLER_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case PATCH_ORDER_SELLER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        updateInfoPenawaran: action.payload,
        error: null,
      };
    case PATCH_ORDER_SELLER_FAIL:
      return {
        ...state,
        isLoading: false,
        isSuccess: false,
        error: action.payload,
      };

    case PATCH_PRODUCT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        patchProductStatus: action.payload,
        error: null,
      };

    case PATCH_PRODUCT_FAIL:
      return {
        ...state,
        isLoading: false,
        isSuccess: false,
        error: action.payload,
      };

    case LOGOUT:
      return initialInfoPenawaranState;

    default:
      return state;
  }
};
