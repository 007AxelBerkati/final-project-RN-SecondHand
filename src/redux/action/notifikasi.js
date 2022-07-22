import { detailNotif, getNotif, patchNotif } from '../../services';
import { showError } from '../../utils';
import {
  GET_NOTIFIKASI_FAIL, GET_NOTIFIKASI_ID_FAIL,
  GET_NOTIFIKASI_ID_LOADING, GET_NOTIFIKASI_ID_SUCCESS,
  GET_NOTIFIKASI_LOADING, GET_NOTIFIKASI_SUCCESS, PATCH_NOTIFIKASI_FAIL,
  PATCH_NOTIFIKASI_LOADING, PATCH_NOTIFIKASI_SUCCESS,
} from '../types';
import { setLoading } from './global';

export const getNotifikasiSuccess = (data, isRead) => ({
  type: GET_NOTIFIKASI_SUCCESS,
  payload: data,
  isRead,
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
  await getNotif().then(async (response) => {
    const checkNotif = () => {
      for (let i = 0; i < response.data.length; i += 1) {
        if (response.data[i].read === false) {
          return false;
        }
      }
      return true;
    };
    dispatch(getNotifikasiSuccess(response.data, checkNotif()));
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

// PATCH NOTIFIKASI
export const patchNotifikasiSuccess = (data) => ({
  type: PATCH_NOTIFIKASI_SUCCESS,
  payload: data,
});

export const patchNotifikasiFail = (data) => ({
  type: PATCH_NOTIFIKASI_FAIL,
  payload: data,
});

export const patchNotifikasiLoading = (data) => ({
  type: PATCH_NOTIFIKASI_LOADING,
  payload: data,
});

export const patchNotifikasi = (id) => async (dispatch) => {
  await patchNotif(id).then((response) => {
    dispatch(patchNotifikasiSuccess(response.data));
    dispatch(getNotifikasi());
  }).catch((error) => {
    dispatch(patchNotifikasiFail(error));
  });
};
