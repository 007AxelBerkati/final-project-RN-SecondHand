import { GET_LOGIN_FAIL, GET_LOGIN_LOADING, GET_LOGIN_SUCCESS } from '../types';

const initialLoginState = {
  isLoggedIn: false,
  isLoading: false,
  isFail: false,
  isSuccess: false,
  data: {},
  error: {},
};

export const loginReducer = (state = initialLoginState, action = {}) => {
  switch (action.type) {
    case GET_LOGIN_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    case GET_LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        isLoading: false,
        isSuccess: true,
        data: action.payload,
      };
    case GET_LOGIN_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        isLoading: false,
        isFail: true,
        error: action.payload,
      };
    default:
      return state;
  }
};
