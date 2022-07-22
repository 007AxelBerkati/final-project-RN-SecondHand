import {
  GET_HISTORY_FAIL, GET_HISTORY_LOADING, GET_HISTORY_SUCCESS, LOGOUT,
} from '../types';

const initialHistoryState = {
  history: [],
  isLoading: false,
  error: null,
  isSuccess: false,
};

export const historyReducer = (state = initialHistoryState, action = {}) => {
  switch (action.type) {
    case GET_HISTORY_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    case GET_HISTORY_SUCCESS:
      return {
        ...state,
        history: action.payload,
        isLoading: false,
        isSuccess: true,
        error: null,
      };
    case GET_HISTORY_FAIL:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
        isSuccess: false,
      };

    case LOGOUT:
      return initialHistoryState;
    default:
      return state;
  }
};
