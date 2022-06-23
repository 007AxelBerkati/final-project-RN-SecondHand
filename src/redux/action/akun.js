import { getProfile } from '../../services';
import { GET_AKUN_FAIL, GET_AKUN_SUCCESS } from '../types';
import { setLoading } from './global';

export const getAkunSuccess = (data) => ({
  type: GET_AKUN_SUCCESS,
  payload: data,
});

export const getAkunFail = (error) => ({
  type: GET_AKUN_FAIL,
  payload: error,
}
);

export const getAkun = () => async (dispatch) => {
  dispatch(setLoading(true));
  await getProfile().then((response) => {
    dispatch(getAkunSuccess(response.data));
    dispatch(setLoading(false));
  }).catch((error) => {
    dispatch(getAkunFail(error.response.data.message));
    dispatch(setLoading(false));
  });
};
