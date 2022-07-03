import { detailSellerOrder } from '../../services';
import { showError } from '../../utils';
import { GET_ORDER_SELLER_ID_FAIL, GET_ORDER_SELLER_ID_LOADING, GET_ORDER_SELLER_ID_SUCCESS } from '../types';

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
