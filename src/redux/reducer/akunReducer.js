import { GET_AKUN_FAIL, GET_AKUN_LOADING, GET_AKUN_SUCCESS } from '../types';

const initialStateAkun = {
  dataAkun: {},
  isLoading: false,
  isSuccess: false,
  error: '',
};

export const akunReducer = (state = initialStateAkun, action = {}) => {
  switch (action.type) {
    case GET_AKUN_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    case GET_AKUN_SUCCESS:
      return {
        ...state,
        isSuccess: true,
        isLoading: false,
        dataAkun: action.payload,
      };
    case GET_AKUN_FAIL:
      return {
        ...state,
        isSuccess: false,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
