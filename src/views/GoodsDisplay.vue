<template>
  <div class="goods-display-container">
    <header class="header">
      <div class="username">
        <span v-if="id">
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

    <div v-if="loadedGoods" class="goods-display">
      <h1>{{ good.name }}</h1>
      <img :src="'/' + good.image_url" :alt="good.name">

      <p>商品描述: {{ good.description }}</p>
      <p>价格: ￥{{ good.price }}</p>
      <p>库存: {{ good.stock }}</p>


      <button @click="addToCart">加入购物车</button>
    </div>
    <div v-if="showPopup" class="popup">
      加入购物车成功！
    </div>
    <div v-else-if="loadedGoods && loadedGoods.length === 0">
      <p>没有找到商品</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useUserStore } from '@/stores/user';
import { useGoodsStore } from '@/stores/goods';
import request from "@/utils/request.js";
import { ElMessage } from 'element-plus';


const showPopup = ref(false);
const route = useRoute();
const userUserStore = useUserStore();
const goodsStore = useGoodsStore();

const good = ref({});
const id = ref('');
const username = ref('');

onMounted(async () => {
  try {
    const myget = await userUserStore.myget({});
    id.value = myget.id;
    username.value = myget.username;

    const res = await goodsStore.getGoodsById(route.params.goodsId);
    good.value = res;
    console.log(res);
    console.log(good.value);
  } catch (error) {
    console.error('获取商品失败:', error);
  }
});

const addToCart = async () => {
  const cartRequest = {
    user_id: id.value,
    product_id: route.params.goodsId,
  };

  try {
    const res = await request.post('/cart/items', cartRequest, {
      headers: {}
    });
    // 显示弹窗
    showPopup.value = true;
    // 2秒后隐藏弹窗
    setTimeout(() => {
      showPopup.value = false;
    }, 2000);
  } catch (error) {
    console.error('添加到购物车失败:', error);
  }
};

const loadedGoods = computed(() => {
  console.log(goodsStore.good);
  return goodsStore.good;
});
</script>

<style scoped>
.popup {
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(0, 0, 0, 0.8);
  color: #fff;
  padding: 1rem 2rem;
  border-radius: 8px;
  font-size: 1.2rem;
  z-index: 9999;
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
  animation: fadeInOut 2s forwards;
}

/* 可选：动画效果 */
@keyframes fadeInOut {
  0% {
    opacity: 0;
    transform: translateX(-50%) translateY(-10px);
  }
  10% {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
  90% {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
  100% {
    opacity: 0;
    transform: translateX(-50%) translateY(-10px);
  }
}
.goods-display-container {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.header {
  position: sticky;
  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 100;
}

.logo img {
  height: 40px;
  transition: transform 0.3s ease;
}

.logo:hover img {
  transform: scale(1.05);
}

.goods-display {
  margin-top: 2rem;
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

.goods-display h1 {
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 1.5rem;
}

.goods-display img {
  width: 100%;
  max-width: 600px;
  height: 400px;
  object-fit: cover;
  border-radius: 8px;
  margin: 1rem 0;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.goods-display p {
  font-size: 1.1rem;
  margin: 1rem 0;
  color: #4a5568;
}

button {
  background: #4CAF50;
  padding: 12px 24px;
  font-size: 1rem;
  border-radius: 8px;
  color: white;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
}

button:hover {
  background: #45a049;
  transform: translateY(-2px);
  box-shadow: 0 4px 6px rgba(76, 175, 80, 0.3);
}
</style>
