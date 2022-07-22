import { GET_REGISTER_FAIL, GET_REGISTER_SUCCESS, LOGOUT } from '../types';

const initialRegisterState = {
  isSuccess: false,
  data: {},
  error: '',
};

export const registerReducer = (state = initialRegisterState, action = {}) => {
  switch (action.type) {
    case GET_REGISTER_SUCCESS:
      return {
        ...state,
        isSuccess: true,
        data: action.payload,
      };
    case GET_REGISTER_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case LOGOUT:
      return initialRegisterState;
    default:
      return state;
  }
};
