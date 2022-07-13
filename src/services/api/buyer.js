import { instance } from '../../config';

// buyer/order
export const getBuyerOrder = () => instance.get('/buyer/order');
export const detailBuyerOrder = (id) => instance.get(`/buyer/order/${id}`);
export const addBuyerOrder = (payload) => instance.post('/buyer/order/', payload);
export const updateBuyerOrder = (id, payload) => instance.put(`/buyer/order/${id}`, payload);
export const deleteBuyerOrder = (id) => instance.delete(`/buyer/order/${id}`);

// buyer/product
export const getBuyerProduct = (params) => instance.get(`/buyer/product${params}`);
export const detailBuyerProduct = (id) => instance.get(`/buyer/product/${id}`);
