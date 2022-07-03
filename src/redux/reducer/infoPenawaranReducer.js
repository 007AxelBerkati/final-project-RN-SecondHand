import { GET_ORDER_SELLER_ID_FAIL, GET_ORDER_SELLER_ID_LOADING, GET_ORDER_SELLER_ID_SUCCESS } from '../types';

const initialInfoPenawaranState = {
  infoPenawaran: {},
  isLoading: false,
  isSuccess: false,
  error: null,
};

export const infoPenawaranReducer = (state = initialInfoPenawaranState, action = {}) => {
  switch (action.type) {
    case GET_ORDER_SELLER_ID_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case GET_ORDER_SELLER_ID_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        infoPenawaran: action.payload,
        error: null,
      };
    case GET_ORDER_SELLER_ID_FAIL:
      return {
        ...state,
        isLoading: false,
        isSuccess: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
