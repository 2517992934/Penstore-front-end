// import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import {createRouter, createWebHashHistory} from 'vue-router'
import Demo1 from '@/compoments/Demo1.vue'
import Demo2 from '@/compoments/Demo2.vue'
import User from '@/compoments/User.vue'

const routes = [
    {path:'/demo1',component: Demo1},
    {path:'/demo2',component: Demo2},
    {path:'/user/:username/:id',component: User},
]

const router = createRouter({
    history: createWebHashHistory(),
    routes: routes
})

createApp(App).use(router).mount('#app')
