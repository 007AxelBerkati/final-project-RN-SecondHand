import { detailSellerOrder, updateSellerOrder } from '../../services';
import { showError, showSuccess } from '../../utils';
import {
  GET_ORDER_SELLER_ID_FAIL, GET_ORDER_SELLER_ID_LOADING,
  GET_ORDER_SELLER_ID_SUCCESS, PATCH_ORDER_SELLER_FAIL,
  PATCH_ORDER_SELLER_LOADING, PATCH_ORDER_SELLER_SUCCESS,
} from '../types';

export const getSellerOrderIdSuccess = (data) => ({
  type: GET_ORDER_SELLER_ID_SUCCESS,
  payload: data,
});
export const getSellerOrderIdFail = (data) => ({
  type: GET_ORDER_SELLER_ID_FAIL,
  payload: data,
});
export const getSellerOrderIdLoading = (data) => ({
  type: GET_ORDER_SELLER_ID_LOADING,
  payload: data,
});

export const getSelerOrderId = (id) => async (dispatch) => {
  dispatch(getSellerOrderIdLoading(true));
  await detailSellerOrder(id).then((response) => {
    dispatch(getSellerOrderIdSuccess(response.data));
    dispatch(getSellerOrderIdLoading(false));
  }).catch((error) => {
    dispatch(getSellerOrderIdFail(error));
    showError(error.response.data.message);
    dispatch(getSellerOrderIdLoading(false));
  });
};

// PATCH ORDER SELLER
export const patchOrderSellerSuccess = (data) => ({
  type: PATCH_ORDER_SELLER_SUCCESS,
  payload: data,
}
);

export const patchOrderSellerFail = (data) => ({
  type: PATCH_ORDER_SELLER_FAIL,
  payload: data,
}
);

export const patchOrderSellerLoading = (data) => ({
  type: PATCH_ORDER_SELLER_LOADING,
  payload: data,
}
);

export const patchOrderSeller = (id, data) => async (dispatch) => {
  dispatch(patchOrderSellerLoading(true));
  await updateSellerOrder(id, data).then((response) => {
    dispatch(patchOrderSellerSuccess(response.data));
    showSuccess('Status produk berhasil diperbaharui');
  }).catch((error) => {
    dispatch(patchOrderSellerFail(error));
    showError(error.response.data.message);
  });
};
// END PATCH ORDER SELLER
