import {createApp} from "vue";
import Goods from "@/views/Goods.vue";
import {createPinia} from "pinia";
import router from "@/router/index.js";
import PrimeVue from "primevue/config";
import Aura from "@primeuix/themes/aura";
import VueAxios from "vue-axios";
import axios from "axios";

// axios.defaults.baseURL = "http://localhost:8080";
const pinia = createPinia()
const goods = createApp(Goods)
goods.use(pinia)
goods.use(router)
goods.use(PrimeVue, {
    theme: {
        preset: Aura
    },
    ripple: true
})
goods.use(VueAxios, axios)
goods.mount('#app')