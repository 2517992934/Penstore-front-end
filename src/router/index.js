import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/user'
import Login from "@/views/user.vue";
import MyPage from '@/compoments/MyPage.vue'; // 注意 components 拼写修正
import Order from '@/views/Order.vue';
import Cart from "@/views/Cart.vue";
import GoodsList from "@/views/GoodsList.vue";
import GoodsDisplay from "@/views/GoodsDisplay.vue";
import Goodreason from "@/views/Goodreason.vue";
import Home from "@/views/HomeView.vue";
const routes = [
    { path: '/login', component: Login },
    { path: '/mypage', component: MyPage },
    {
        path: '/order',
        name: 'Order',
        component: Order,

    },
    {path: '/cart',component: Cart,},
    {path: '/goods/:categoryId', component: GoodsList },
    {path: '/goods/details/:goodsId', component: GoodsDisplay },
    // {path: '/reason/:searchQuery',
    // name: 'GoodsReason',
    // component: Goodreason},
    // { path: '/',name:"/", component: Home },
    {
        path: '/',
        component: () => import('@/views/MainPage.vue'),
        children: [
            {
                path: '',
                name: 'Home',
                component: () => import('@/views/HomeView.vue')
            },
            {
                path: 'reason/:searchQuery',
                name: 'GoodsReason',
                component: () => import('@/views/Goodreason.vue'),
                props: true
            },
        ]
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
})



export default router