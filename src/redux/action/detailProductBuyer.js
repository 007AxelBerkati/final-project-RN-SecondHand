/* eslint-disable max-len */
import { addBuyerOrder, detailBuyerProduct, getBuyerOrder } from '../../services';
import {
  buatChannel, cancelAllLocalNotifications, configure, kirimNotifikasi, showError, showSuccess,
} from '../../utils';
import {
  BID_PRODUCT_FAILED,
  BID_PRODUCT_SUCCESS,
  GET_ALL_BID_FAILED, GET_ALL_BID_SUCCESS, GET_DETAIL_PRODUCT_FAIL, GET_DETAIL_PRODUCT_LOADING, GET_DETAIL_PRODUCT_SUCCESS,
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

export const getDetailProductLoading = (data) => ({
  type: GET_DETAIL_PRODUCT_LOADING,
  payload: data,
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
  dispatch(getDetailProductLoading(true));
  await detailBuyerProduct(id).then((response) => {
    dispatch(getDetailProductSuccess(response.data));
  }).catch((error) => {
    dispatch(getDetailProductFail(error));
    showError(error.response.data.message);
  });
};

export const getAllBidProduct = () => async (dispatch) => {
  await getBuyerOrder().then((values) => {
    dispatch(successGetBidProduct(values.data));
  }).catch((error) => {
    dispatch(failedGetBidProduct(error));
    showError(error.values.data.message);
  });
};

export const bidProduct = (payload) => async (dispatch) => {
  dispatch(setLoading(true));
  await addBuyerOrder(payload).then((response) => {
    const notifBid = () => {
      configure();
      buatChannel('1');
      cancelAllLocalNotifications();
      kirimNotifikasi('1', 'Bid', 'Bid Berhasil');
    };

    notifBid();
    dispatch(successBid(response.data));
    dispatch(setLoading(false));
    showSuccess('Success menawar produk');
  }).catch((err) => {
    dispatch(failedBid());
    dispatch(setLoading(false));
    showError(err.response.data.message);
  });
};
