import axios from 'axios';
import { GET_API_AUTH } from '../../config';
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

export const getAkun = (token) => async (dispatch) => {
  dispatch(setLoading(true));
  await axios.get(`${GET_API_AUTH}/user/0`, {
    headers: {
      access_token: token,
    },
  })
    .then((response) => {
      dispatch(getAkunSuccess(response.data));
      dispatch(setLoading(false));
    })
    .catch((error) => {
      dispatch(getAkunFail(error.response.data));
      dispatch(setLoading(false));
    });
};
