import { UPDATE_PROFILE_FAIL, UPDATE_PROFILE_LOADING, UPDATE_PROFILE_SUCCESS } from '../types';

export const updateProfileSuccess = (data) => ({
  type: UPDATE_PROFILE_SUCCESS,
  payload: data,
});

export const updateProfileFail = (error) => ({
  type: UPDATE_PROFILE_FAIL,
  payload: error,
});

export const updateProfileLoading = (loading) => ({
  type: UPDATE_PROFILE_LOADING,
  payload: loading,
}
);
