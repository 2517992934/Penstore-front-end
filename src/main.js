import { createApp } from 'vue'

import PrimeVue from 'primevue/config'
import App from './App.vue'
import {createRouter, createWebHashHistory} from 'vue-router'
import Demo1 from './components/Demo1.vue'
import Demo2 from './components/Demo2.vue'
import User from './components/User.vue'
import Button from "primevue/button";
import Aura from '@primeuix/themes/aura';


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

const router = createRouter({
    history: createWebHashHistory(),
    routes: routes
})
const app = createApp(App);
app.use(PrimeVue, {
    theme: {
        preset: Aura
    },
    ripple: true
});
app.use(router).mount('#app');

