import { getBuyerProduct, getCategory } from '../../services';
import {
  GET_CATEGORY_FAIL,
  GET_CATEGORY_SUCCESS, GET_PRODUCT_FAIL, GET_PRODUCT_LOADING, GET_PRODUCT_SUCCESS,
} from '../types';

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

export const getProductLoading = (data) => ({
  type: GET_PRODUCT_LOADING,
  payload: data,
}
);

export const getProduct = (params) => async (dispatch) => {
  dispatch(getProductLoading(true));
  await getBuyerProduct(params).then((response) => {
    dispatch(getProductSuccess(response.data));
  }).catch((error) => {
    dispatch(getProductFail(error.response.data.message));
  });
};

export const getCategoryProduct = () => async (dispatch) => {
  await getCategory().then((response) => {
    dispatch(getCategorySuccess(response.data));
  }).catch((error) => {
    dispatch(getCategoryFail(error.response.data.message));
  });
};
