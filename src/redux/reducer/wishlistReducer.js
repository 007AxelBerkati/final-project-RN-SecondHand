import {
  ADD_WISHLIST_FAILED, ADD_WISHLIST_SUCCESS, DELETE_WISHLIST_FAILED,
  DELETE_WISHLIST_SUCCESS,
  GET_WISHLIST_BY_ID_FAILED,
  GET_WISHLIST_BY_ID_SUCCESS, GET_WISHLIST_FAILED,
  GET_WISHLIST_LOADING, GET_WISHLIST_SUCCESS, LOGOUT,
} from '../types';

export const initialWishlistState = {
  data: [],
  loading: false,
  error: null,
  dataAddWishlist: {},
  dataDeleteWishlist: {},
  dataGetWishlistId: {},
};

export const wishlistReducer = (state = initialWishlistState, action = {}) => {
  switch (action.type) {
    case GET_WISHLIST_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: null,
      };
    case GET_WISHLIST_FAILED:
      return {
        ...state,
        loading: false,
        error: action.err,
      };

    case GET_WISHLIST_LOADING:
      return {
        ...state,
        loading: action.payload,
      };

    case ADD_WISHLIST_SUCCESS:
      return {
        ...state,
        dataAddWishlist: action.payload,
        loading: false,
        error: null,
      };
    case ADD_WISHLIST_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DELETE_WISHLIST_SUCCESS:
      return {
        ...state,
        dataDeleteWishlist: action.payload,
        loading: false,
        error: null,
      };
    case DELETE_WISHLIST_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case GET_WISHLIST_BY_ID_SUCCESS:
      return {
        ...state,
        dataGetWishlistId: action.payload,
        loading: false,
        error: null,
      };
    case GET_WISHLIST_BY_ID_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case LOGOUT:
      return initialWishlistState;

    default:
      return state;
  }
};
