import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/user'
import Login from "@/views/login.vue";
import MyPage from '@/compoments/MyPage.vue'; // 注意 components 拼写修正
import Order from '@/views/Order.vue';
import Cart from "@/views/Cart.vue";

const routes = [
    { path: '/login', component: Login },
    { path: '/mypage', component: MyPage },
    {
        path: '/order',
        name: 'Order',
        component: Order,

    },
    {path: '/cart',component: Cart,}
];

const router = createRouter({
    history: createWebHistory(),
    routes
})



export default router