import {
  GET_NOTIFIKASI_SUCCESS,
  GET_NOTIFIKASI_FAIL,
  GET_NOTIFIKASI_LOADING,
  GET_NOTIFIKASI_ID_SUCCESS,
  GET_NOTIFIKASI_ID_FAIL,
  GET_NOTIFIKASI_ID_LOADING,
} from '../types/notifikasi';

const initialNotifikasiState = {
  notifikasi: {},
  isSuccess: false,
  error: null,
  loading: false,
};

export const notifikasiReducer = (
  state = initialNotifikasiState,
  action = {},
) => {
  switch (action.type) {
    case GET_NOTIFIKASI_SUCCESS:
      return {
        ...state,
        notifikasi: action.payload,
        isSuccess: true,
        error: null,
      };
    case GET_NOTIFIKASI_FAIL:
      return {
        ...state,
        isSuccess: false,
        error: action.payload,
      };
    case GET_NOTIFIKASI_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case GET_NOTIFIKASI_ID_SUCCESS:
      return {
        ...state,
        notifikasi: action.payload,
        isSuccess: true,
        error: null,
      };
    case GET_NOTIFIKASI_ID_FAIL:
      return {
        ...state,
        isSuccess: false,
        error: action.payload,
      };
    case GET_NOTIFIKASI_ID_LOADING:
      return {
        ...state,
        loading: action.payload,
      };

    default:
      return state;
  }
};