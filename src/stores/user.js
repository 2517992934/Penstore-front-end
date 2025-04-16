import { defineStore } from 'pinia'
import router from '@/router'
import { userAPI } from '@/api'

export const useUserStore = defineStore('user', {
    state: () => ({
        id: null,
        username: '',
        token: localStorage.getItem('token') || ''
    }),

    actions: {
        // 初始化时尝试获取用户信息
        async initialize() {
            if (this.token) {
                try {
                    const res = await userAPI.getUserInfo()
                    this.id = res.data.id
                    this.username = res.data.username
                } catch (err) {
                    this.clearUser()
                }
            }
        },

        // 登录操作
        async login(credentials) {
            const res = await userAPI.login(credentials)
            this.token = res.data.token
            this.id = res.data.user.id
            this.username = res.data.user.username
            localStorage.setItem('token', this.token)
            router.push('/')
        },

        // 退出登录
        clearUser() {
            this.$reset()
            localStorage.removeItem('token')
            router.push('/login')
        }
    }
})