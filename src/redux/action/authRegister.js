/* eslint-disable no-console */
import axios from 'axios';
import { GET_API_AUTH } from '../../config';
import { GET_REGISTER_FAIL, GET_REGISTER_SUCCESS } from '../types';
import { setLoading } from './global';
import { showError, showSuccess } from '../../utils';

export const getRegisterSuccess = (data) => ({
  type: GET_REGISTER_SUCCESS,
  payload: data,
  isSuccess: true,
});

export const getRegisterFail = (error) => ({
  type: GET_REGISTER_FAIL,
  payload: error,
}
);

export const getRegister = (data, navigation, dataRegister) => async (dispatch) => {
  console.log('Response data :', data);
  dispatch(setLoading(true));
  await axios.post(`${GET_API_AUTH}/register`, data)
    .then((response) => {
      dispatch(getRegisterSuccess(response.data));
      navigation.replace('LoginScreen');
      showSuccess('Register Sukses');
      dispatch(setLoading(false));
    })
    .catch((error) => {
      dispatch(getRegisterFail(error.response.data.message));
      console.log(error.response.data);
      showError(dataRegister.error);
      dispatch(setLoading(false));
    });
};
