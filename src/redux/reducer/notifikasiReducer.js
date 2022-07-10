import {
  GET_NOTIFIKASI_SUCCESS,
  GET_NOTIFIKASI_FAIL,
  GET_NOTIFIKASI_LOADING,
  GET_NOTIFIKASI_ID_SUCCESS,
  GET_NOTIFIKASI_ID_FAIL,
  GET_NOTIFIKASI_ID_LOADING,
  LOGOUT,
  PATCH_NOTIFIKASI_SUCCESS,
  PATCH_NOTIFIKASI_FAIL,
  PATCH_NOTIFIKASI_LOADING,
} from '../types';

const initialNotifikasiState = {
  notifikasi: [],
  isSuccess: false,
  error: null,
  loading: false,
  notifById: {},
  read: true,
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
        loading: false,
        read: action.read,
      };
    case GET_NOTIFIKASI_FAIL:
      return {
        ...state,
        isSuccess: false,
        error: action.payload,
        loading: false,
      };
    case GET_NOTIFIKASI_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case GET_NOTIFIKASI_ID_SUCCESS:
      return {
        ...state,
        notifById: action.payload,
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
    case PATCH_NOTIFIKASI_SUCCESS:
      return {
        ...state,
        isSuccess: true,
        error: null,
        loading: false,
      };

    case PATCH_NOTIFIKASI_FAIL:
      return {
        ...state,
        isSuccess: false,
        error: action.payload,
        loading: false,
      };

    case PATCH_NOTIFIKASI_LOADING:
      return {
        ...state,
        loading: action.payload,
      };

    case LOGOUT:
      return initialNotifikasiState;
    default:
      return state;
  }
};
