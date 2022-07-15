import {
  addWishlist, deleteWishlist, detailWishlist, getWishlist,
} from '../../services';
import { showError, showInfo, showSuccess } from '../../utils';
import {
  ADD_WISHLIST_SUCCESS, GET_WISHLIST_BY_ID_FAILED,
  GET_WISHLIST_BY_ID_SUCCESS, GET_WISHLIST_FAILED, GET_WISHLIST_LOADING, GET_WISHLIST_SUCCESS,
} from '../types';
import { setLoading } from './global';

// wishlist
export const getwishlistSuccess = (payload) => ({
  type: GET_WISHLIST_SUCCESS,
  payload,
}
);

export const getWishlistFailed = (err) => ({
  type: GET_WISHLIST_FAILED,
  err,
}
);

export const getWishListLoading = (payload) => ({
  type: GET_WISHLIST_LOADING,
  payload,
}
);
export const getWishlistBuyer = () => async (dispatch) => {
  dispatch(getWishListLoading(true));
  await getWishlist().then((response) => {
    dispatch(getwishlistSuccess(response.data));
    dispatch(setLoading(false));
  }).catch((err) => {
    dispatch(getWishlistFailed(err));
    dispatch(setLoading(false));
    showError(err.response.data.message);
  });
};

export const addWishlistSuccess = (payload) => ({
  type: ADD_WISHLIST_SUCCESS,
  payload,
}
);

export const addWishlistFailed = (err) => ({
  type: GET_WISHLIST_FAILED,
  payload: err,
}
);

export const addWishlistBuyer = (id, navigation) => async (dispatch) => {
  dispatch(setLoading(true));
  await addWishlist(id).then((response) => {
    dispatch(addWishlistSuccess(response.data));
    dispatch(setLoading(false));
    showInfo('Success Add Wishlist', () => { navigation.navigate('DaftarSimpanScreen'); });
  }).catch((err) => {
    dispatch(addWishlistFailed(err));
    dispatch(setLoading(false));
    showError(err.response.data.message);
  });
};

export const deleteWishlistSuccess = (payload) => ({
  type: ADD_WISHLIST_SUCCESS,
  payload,
}
);

export const deleteWishlistFailed = (err) => ({
  type: GET_WISHLIST_FAILED,
  payload: err,
}
);

export const deleteWishlistBuyer = (id) => async (dispatch) => {
  dispatch(setLoading(true));
  await deleteWishlist(id).then((response) => {
    dispatch(deleteWishlistSuccess(response.data));
    dispatch(setLoading(false));
    showInfo('Success Delete Wishlist');
  }).catch((err) => {
    dispatch(deleteWishlistFailed(err));
    dispatch(setLoading(false));
    showError(err.response.data.message);
  });
};

export const getWishlistByIdSuccess = (payload) => ({
  type: GET_WISHLIST_BY_ID_SUCCESS,
  payload,
}
);

export const getWishlistByIdFailed = (err) => ({
  type: GET_WISHLIST_BY_ID_FAILED,
  payload: err,
}
);

export const getWishlistByIdBuyer = (id) => async (dispatch) => {
  dispatch(setLoading(true));
  await detailWishlist(id).then((response) => {
    dispatch(getWishlistByIdSuccess(response.data));
    dispatch(setLoading(false));
    showSuccess('Success Get Wishlist');
  }).catch((err) => {
    dispatch(getWishlistByIdFailed(err));
    dispatch(setLoading(false));
    showError(err.response.data.message);
  });
};
