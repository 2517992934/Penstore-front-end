import {createApp} from "vue";
import Goods from "@/views/Goods.vue";
import {createPinia} from "pinia";
import router from "@/router/index.js";
import PrimeVue from "primevue/config";
import Aura from "@primeuix/themes/aura";

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
goods.mount('#app')