import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

// 初始化应用
const app = createApp(App)
const pinia = createPinia()

// 注册插件
app.use(pinia)
app.use(router)

// 初始化用户状态
const initializeApp = async () => {
    try {
        // 获取用户存储
        const userStore = pinia.state.value.user
        if (userStore && userStore.initialize) {
            await userStore.initialize()
        }
    } catch (error) {
        console.error('应用初始化失败:', error)
    } finally {
        // 挂载应用
        app.mount('#app')
    }
}

// 启动应用
initializeApp()