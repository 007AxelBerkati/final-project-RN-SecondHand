import { getProduct, getSellerOrder } from '../../services';
import { showError } from '../../utils';
import {
  GET_ORDER_SELLER_FAIL,
  GET_ORDER_SELLER_LOADING, GET_ORDER_SELLER_SUCCESS,
  GET_PRODUCT_DIMINATI, GET_PRODUCT_TERJUAL, GET_SELLER_PRODUCT_FAIL,
  GET_SELLER_PRODUCT_LOADING, GET_SELLER_PRODUCT_SUCCESS,
} from '../types';

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
    const dataNotSold = [];
    for (let i = 0; i < response.data.length; i += 1) {
      if (response.data[i].status === 'available') {
        dataNotSold.push(response.data[i]);
      }
    }
    dispatch(getProductSellerSuccess(dataNotSold));
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

export const getDataProductDiminati = (data) => ({
  type: GET_PRODUCT_DIMINATI,
  payload: data,
});

export const getDataProductTerjual = (data) => ({
  type: GET_PRODUCT_TERJUAL,
  payload: data,
});

export const getOrderSeller = () => async (dispatch) => {
  dispatch(getOrderSellerLoading(true));
  await getSellerOrder().then((response) => {
    const dataFilterTerjual = [];
    const dataFilterDiminati = [];

    // Diminati
    const checkDataDiminati = async () => {
      for (let i = 0; i < response.data.length; i += 1) {
        if (response.data[i]?.status !== 'declined' && response.data[i]?.Product?.status !== 'seller' && response.data[i]?.Product?.status !== 'sold') {
          dataFilterDiminati.push(response.data[i]);
        }
      }
    };

    // Terjual
    const checkDataTerjual = async () => {
      for (let i = 0; i < response.data.length; i += 1) {
        if (response.data[i]?.Product?.status === 'seller' || (response.data[i]?.Product?.status === 'sold' && response.data[i]?.status === 'accepted')) {
          dataFilterTerjual.push(response.data[i]);
        }
      }
    };

    checkDataDiminati();
    checkDataTerjual();

    dispatch(getDataProductDiminati(dataFilterDiminati));
    dispatch(getDataProductTerjual(dataFilterTerjual));
    dispatch(getOrderSellerSuccess(response.data));
  }).catch((error) => {
    dispatch(getOrderSellerFail(error.response.data.message));
    showError(error.response.data.message);
  });
};
