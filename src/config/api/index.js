export const API_BASE_URL = 'https://market-final-project.herokuapp.com';
export const getApiUrl = (endpoint) => API_BASE_URL + endpoint;

// AUTH
export const GET_API_AUTH = getApiUrl('/auth');

// SELLER
export const GET_API_SELLER = getApiUrl('/seller');

// BUYER
export const GET_API_BUYER = getApiUrl('/buyer');

// HISTORY
export const GET_API_HISTORY = getApiUrl('/history');

// NOTIFICATION
export const GET_API_NOTIFICATION = getApiUrl('/notification');
