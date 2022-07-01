import { UPDATE_PRODUCT_FAIL, UPDATE_PRODUCT_SUCCESS } from '../types';

const initialStateUpdateDetailProduct = {
  error: null,
  isSuccess: false,
};

export const updateDetailProductSellerReducer = (
  state = initialStateUpdateDetailProduct,
  action = {},
) => {
  switch (action.type) {
    case UPDATE_PRODUCT_FAIL:
      return {
        ...state,
        isSuccess: true,
        error: action.payload,
      };
    case UPDATE_PRODUCT_SUCCESS:
      return {
        ...state,
        isSuccess: false,
        error: null,
      };
    default:
      return state;
  }
};
