import { defineStore } from 'pinia'
import { ref } from 'vue'
import router from '../router'

export const useUserStore = defineStore('user', () => {
    const user = ref(null)
    const isAuthenticated = ref(false)

    const login = async (credentials) => {
        try {
            console.log('发送登录请求:', credentials)
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(credentials)
            })
            console.log('收到响应:', response)
            if (response.ok) {
                const data = await response.json()
                console.log('收到响应:', response)
                user.value = data
                isAuthenticated.value = true
                localStorage.setItem('token', data.access_token)
                router.push('/home')
            }
        } catch (error) {
            console.error('登录失败:', error)
            throw error
        }
    }

    const logout = async () => {
        user.value = null
        isAuthenticated.value = false
        localStorage.removeItem('token')
    }

    return { user, isAuthenticated, login, logout }
})