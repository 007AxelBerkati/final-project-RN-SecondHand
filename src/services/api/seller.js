import { instance } from '../../config';

// seller/banner
export const getBanner = () => instance.get('/seller/banner');
export const detailBanner = (id) => instance.get(`/seller/banner/${id}`);
export const addBanner = (data) => instance.post('/seller/banner', data);
export const deleteBanner = (id) => instance.delete(`/seller/banner/${id}`);

// seller/category
export const getCategory = () => instance.get('/seller/category');
export const detailCategory = (id) => instance.get(`/seller/category/${id}`);
export const addCategory = (name) => instance.post('/seller/category', { name });
export const deleteCategory = (id) => instance.delete(`/seller/category/${id}`);

// seller/product
export const getProduct = () => instance.get('/seller/product');
export const detailProduct = (id) => instance.get(`/seller/product/${id}`);
export const addProduct = (data) => instance.post('/seller/product', data, {
  headers: {
    Accept: 'application/json',
    'Content-Type': 'multipart/form-data',
  },
});
export const updateProduct = (id, data) => instance.put(`/seller/product/${id}`, data, {
  headers: {
    Accept: 'application/json',
    'Content-Type': 'multipart/form-data',
  },
});
export const deleteProduct = (id) => instance.delete(`/seller/product/${id}`);

// seller/order
export const getSellerOrder = () => instance.get('/seller/order');
export const detailSellerOrder = (id) => instance.get(`/seller/order/${id}`);
export const updateSellerOrder = (id, status) => instance.patch(`/seller/order/${id}`, { status });
export const getSellerOrderProduct = (id) => instance.get(`/seller/order/product/${id}`);
