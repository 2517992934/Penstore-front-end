import { createApp } from 'vue'
import router from './router/index.js'
import PrimeVue from 'primevue/config'
import App from './views/App.vue'
// import { createRouter, createWebHashHistory } from 'vue-router'
// import Demo1 from './components/Demo1.vue'
// import Demo2 from './components/Demo2.vue'
// import User from './components/User.vue'
// import Button from 'primevue/button'
import Aura from '@primeuix/themes/aura'
import { createPinia } from 'pinia'
import VueAxios from "vue-axios";
import axios from "axios";
// import { useUserStore } from './stores/userStore' // 假设你定义了一个 userStore

//创建大菠萝
const pinia = createPinia()
//创建App根组件
const app = createApp(App)
//使用大菠萝，路由和UI库,axios
app.use(pinia)
app.use(router)
app.use(PrimeVue, {
    theme: {
        preset: Aura
    },
    ripple: true
})
app.use(VueAxios, axios)
// 初始化用户状态并挂载应用
// const initializeApp = async () => {
//     try {
//         const userStore = useUserStore()
//         if (userStore.initialize) {
//             await userStore.initialize()
//         }
//     } catch (error) {
//         console.error('应用初始化失败:', error)
//     } finally {
        app.mount('#app')
//     }
// }

// initializeApp()

