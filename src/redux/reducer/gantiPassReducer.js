import { PUT_PASSWORD_FAIL, PUT_PASSWORD_SUCCESS } from '../types';

const initialUpdatePassState = {
  isSuccess: false,
  error: null,
};

export const gantiPassReducer = (state = initialUpdatePassState, action = {}) => {
  switch (action.type) {
    case PUT_PASSWORD_SUCCESS:
      return {
        ...state,
        isSuccess: true,
        error: null,
      };
    case PUT_PASSWORD_FAIL:
      return {
        ...state,
        isSuccess: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
