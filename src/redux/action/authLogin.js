import { login } from '../../services';
import { showError, showSuccess } from '../../utils';
import { GET_LOGIN_FAIL, GET_LOGIN_SUCCESS, LOGOUT } from '../types';
import { setLoading } from './global';

export const getLoginSuccess = (data) => ({
  type: GET_LOGIN_SUCCESS,
  payload: data,
});

export const getLoginFail = (error) => ({
  type: GET_LOGIN_FAIL,
  payload: error,
});

export const logout = () => ({
  type: LOGOUT,
});

export const getLogin = (email, password, navigation) => async (dispatch) => {
  dispatch(setLoading(true));
  await login(email, password).then((response) => {
    dispatch(getLoginSuccess(response.data));
    dispatch(setLoading(false));
    showSuccess('Login Success');
    navigation.navigate('MainApp');
  }).catch((error) => {
    dispatch(getLoginFail(error.response.data.message));
    dispatch(setLoading(false));
    showError(error.response.data.message);
  });
};
