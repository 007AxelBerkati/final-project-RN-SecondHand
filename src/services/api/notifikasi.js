import { instance } from '../../config';

export const getNotif = () => instance.get('/notification');
export const detailNotif = (id) => instance.get(`/notification${id}`);
