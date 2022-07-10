/* eslint-disable max-len */
import { addBuyerOrder, detailBuyerProduct, getBuyerOrder } from '../../services';
import { showError, showSuccess } from '../../utils';
import {
  BID_PRODUCT_FAILED,
  BID_PRODUCT_SUCCESS,
  GET_ALL_BID_FAILED, GET_ALL_BID_SUCCESS, GET_DETAIL_PRODUCT_FAIL, GET_DETAIL_PRODUCT_SUCCESS,
} from '../types';
import { setLoading } from './global';

export const getDetailProductSuccess = (data) => ({
  type: GET_DETAIL_PRODUCT_SUCCESS,
  payload: data,
}
);

export const getDetailProductFail = (err) => ({
  type: GET_DETAIL_PRODUCT_FAIL,
  payload: err,
}
);

export const successGetBidProduct = (value) => ({
  type: GET_ALL_BID_SUCCESS,
  payload: value,
});

export const failedGetBidProduct = (err) => ({
  type: GET_ALL_BID_FAILED,
  payload: err,
});

export const successBid = (payload) => ({
  type: BID_PRODUCT_SUCCESS,
  payload,
});

export const failedBid = () => ({
  type: BID_PRODUCT_FAILED,
});
export const getDetailProduct = (id) => async (dispatch) => {
  dispatch(setLoading(true));
  await detailBuyerProduct(id).then((response) => {
    dispatch(getDetailProductSuccess(response.data));
    dispatch(setLoading(false));
  }).catch((error) => {
    dispatch(getDetailProductFail(error));
    showError(error.response.data.message);
    dispatch(setLoading(false));
  });
};

export const getAllBidProduct = () => async (dispatch) => {
  dispatch(setLoading(true));
  await getBuyerOrder().then((values) => {
    dispatch(successGetBidProduct(values.data));
    dispatch(setLoading(false));
  }).catch((error) => {
    dispatch(failedGetBidProduct(error));
    showError(error.values.data.message);
    dispatch(setLoading(false));
  });
};

export const bidProduct = (payload) => async (dispatch) => {
  dispatch(setLoading(true));
  await addBuyerOrder(payload).then((response) => {
    dispatch(successBid(response.data));
    dispatch(setLoading(false));
    showSuccess('Success menawar produk');
  }).catch((err) => {
    dispatch(failedBid(err));
    dispatch(setLoading(false));
    showError(err.response.data.message);
  });
};
