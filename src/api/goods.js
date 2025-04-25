import request from '@/utils/request';

export const goodsAPI = {
    getGoodsListById: (categoryId) => request.get(`/goods/${categoryId}`),
    getGoodsById: (goodsId) => request.get(`/goods/details/${goodsId}`),
    addToCart: (cartId) => request.post(`/goods/${cartId}/cart`),
};