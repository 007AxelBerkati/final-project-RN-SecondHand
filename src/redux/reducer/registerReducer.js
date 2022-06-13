import { GET_REGISTER_FAIL, GET_REGISTER_LOADING, GET_REGISTER_SUCCESS } from '../types';

const initialRegisterState = {
  isLoading: false,
  isSuccess: false,
  isFail: false,
  data: {},
  error: {},
};

export const registerReducer = (state = initialRegisterState, action = {}) => {
  switch (action.type) {
    case GET_REGISTER_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    case GET_REGISTER_SUCCESS:
      return {
        ...state,
        isSuccess: true,
        isLoading: false,
        data: action.payload,
      };
    case GET_REGISTER_FAIL:
      return {
        ...state,
        isFail: true,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
