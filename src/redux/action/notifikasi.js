import { getNotif, detailNotif, patchNotif } from '../../services';
import {
  GET_NOTIFIKASI_SUCCESS,
  GET_NOTIFIKASI_FAIL,
  GET_NOTIFIKASI_LOADING,
  GET_NOTIFIKASI_ID_SUCCESS,
  GET_NOTIFIKASI_ID_FAIL,
  GET_NOTIFIKASI_ID_LOADING,
  PATCH_NOTIFIKASI_SUCCESS,
  PATCH_NOTIFIKASI_FAIL,
  PATCH_NOTIFIKASI_LOADING,
} from '../types';
import { showError, showSuccess } from '../../utils';
import { setLoading } from './global';

export const getNotifikasiSuccess = (data, read) => ({
  type: GET_NOTIFIKASI_SUCCESS,
  payload: data,
  read,
});

export const getNotifikasiFail = (error) => ({
  type: GET_NOTIFIKASI_FAIL,
  payload: error,
});

export const getNotifikasiLoading = (data) => ({
  type: GET_NOTIFIKASI_LOADING,
  payload: data,
});

export const getIsReadNotif = (isRead) => ({
  type: 'IS_READ',
  payload: isRead,
});

export const getNotifikasi = () => async (dispatch) => {
  dispatch(getNotifikasiLoading(true));
  await getNotif().then(async (response) => {
    const checkNotif = () => {
      for (let i = 0; i < response.data.length; i += 1) {
        if (response.data[i].read === false) {
          dispatch(getIsReadNotif(false));
          return;
        }
      }
      dispatch(getIsReadNotif(true));
    };
    await checkNotif();
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
  dispatch(patchNotifikasiLoading(true));
  await patchNotif(id).then((response) => {
    dispatch(patchNotifikasiSuccess(response.data));
    showSuccess('Success');
  }).catch((error) => {
    dispatch(patchNotifikasiFail(error));
    showError(error.response.data.message);
  });
};
