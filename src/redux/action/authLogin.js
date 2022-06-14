import axios from 'axios';
import { GET_API_AUTH } from '../../config';
import { GET_LOGIN_FAIL, GET_LOGIN_LOADING, GET_LOGIN_SUCCESS } from '../types';

export const getLoginSuccess = (data) => ({
  type: GET_LOGIN_SUCCESS,
  payload: data,
});

export const getLoginFail = (error) => ({
  type: GET_LOGIN_FAIL,
  payload: error,
});

export const getLoginLoading = (loading) => ({
  type: GET_LOGIN_LOADING,
  payload: loading,
});

export const getLogin = (email, password) => async (dispatch) => {
  dispatch(getLoginLoading(true));
  await axios.post(`${GET_API_AUTH}/login`, {
    email, password,
  })
    .then((response) => {
      dispatch(getLoginSuccess(response.data));
      dispatch(getLoginLoading(false));
    })
    .catch((error) => {
      dispatch(getLoginFail(error.response.data.message));
      dispatch(getLoginLoading(false));
    });
};
