import {
  UPDATE_PROFILE_SUCCESS, UPDATE_PROFILE_FAIL, GET_AKUN_SUCCESS, GET_AKUN_FAIL,
} from '../types';

const initialStateUpdateProfile = {
  profile: {},
  error: '',
  isSuccess: false,
};

export const profileReducer = (state = initialStateUpdateProfile, action = {}) => {
  switch (action.type) {
    case UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        profile: action.payload,
        isSuccess: true,
      };
    case UPDATE_PROFILE_FAIL:
      return {
        ...state,
        error: action.error,
        isSuccess: false,
      };

    case GET_AKUN_SUCCESS:
      return {
        ...state,
        isSuccess: true,
        profile: action.payload,
      };
    case GET_AKUN_FAIL:
      return {
        ...state,
        isSuccess: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
