/* eslint-disable camelcase */
import { instance } from '../../config';

export const login = (email, password) => instance.post('/auth/login', { email, password });
export const register = (data) => instance.post('/auth/register', data, {
  headers: {
    Accept: 'application/json',
    'Content-Type': 'multipart/form-data',
  },
});
export const getProfile = () => instance.get('/auth/user');
export const updateProfile = (data) => instance.put('/auth/user', data, {
  headers: {
    Accept: 'application/json',
    'Content-Type': 'multipart/form-data',
  },
});

export const updatePass = (current_password, new_password, confirm_password) => instance.put('/auth/change-password', {
  current_password,
  new_password,
  confirm_password,
});
