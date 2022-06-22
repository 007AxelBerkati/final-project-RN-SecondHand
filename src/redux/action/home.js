import { getBuyerProduct, getCategory } from '../../services';
import {
  GET_CATEGORY_FAIL, GET_CATEGORY_SUCCESS, GET_PRODUCT_FAIL, GET_PRODUCT_SUCCESS,
} from '../types';
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

export const getCategorySuccess = (data) => ({
  type: GET_CATEGORY_SUCCESS,
  payload: data,
}
);

export const getCategoryFail = (error) => ({
  type: GET_CATEGORY_FAIL,
  payload: error,
}
);

export const getProduct = (params) => async (dispatch) => {
  dispatch(setLoading(true));
  await getBuyerProduct(params).then((response) => {
    dispatch(getProductSuccess(response.data));
    dispatch(setLoading(false));
  }).catch((error) => {
    dispatch(getProductFail(error.response.data.message));
    dispatch(setLoading(false));
  });
};

export const getCategoryProduct = () => async (dispatch) => {
  dispatch(setLoading(true));
  await getCategory().then((response) => {
    dispatch(getCategorySuccess(response.data));
    dispatch(setLoading(false));
  }).catch((error) => {
    dispatch(getCategoryFail(error.response.data.message));
    dispatch(setLoading(false));
  });
};
