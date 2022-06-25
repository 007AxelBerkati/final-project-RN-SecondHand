import { updateProfile } from '../../services/api/auth';
import { UPDATE_PROFILE_FAIL, UPDATE_PROFILE_SUCCESS } from '../types';
import { showError, showSuccess } from '../../utils';
import { setLoading } from './global';

export const updateProfileSuccess = (data) => ({
  type: UPDATE_PROFILE_SUCCESS,
  payload: data,
});

export const updateProfileFail = (error) => ({
  type: UPDATE_PROFILE_FAIL,
  payload: error,
});

export const putDataProfile = (data, navigation) => async (dispatch) => {
  dispatch(setLoading(true));
  await updateProfile(data)
    .then((response) => {
      dispatch(updateProfileSuccess(response.data));
      showSuccess('Update profile success');
      navigation.goBack();
      dispatch(setLoading(false));
    })
    .catch((err) => {
      dispatch(updateProfileFail(err.response.data.message));
      showError(err.response.data.message);
      dispatch(setLoading(false));
    });
};
