import {
  DELETE_PRODUCT_FAIL, DELETE_PRODUCT_SUCCESS,
  GET_PRODUCT_SELLER_ID_FAIL, GET_PRODUCT_SELLER_ID_SUCCESS, LOGOUT,
} from '../types';

const initialDetailProductSellerState = {
  detailProductSeller: {},
  detailSuccessDelete: {},
  isSuccess: false,
  error: null,
};

export const detailProductSellerReducer = (
  state = initialDetailProductSellerState,
  action = {},
) => {
  switch (action.type) {
    case GET_PRODUCT_SELLER_ID_SUCCESS:
      return {
        ...state,
        detailProductSeller: action.payload,
        isSuccess: true,
        error: null,
      };
    case GET_PRODUCT_SELLER_ID_FAIL:
      return {
        ...state,
        isSuccess: false,
        error: action.payload,
      };

    case DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
        isSuccess: true,
        error: null,
        detailSuccessDelete: action.payload,
      };

    case DELETE_PRODUCT_FAIL:
      return {
        ...state,
        isSuccess: false,
        error: action.payload,
      };
    case LOGOUT:
      return initialDetailProductSellerState;

    default:
      return state;
  }
};
