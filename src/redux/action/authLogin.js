import axios from 'axios';
import { GET_API_AUTH } from '../../config';
import { showError, showSuccess } from '../../utils';
import { GET_LOGIN_FAIL, GET_LOGIN_SUCCESS } from '../types';
import { setLoading } from './global';

export const getLoginSuccess = (data) => ({
  type: GET_LOGIN_SUCCESS,
  payload: data,
});

export const getLoginFail = (error) => ({
  type: GET_LOGIN_FAIL,
  payload: error,
});

export const getLogin = (email, password, navigation, dataLogin) => async (dispatch) => {
  dispatch(setLoading(true));
  await axios.post(`${GET_API_AUTH}/login`, {
    email, password,
  })
    .then((response) => {
      dispatch(getLoginSuccess(response.data));
      showSuccess('Login Success');
      navigation.replace('MainApp');
      dispatch(setLoading(false));
    })
    .catch((error) => {
      dispatch(getLoginFail(error.response.data.message));
      showError(dataLogin.error);
      dispatch(setLoading(false));
    });
};
