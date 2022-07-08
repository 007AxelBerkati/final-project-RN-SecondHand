import { GET_DETAIL_PRODUCT_FAIL, GET_DETAIL_PRODUCT_SUCCESS, LOGOUT } from '../types';

const initialDetailBuyerState = {
  detailBuyer: {},
  isSuccess: false,
  error: null,
};

export const detailProductBuyerReducer = (
  state = initialDetailBuyerState,
  action = {},
) => {
  switch (action.type) {
    case GET_DETAIL_PRODUCT_SUCCESS:
      return {
        ...state,
        detailBuyer: action.payload,
        isSuccess: true,
        error: null,
      };
    case GET_DETAIL_PRODUCT_FAIL:
      return {
        ...state,
        isSuccess: false,
        error: action.payload,
      };

    case LOGOUT:
      return initialDetailBuyerState;
    default:
      return state;
  }
};
