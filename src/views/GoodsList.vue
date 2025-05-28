<template>
  <div class="goods-list-container">
    <header class="header">
      <div class="username">
        <span v-if=id>
          欢迎, {{ username }}
          <a href="/logout">退出登录</a>
        </span>
        <span v-else>
          你好，<a href="/logsign">请登录</a>
        </span>
      </div>
      <div class="logo">
        <img src="/images/logo.png" alt="peiahuishi">
      </div>
      <div class="utility">
        <a href="/seller">卖家中心</a>
        <a href="/cart">购物车</a>
        <a href="/customerService">客服</a>
      </div>
    </header>

    <h1>商品列表</h1>
    <div v-if="loadedGoods && loadedGoods.length > 0" class="goods-list">
      <div v-for="good in loadedGoods" :key="good.id" class="product">
        <img :src="'/' + good.image_url" :alt="good.name">
        <h2>{{ good.name }}</h2>
        <p>价格: ￥{{ good.price }}</p>
        <p>库存: {{ good.stock }}</p>
        <a :href="`/goods/details/${good.id}`">查看详情</a>
        <a href="/shop">浏览店铺</a>
      </div>
    </div>
    <div v-else-if="loadedGoods && loadedGoods.length === 0">
      <p>没有找到商品</p>
    </div>
    <div v-else>
      <p>加载中...</p>
    </div>
  </div>
</template>

<script setup>
import {ref, onMounted, computed} from 'vue';
import { useUserStore } from '@/stores/user';
import { useGoodsStore } from '@/stores/goods';
import { useRoute } from 'vue-router'
import router from "@/router/index.js";


const userUserStore = useUserStore();
const goodsStore = useGoodsStore();
const route=useRoute();
const id=ref('')
const username=ref('')
// 地址相关状态

let goods = goodsStore.goods;
const length=goods.length;
console.log(length);
console.log(route.params.categoryId);
onMounted(async () => {
  try {
    const res = await goodsStore.getGoodsListById(route.params.categoryId);
    const myget=await userUserStore.myget({})
    id.value=myget.id;
    username.value=myget.username;

    console.log(res);
    goods=res;
    console.log(goods);
    console.log(goods.length);
  } catch (error) {
    console.error('获取租房列表失败:', error);
  }
});
const loadedGoods = computed(() => {
  return goodsStore.goods;
});


</script>

<!-- GoodsList.vue 样式优化 -->
<style scoped>
.goods-list-container {
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
}

.goods-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.product {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0,0,0,0.05);
  position: relative;
  overflow: hidden;
}

.product:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 15px rgba(0,0,0,0.1);
}

.product::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: linear-gradient(90deg, #4CAF50 0%, #2c3e50 100%);
}

.product img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 1rem;
}

.product h2 {
  font-size: 1.25rem;
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.product p {
  color: #4a5568;
  margin: 0.5rem 0;
}

.product a {
  display: inline-block;
  margin: 0.5rem 0.5rem 0 0;
  padding: 6px 12px;
  background: #f0f0f0;
  border-radius: 6px;
  color: #2c3e50;
  transition: all 0.2s ease;
}

.product a:hover {
  background: #4CAF50;
  color: white;
}
</style>