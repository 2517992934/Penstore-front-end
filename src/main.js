// import './assets/main.css'

import { createApp } from 'vue'
import PrimeVue from 'primevue/config'
import App from './App.vue'
import {createRouter, createWebHashHistory} from 'vue-router'
import Demo1 from './components/Demo1.vue'
import Demo2 from './components/Demo2.vue'
import User from './components/User.vue'
import Button from "primevue/button";
import Aura from '@primeuix/themes/aura';

const routes = [
    {path:'/demo1',component: Demo1},
    {path:'/demo2',component: Demo2},
    {path:'/user/:username/:id',component: User},
]

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