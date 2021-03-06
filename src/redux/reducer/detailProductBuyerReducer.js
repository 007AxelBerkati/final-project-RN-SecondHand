import {
  BID_PRODUCT_FAILED,
  BID_PRODUCT_SUCCESS,
  DELETE_BID_FAILED,
  DELETE_BID_SUCCESS,
  GET_ALL_BID_FAILED, GET_ALL_BID_SUCCESS,
  GET_DETAIL_PRODUCT_FAIL, GET_DETAIL_PRODUCT_LOADING,
  GET_DETAIL_PRODUCT_SUCCESS, LOGOUT,
  PUT_BID_FAILED, PUT_BID_SUCCESS,
} from '../types';

const initialDetailBuyerState = {
  detailBuyer: {},
  allBidProduct: [],
  isLoading: false,
  putBid: {},
  deleteBid: {},
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
        isLoading: false,
      };
    case GET_DETAIL_PRODUCT_FAIL:
      return {
        ...state,
        isSuccess: false,
        error: action.payload,
        isLoading: false,
      };

    case GET_DETAIL_PRODUCT_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };

    case BID_PRODUCT_SUCCESS:
      return {
        ...state,
        bidPrice: action.payload,
        isBid: true,
        error: null,
      };
    case BID_PRODUCT_FAILED:
      return {
        ...state,
        error: action.payload,
      };
    case GET_ALL_BID_SUCCESS:
      return {
        ...state,
        allBidProduct: action.payload,
        error: null,
      };
    case GET_ALL_BID_FAILED:
      return {
        ...state,
        error: action.payload,
      };

    case PUT_BID_SUCCESS:
      return {
        ...state,
        putBid: action.payload,
        error: null,
      };

    case PUT_BID_FAILED:
      return {
        ...state,
        error: action.payload,
      };

    case DELETE_BID_SUCCESS:
      return {
        ...state,
        deleteBid: action.payload,
        error: null,
      };

    case DELETE_BID_FAILED:
      return {
        ...state,
        error: action.payload,
      };

    case LOGOUT:
      return initialDetailBuyerState;
    default:
      return state;
  }
};
