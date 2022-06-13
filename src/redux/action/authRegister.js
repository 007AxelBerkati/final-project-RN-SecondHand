import axios from 'axios';
import { GET_API_AUTH } from '../../config';
import { GET_REGISTER_FAIL, GET_REGISTER_LOADING, GET_REGISTER_SUCCESS } from '../types';

export const getRegisterSuccess = (data) => ({
  type: GET_REGISTER_SUCCESS,
  payload: data,
  isSuccess: true,
});

export const getRegisterFail = (error) => ({
  type: GET_REGISTER_FAIL,
  payload: error,
  isFail: true,
}
);

export const getRegisterLoading = (loading) => ({
  type: GET_REGISTER_LOADING,
  payload: loading,
}
);

export const getRegister = (data, navigation) => async (dispatch) => {
  dispatch(getRegisterLoading(true));
  await axios.post(`${GET_API_AUTH}/register`, data)
    .then((response) => {
      dispatch(getRegisterSuccess(response.data));
      dispatch(getRegisterLoading(false));
      navigation.reset({ index: 0, routes: [{ name: 'MainApp' }] });
    })
    .catch((error) => {
      dispatch(getRegisterFail(error.response.data));
      dispatch(getRegisterLoading(false));
    });
};
