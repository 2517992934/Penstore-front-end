import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/user'
import Login from "@/views/login.vue";
import MyPage from '@/compoments/MyPage.vue';

const routes = [
    { path: '/login', component: Login },
    { path: '/mypage', component: MyPage }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

// router.beforeEach((to) => {
//     const userStore = useUserStore()
//     if (to.meta.requiresAuth && !userStore.token) return '/login'
//     if (to.path === '/login' && userStore.token) return '/'
// })

export default router