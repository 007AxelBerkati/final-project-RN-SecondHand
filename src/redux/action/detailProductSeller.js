import { deleteProduct, detailProduct } from '../../services';
import { showError, showSuccess } from '../../utils';
import {
  GET_PRODUCT_SELLER_ID_SUCCESS,
  GET_PRODUCT_SELLER_ID_FAIL, DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAIL, GET_PRODUCT_SELLER_ID_LOADING,
} from '../types';
import { setLoading } from './global';

export const getSellerProductIdSuccess = (data) => ({
  type: GET_PRODUCT_SELLER_ID_SUCCESS,
  payload: data,
}
);

export const getSellerProductIdFail = (err) => ({
  type: GET_PRODUCT_SELLER_ID_FAIL,
  payload: err,
}
);

export const getSellerProductIdLoading = (data) => ({
  type: GET_PRODUCT_SELLER_ID_LOADING,
  payload: data,
}
);

export const deleteSellerProductSuccess = (data) => ({
  type: DELETE_PRODUCT_SUCCESS,
  payload: data,
}
);

export const deleteSellerProductFail = (error) => ({
  type: DELETE_PRODUCT_FAIL,
  payload: error,
}
);

export const deleteSellerProduct = (id, navigation) => async (dispatch) => {
  dispatch(setLoading(true));
  await deleteProduct(id).then((response) => {
    dispatch(deleteSellerProductSuccess(response.data));
    showSuccess('Delete product success');
    dispatch(setLoading(false));
    navigation.goBack();
  }).catch((error) => {
    dispatch(deleteSellerProductFail(error.response.data.message));
    showError(error.response.data.message);
    dispatch(setLoading(false));
  });
};

export const getSellerProductId = (id) => async (dispatch) => {
  dispatch(getSellerProductIdLoading(true));
  await detailProduct(id).then((response) => {
    dispatch(getSellerProductIdSuccess(response.data));
  }).catch((error) => {
    dispatch(getSellerProductIdFail(error));
    showError(error.response.data.message);
  });
};
