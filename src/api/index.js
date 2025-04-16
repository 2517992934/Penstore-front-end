import request from '@/utils/request'

export const userAPI = {
    login: (data) => request.post('/login', data),
    getUserInfo: () => request.get('/user/info')
}