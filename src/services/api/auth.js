import { instance } from '../../config';

export const login = (email, password) => instance.post('/auth/login', { email, password });
export const register = (data) => instance.post('/auth/register', data);
export const getProfile = () => instance.get('/auth/user');
export const updateProfile = (data) => instance.put('/auth/user', data);
