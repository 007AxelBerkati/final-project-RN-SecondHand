import { register } from '../../services';
import { showError, showSuccess } from '../../utils';
import { GET_REGISTER_FAIL, GET_REGISTER_SUCCESS } from '../types';
import { setLoading } from './global';

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

export const getRegister = (data, navigation) => async (dispatch) => {
  dispatch(setLoading(true));
  await register(data).then((response) => {
    dispatch(getRegisterSuccess(response.data));
    dispatch(setLoading(false));
    showSuccess('Berhasil Buat Akun');
    navigation.navigate('LoginScreen');
  }).catch((error) => {
    dispatch(getRegisterFail(error.response.data.message));
    dispatch(setLoading(false));
    showError(error.response.data.message);
  });
};
