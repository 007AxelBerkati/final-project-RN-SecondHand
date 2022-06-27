import {
  UPDATE_PROFILE_SUCCESS, UPDATE_PROFILE_FAIL, GET_AKUN_SUCCESS, GET_AKUN_FAIL, GET_AKUN_LOADING,
} from '../types';

const initialStateUpdateProfile = {
  profile: {},
  error: '',
  isSuccess: false,
  isLoading: false,
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
        isLoading: false,
      };
    case GET_AKUN_FAIL:
      return {
        ...state,
        isSuccess: false,
        error: action.payload,
        isLoading: false,
      };
    case GET_AKUN_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    default:
      return state;
  }
};
