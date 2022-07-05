/* eslint-disable max-len */
import { addBuyerOrder, detailBuyerProduct } from '../../services';
import { showError } from '../../utils';
import {
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

export const getAllBidProduct = (accessToken) => async (dispatch) => {
  dispatch(setLoading(true));
  await addBuyerOrder(accessToken).then((values) => {
    dispatch(successGetBidProduct(values.data));
    dispatch(setLoading(false));
  }).catch((error) => {
    dispatch(failedGetBidProduct(error));
    showError(error.values.data.message);
    dispatch(setLoading(false));
  });
};
