import { getHistory, getProduct, getSellerOrder } from '../../services';
import {
  GET_HISTORY_FAIL,
  GET_HISTORY_LOADING,
  GET_HISTORY_SUCCESS,
  GET_ORDER_SELLER_FAIL,
  GET_ORDER_SELLER_LOADING, GET_ORDER_SELLER_SUCCESS,
  GET_SELLER_PRODUCT_SUCCESS, GET_SELLER_PRODUCT_FAIL, GET_SELLER_PRODUCT_LOADING,
} from '../types';
import { showError } from '../../utils';

// PRODUCT SELLER

export const getProductSellerSuccess = (data) => ({
  type: GET_SELLER_PRODUCT_SUCCESS,
  payload: data,
});

export const getProductSellerFail = (error) => ({
  type: GET_SELLER_PRODUCT_FAIL,
  payload: error,
});

export const getProductSellerLoading = (data) => ({
  type: GET_SELLER_PRODUCT_LOADING,
  payload: data,
});

export const getProductSeller = () => async (dispatch) => {
  dispatch(getProductSellerLoading(true));
  await getProduct().then((response) => {
    dispatch(getProductSellerSuccess(response.data));
  }).catch((error) => {
    dispatch(getProductSellerFail(error.response.data.message));
  });
};

// FAVORITE PRODUCT

export const getOrderSellerSuccess = (data) => ({
  type: GET_ORDER_SELLER_SUCCESS,
  payload: data,
});

export const getOrderSellerFail = (error) => ({
  type: GET_ORDER_SELLER_FAIL,
  payload: error,
});

export const getOrderSellerLoading = (data) => ({
  type: GET_ORDER_SELLER_LOADING,
  payload: data,
});

export const getOrderSeller = () => async (dispatch) => {
  dispatch(getOrderSellerLoading(true));
  await getSellerOrder().then((response) => {
    dispatch(getOrderSellerSuccess(response.data));
  }).catch((error) => {
    dispatch(getOrderSellerFail(error.response.data.message));
    showError(error.response.data.message);
  });
};

// TERJUAL PRODUCT

export const getHistorySuccess = (data) => ({
  type: GET_HISTORY_SUCCESS,
  payload: data,
});

export const getHistoryFail = (error) => ({
  type: GET_HISTORY_FAIL,
  payload: error,
});

export const getHistoryLoading = (data) => ({
  type: GET_HISTORY_LOADING,
  payload: data,
});

export const getProductSell = () => async (dispatch) => {
  dispatch(getHistoryLoading(true));
  await getHistory().then((response) => {
    dispatch(getHistorySuccess(response.data));
  }).catch((error) => {
    dispatch(getHistoryFail(error.response.data.message));
    showError(error.response.data.message);
  });
};
