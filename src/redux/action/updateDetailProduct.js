import { updateProduct } from '../../services';
import { showError, showSuccess } from '../../utils';
import { UPDATE_PRODUCT_FAIL, UPDATE_PRODUCT_SUCCESS } from '../types';
import { setLoading } from './global';

export const updateDetailProductSuccess = (data) => ({
  type: UPDATE_PRODUCT_SUCCESS,
  payload: data,
});
export const updateDetailProductFail = (error) => ({
  type: UPDATE_PRODUCT_FAIL,
  payload: error,
});

export const updateDetailProduct = (id, data, navigation) => async (dispatch) => {
  dispatch(setLoading(true));

  await updateProduct(id, data).then((response) => {
    dispatch(updateDetailProductSuccess(response.data));
    showSuccess('Update product success');
    navigation.replace('MainApp');
    dispatch(setLoading(false));
  }).catch((error) => {
    dispatch(updateDetailProductFail(error.response.data.message));
    showError(error.response.data.message);
    dispatch(setLoading(false));
  });
};
