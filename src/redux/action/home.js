import { getBanner, getBuyerProduct, getCategory } from '../../services';
import {
  GET_BANNER_SELLER_FAIL,
  GET_BANNER_SELLER_LOADING,
  GET_BANNER_SELLER_SUCCESS,
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

// GET CATEGORY
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

export const getCategoryProduct = () => async (dispatch) => {
  await getCategory().then((response) => {
    dispatch(getCategorySuccess(response.data));
  }).catch((error) => {
    dispatch(getCategoryFail(error.response.data.message));
  });
};

// GET BANNER
export const getBannerSuccess = (data) => ({
  type: GET_BANNER_SELLER_SUCCESS,
  payload: data,
}
);

export const getBannerFail = (error) => ({
  type: GET_BANNER_SELLER_FAIL,
  payload: error,
}
);

export const getBannerLoading = (data) => ({
  type: GET_BANNER_SELLER_LOADING,
  payload: data,
}
);

export const getBannerSeller = () => async (dispatch) => {
  dispatch(getBannerLoading(true));
  await getBanner().then((response) => {
    dispatch(getBannerSuccess(response.data));
  }).catch((error) => {
    dispatch(getBannerFail(error.response.data.message));
  });
};

