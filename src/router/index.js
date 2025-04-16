import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/user'

const routes = [
    // { path: '/', component: () => import('@/views/Home.vue'), meta: { requiresAuth: true } },
    { path: '/login', component: () => import('@/views/Login.vue') }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to) => {
    const userStore = useUserStore()
    if (to.meta.requiresAuth && !userStore.token) return '/login'
    if (to.path === '/login' && userStore.token) return '/'
})

export default router