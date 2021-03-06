import { getProfile } from '../../services';
import { GET_AKUN_FAIL, GET_AKUN_LOADING, GET_AKUN_SUCCESS } from '../types';

export const getAkunSuccess = (data) => ({
  type: GET_AKUN_SUCCESS,
  payload: data,
});

export const getAkunFail = (error) => ({
  type: GET_AKUN_FAIL,
  payload: error,
}
);

export const getAkunLoading = (loading) => ({
  type: GET_AKUN_LOADING,
  payload: loading,
}
);

export const getAkun = () => async (dispatch) => {
  dispatch(getAkunLoading(true));
  await getProfile().then((response) => {
    dispatch(getAkunSuccess(response.data));
  }).catch((error) => {
    dispatch(getAkunFail(error.response.data.message));
  });
};
