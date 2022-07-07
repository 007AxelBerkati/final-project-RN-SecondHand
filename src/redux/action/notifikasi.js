import { getNotif, detailNotif } from '../../services';
import {
  GET_NOTIFIKASI_SUCCESS,
  GET_NOTIFIKASI_FAIL,
  GET_NOTIFIKASI_LOADING,
  GET_NOTIFIKASI_ID_SUCCESS,
  GET_NOTIFIKASI_ID_FAIL,
  GET_NOTIFIKASI_ID_LOADING,
} from '../types';
import { showError } from '../../utils';
import { setLoading } from './global';

export const getNotifikasiSuccess = (data) => ({
  type: GET_NOTIFIKASI_SUCCESS,
  payload: data,
});

export const getNotifikasiFail = (error) => ({
  type: GET_NOTIFIKASI_FAIL,
  payload: error,
});

export const getNotifikasiLoading = (data) => ({
  type: GET_NOTIFIKASI_LOADING,
  payload: data,
});

export const getNotifikasi = () => async (dispatch) => {
  dispatch(getNotifikasiLoading(true));
  await getNotif().then((response) => {
    dispatch(getNotifikasiSuccess(response.data));
  }).catch((error) => {
    dispatch(getNotifikasiFail(error.response.data.message));
  });
};

export const getNotifikasiIdSuccess = (data) => ({
  type: GET_NOTIFIKASI_ID_SUCCESS,
  payload: data,
});
export const getNotifikasiIdFail = (data) => ({
  type: GET_NOTIFIKASI_ID_FAIL,
  payload: data,
});
export const getNotifikasiIdLoading = (data) => ({
  type: GET_NOTIFIKASI_ID_LOADING,
  payload: data,
});

export const getNotifikasiId = (id) => async (dispatch) => {
  dispatch(getNotifikasiIdLoading(true));
  await detailNotif(id).then((response) => {
    dispatch(getNotifikasiIdSuccess(response.data));
    dispatch(setLoading(false));
  }).catch((error) => {
    dispatch(getNotifikasiFail(error));
    showError(error.response.data.message);
    dispatch(setLoading(false));
  });
};
