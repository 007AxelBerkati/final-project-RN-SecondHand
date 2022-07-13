// TERJUAL PRODUCT

import { getHistory } from '../../services';
import { showError } from '../../utils';
import { GET_HISTORY_FAIL, GET_HISTORY_LOADING, GET_HISTORY_SUCCESS } from '../types';

export const getHistorySuccess = (data) => ({
  type: GET_HISTORY_SUCCESS,
  payload: data,
});

export const getHistoryFail = (error) => ({
  type: GET_HISTORY_FAIL,
  payload: error,
});

export const getHistoryLoading = (data) => ({
  type: GET_HISTORY_LOADING,
  payload: data,
});

export const getDataHistory = () => async (dispatch) => {
  dispatch(getHistoryLoading(true));
  await getHistory().then((response) => {
    dispatch(getHistorySuccess(response.data));
  }).catch((error) => {
    dispatch(getHistoryFail(error.response.data.message));
    showError(error.response.data.message);
  });
};
