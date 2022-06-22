import { instance } from '../../config';

// buyer/order
export const getBuyerOrder = () => instance.get('/buyer/order');
export const detailBuyerOrder = (id) => instance.get(`/buyer/order/${id}`);
export const addBuyerOrder = (productId, bidPrice) => instance.post('/buyer/order/', { productId, bidPrice });
export const updateBuyerOrder = (productId, bidPrice) => instance.put('/buyer/order/', { productId, bidPrice });
export const deleteBuyerOrder = (id) => instance.delete(`/buyer/order/${id}`);

// buyer/product
export const getBuyerProduct = (params) => instance.get(`/buyer/product${params}`);
export const detailBuyerProduct = (id) => instance.get(`/buyer/product/${id}`);
