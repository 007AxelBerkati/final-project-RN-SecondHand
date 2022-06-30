import { getProduct } from '../../services';
import { GET_PRODUCT_SELLER_FAIL, GET_PRODUCT_SELLER_LOADING, GET_PRODUCT_SELLER_SUCCESS } from '../types';

export const getProductSellerSuccess = (data) => ({
  type: GET_PRODUCT_SELLER_SUCCESS,
  payload: data,
});

export const getProductSellerFail = (error) => ({
  type: GET_PRODUCT_SELLER_FAIL,
  payload: error,
});

export const getProductSellerLoading = (data) => ({
  type: GET_PRODUCT_SELLER_LOADING,
  payload: data,
});

export const getProductSeller = () => async (dispatch) => {
  dispatch(getProductSellerLoading(true));
  await getProduct().then((response) => {
    dispatch(getProductSellerSuccess(response.data));
  }).catch((error) => {
    dispatch(getProductSellerFail(error.response.data.message));
  });
};
