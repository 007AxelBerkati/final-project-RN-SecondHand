import {
  addBuyerOrder, deleteBuyerOrder, detailBuyerProduct, getBuyerOrder, updateBuyerOrder,
} from '../../services';
import {
  buatChannel, cancelAllLocalNotifications, configure, kirimNotifikasi, showError, showSuccess,
} from '../../utils';
import {
  BID_PRODUCT_FAILED,
  BID_PRODUCT_SUCCESS,
  DELETE_BID_FAILED,
  DELETE_BID_SUCCESS,
  GET_ALL_BID_FAILED, GET_ALL_BID_SUCCESS,
  GET_DETAIL_PRODUCT_FAIL, GET_DETAIL_PRODUCT_LOADING,
  GET_DETAIL_PRODUCT_SUCCESS, PUT_BID_FAILED, PUT_BID_SUCCESS,
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

export const failedBid = (err) => ({
  type: BID_PRODUCT_FAILED,
  payload: err,
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
    dispatch(failedBid(err));
    dispatch(setLoading(false));
    showError(err.response.data.message);
  });
};

export const putBidSuccess = (payload) => ({
  type: PUT_BID_SUCCESS,
  payload,
}
);

export const putBidFailed = (err) => ({
  type: PUT_BID_FAILED,
  payload: err,
}
);

export const putBid = (id, payload) => async (dispatch) => {
  dispatch(setLoading(true));
  await updateBuyerOrder(id, payload).then((response) => {
    dispatch(putBidSuccess(response.data));
    dispatch(setLoading(false));

    const notifUpdateBid = () => {
      configure();
      buatChannel('1');
      cancelAllLocalNotifications();
      kirimNotifikasi('1', 'Bid', 'Update Bid Berhasil');
    };
    notifUpdateBid();
    showSuccess('Success Update Bid');
  }).catch((err) => {
    dispatch(putBidFailed(err));
    dispatch(setLoading(false));
    showError(err.response.data.message);
  });
};

export const deleteBidSuccess = (payload) => ({
  type: DELETE_BID_SUCCESS,
  payload,
}
);

export const deleteBidFailed = () => ({
  type: DELETE_BID_FAILED,
}
);

export const deleteBid = (id) => async (dispatch) => {
  dispatch(setLoading(true));
  await deleteBuyerOrder(id).then((response) => {
    dispatch(deleteBidSuccess(response.data));
    dispatch(setLoading(false));
    showSuccess('Success Delete Bid');
  }).catch((err) => {
    dispatch(deleteBidFailed());
    dispatch(setLoading(false));
    showError(err.response.data.message);
  });
};
