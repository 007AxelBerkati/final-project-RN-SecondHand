import axios from 'axios';
import { GET_API_BUYER } from '../../config';
import { GET_PRODUCT_FAIL, GET_PRODUCT_LOADING, GET_PRODUCT_SUCCESS } from '../types';

export const getProductSuccess = (data) => ({
  type: GET_PRODUCT_SUCCESS,
  payload: data,
});

export const getProductFail = (error) => ({
  type: GET_PRODUCT_FAIL,
  payload: error,
}
);

export const getProductLoading = (loading) => ({
  type: GET_PRODUCT_LOADING,
  payload: loading,
}
);

export const getProduct = () => async (dispatch) => {
  dispatch(getProductLoading(true));
  await axios.get(`${GET_API_BUYER}/product`)
    .then((response) => {
      dispatch(getProductSuccess(response.data));
    })
    .catch((error) => {
      dispatch(getProductFail(error.response.data));
    });
};
