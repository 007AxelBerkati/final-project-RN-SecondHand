import { getBuyerProduct } from '../../services';
import { GET_PRODUCT_FAIL, GET_PRODUCT_SUCCESS } from '../types';
import { setLoading } from './global';

export const getProductSuccess = (data) => ({
  type: GET_PRODUCT_SUCCESS,
  payload: data,
});

export const getProductFail = (error) => ({
  type: GET_PRODUCT_FAIL,
  payload: error,
}
);

export const getProduct = () => async (dispatch) => {
  dispatch(setLoading(true));
  await getBuyerProduct().then((response) => {
    dispatch(getProductSuccess(response.data));
    dispatch(setLoading(false));
  }).catch((error) => {
    dispatch(getProductFail(error.response.data.message));
    dispatch(setLoading(false));
  });
};
