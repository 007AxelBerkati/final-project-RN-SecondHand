import { showError, showSuccess } from '../../utils';
import { ADD_PRODUCT_FAIL, ADD_PRODUCT_LOADING, ADD_PRODUCT_SUCCESS } from '../types';

export const addProductSuccess = (data) => ({
  type: ADD_PRODUCT_SUCCESS,
  payload: data,
});

export const addProductFail = () => ({
  type: ADD_PRODUCT_FAIL,
});

export const addProductLoading = (data) => ({
  type: ADD_PRODUCT_LOADING,
  payload: data,
});

export const addProduct = () => async (dispatch) => {
  dispatch(addProductLoading(true));
  await addProduct().then((response) => {
    dispatch(addProductSuccess(response.data));
    showSuccess('Produk berhasil ditambahkan');
  }).catch((error) => {
    dispatch(addProductFail());
    showError(error);
  });
};
