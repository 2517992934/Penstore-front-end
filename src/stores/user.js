// stores/user.js
import { defineStore } from 'pinia'
import { ref } from 'vue'
import request from '@/utils/request'

export const useUserStore = defineStore('user', () => {
    // 用户数据存储
    const id = ref('')
    const username = ref('')
    const email = ref('')

    // 数据设置方法
    const setUserData = (userData) => {
        id.value = userData.id || ''
        username.value = userData.username || ''
        email.value = userData.email || ''
    }

    // 登录方法（纯逻辑）
    const myget = async () => {
        const response =await request.post('/api/login/get',null,{
            headers:{

            }
        });
        setUserData(response.data)
        return response.data
    }

    return {
        id,
        username,
        email,
        myget,
        setUserData
    }
})