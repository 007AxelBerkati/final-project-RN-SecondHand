import { GET_LOGIN_FAIL, GET_LOGIN_SUCCESS, LOGOUT } from '../types';

const initialLoginState = {
  isLoggedIn: false,
  isSuccess: false,
  data: {},
  error: '',
};

export const loginReducer = (state = initialLoginState, action = {}) => {
  switch (action.type) {
    case GET_LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        isSuccess: true,
        data: action.payload,
      };
    case GET_LOGIN_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        isSuccess: false,
        error: action.payload,
      };

    case LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        isSuccess: false,
        data: {},
        error: '',
      };

    default:
      return state;
  }
};
