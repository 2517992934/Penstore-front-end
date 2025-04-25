import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/user'
import Login from "@/views/login.vue";
import MyPage from '@/compoments/MyPage.vue'; // 注意 components 拼写修正
import Order from '@/views/Order.vue';
import Cart from "@/views/Cart.vue";
import Home from"@/views/mainpage.vue";
import Shopmgmt from "@/views/Shopmgmt.vue";
import GoodsList from "@/views/GoodsList.vue";
import GoodsDisplay from "@/views/GoodsDisplay.vue";
const routes = [
    { path: '/login', component: Login },
    { path: '/mypage', component: MyPage },
    {path: '/home', component:Home  },
    {path: '/shopmgmt', component: Shopmgmt },
    {path: '/goods/:categoryId', component: GoodsList },
    {path: '/goods/details/:goodsId', component: GoodsDisplay },
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