import request from '@/utils/request'; // 导入封装好的 axios 实例
import { API_PATH } from './path';

// 用户相关接口
export const userAPI = {
    // POST 登录
    login: (data) => request.post(API_PATH.user.LOGIN, data),

    // GET 用户详情
    getUserInfo: (userId) => request.get(API_PATH.user.GET_USER_INFO(userId)),
};

// 商品相关接口
export const productAPI = {
    // GET 商品列表
    getProductList: (params) => request.get(API_PATH.product.LIST, { params }),

    // GET 商品详情
    getProductDetail: (id) => request.get(API_PATH.product.DETAIL(id)),
};

// 按需导出，也可默认导出全部接口
export default { userAPI, productAPI };