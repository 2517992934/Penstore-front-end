import request from '@/utils/request'
import { API_PATH } from './path'

export const userAPI = {
    // POST 登录接口
    login: (data) => request.post(API_PATH.user.LOGIN, data),

    // GET 用户信息接口
    getInfo: () => request.get(API_PATH.user.GET_INFO)
}