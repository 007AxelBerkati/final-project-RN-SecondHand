import {
  GET_CATEGORY_FAIL,
  GET_CATEGORY_SUCCESS, GET_PRODUCT_FAIL, GET_PRODUCT_LOADING, GET_PRODUCT_SUCCESS,
} from '../types';

const initialStateHome = {
  isSuccess: false,
  data: [],
  error: '',
  category: [],
  isLoading: false,
};

export const homeReducer = (state = initialStateHome, action = {}) => {
  switch (action.type) {
    case GET_PRODUCT_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };

    case GET_PRODUCT_SUCCESS:
      return {
        ...state,
        isSuccess: true,
        data: action.payload,
        isLoading: false,
      };
    case GET_PRODUCT_FAIL:
      return {
        ...state,
        isSuccess: false,
        error: action.payload,
        isLoading: false,
      };

    case GET_CATEGORY_SUCCESS:
      return {
        ...state,
        isSuccess: true,
        category: action.payload,
      };

    case GET_CATEGORY_FAIL:
      return {
        ...state,
        isSuccess: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
