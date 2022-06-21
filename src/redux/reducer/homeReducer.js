import { GET_PRODUCT_FAIL, GET_PRODUCT_SUCCESS } from '../types';

const initialStateHome = {
  isSuccess: false,
  data: [],
  error: '',
};

export const homeReducer = (state = initialStateHome, action = {}) => {
  switch (action.type) {
    case GET_PRODUCT_SUCCESS:
      return {
        ...state,
        isSuccess: true,
        data: action.payload,
      };
    case GET_PRODUCT_FAIL:
      return {
        ...state,
        isSuccess: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
