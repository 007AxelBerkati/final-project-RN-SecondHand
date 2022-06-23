import { instance } from '../../config';

export const getHistory = () => instance.get('/history');
export const detailHistory = (id) => instance.get(`/history${id}`);
