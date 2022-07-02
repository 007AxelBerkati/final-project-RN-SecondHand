import { getProduct, getSellerOrder } from '../../services';
import {
  GET_ORDER_SELLER_FAIL,
  GET_ORDER_SELLER_LOADING, GET_ORDER_SELLER_SUCCESS,
  GET_PRODUCT_SELLER_FAIL, GET_PRODUCT_SELLER_LOADING, GET_PRODUCT_SELLER_SUCCESS,
} from '../types';
import { showError } from '../../utils';

// PRODUCT SELLER

export const getProductSellerSuccess = (data) => ({
  type: GET_PRODUCT_SELLER_SUCCESS,
  payload: data,
});

export const getProductSellerFail = (error) => ({
  type: GET_PRODUCT_SELLER_FAIL,
  payload: error,
});

export const getProductSellerLoading = (data) => ({
  type: GET_PRODUCT_SELLER_LOADING,
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
