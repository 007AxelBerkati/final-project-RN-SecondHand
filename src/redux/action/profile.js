import { updateProfile } from '../../services/api/auth';
import { UPDATE_PROFILE_FAIL, UPDATE_PROFILE_SUCCESS } from '../types';
import { showSuccess } from '../../utils';

export const updateProfileSuccess = (data) => ({
  type: UPDATE_PROFILE_SUCCESS,
  payload: data,
});

export const updateProfileFail = (error) => ({
  type: UPDATE_PROFILE_FAIL,
  payload: error,
});

export const putDataProfile = (data, navigation) => async (dispatch) => {
  await updateProfile(data)
    .then((response) => {
      dispatch(updateProfileSuccess(response.data));
      showSuccess('Update profile success');
      console.log('Response update profile: ', response.data);
      navigation.goBack();
    })
    .catch((err) => {
      // dispatch(updateProfileFail(err.response.data.message));
      // showError(err.response.data.message);
      console.log(err);
    });
};
