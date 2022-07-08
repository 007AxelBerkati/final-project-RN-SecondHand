
import {
  BID_PRODUCT_FAILED,
  BID_PRODUCT_SUCCESS,
  GET_ALL_BID_FAILED, GET_ALL_BID_SUCCESS, GET_DETAIL_PRODUCT_FAIL, GET_DETAIL_PRODUCT_SUCCESS,
} from '../types';

const initialDetailBuyerState = {
  detailBuyer: {},
  allBidProduct: [],
  bidPrice: 0,
}

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
    case BID_PRODUCT_SUCCESS:
      return {
        ...state,
        bidPrice: action.payload,
        isBid: true,
      };
    case BID_PRODUCT_FAILED:
      return {
        ...state,
      };
    default:
      return state;
  }
};

export const AllBidReducer = (state = initialDetailBuyerState, action = {}) => {
  switch (action.type) {
    case GET_ALL_BID_SUCCESS:
      return {
        ...state,
        allBidProduct: action.payload,
      };
    case GET_ALL_BID_FAILED:
      return {
        ...state,
      };
    case LOGOUT:
      return initialDetailBuyerState;
    default:
      return state;
  }
};
