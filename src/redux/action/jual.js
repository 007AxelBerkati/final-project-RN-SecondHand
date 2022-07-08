import { addProduct } from '../../services';
import { showError, showSuccess } from '../../utils';
import { ADD_PRODUCT_FAIL, ADD_PRODUCT_LOADING, ADD_PRODUCT_SUCCESS } from '../types';
import { setLoading } from './global';

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

export const postProduct = (data, navigation) => async (dispatch) => {
  dispatch(setLoading(true));
  await addProduct(data).then((response) => {
    dispatch(addProductSuccess(response.data));
    dispatch(setLoading(false));
    showSuccess('Add Product Success');
    navigation.replace('MainApp');
  }).catch((error) => {
    dispatch(addProductFail());
    dispatch(setLoading(false));
    showError(error.response.data.message);
  });
};
