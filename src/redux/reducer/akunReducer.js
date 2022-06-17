import { GET_AKUN_FAIL, GET_AKUN_SUCCESS } from '../types';

const initialStateAkun = {
  dataAkun: {},
  isSuccess: false,
  error: '',
};

export const akunReducer = (state = initialStateAkun, action = {}) => {
  switch (action.type) {
    case GET_AKUN_SUCCESS:
      return {
        ...state,
        isSuccess: true,
        dataAkun: action.payload,
      };
    case GET_AKUN_FAIL:
      return {
        ...state,
        isSuccess: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
