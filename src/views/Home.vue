<template>
  <div class="home-container">
    <header class="header">
      <div class="username">
        <span v-if="user">
          欢迎, {{ user.username }}
          <a href="/logout">退出登录</a>
        </span>
        <span v-else>
          你好，<a href="/logsign">请登录</a>
        </span>
      </div>
      <div class="logo">
        <img src="../assets/logo.png" alt="peiahuishi">
      </div>
      <div class="utility">
        <a href="/seller">卖家中心</a>
        <a href="/cart">购物车</a>
        <a href="/customerService">客服</a>
      </div>
    </header>

    <div v-if="successMessage" class="success-message">
      {{ successMessage }}
    </div>
    <div v-if="errorMessage" class="error-message">
      {{ errorMessage }}
    </div>

    <div class="container">
      <div class="search-box">
        <form @submit.prevent="searchGoods">
          <input type="text" v-model="searchQuery" placeholder="搜索商品...">
          <button type="submit">搜索</button>
        </form>
      </div>

      <div class="categories">
        <a href="/goods/1" class="category">书写</a>
        <a href="/goods/2" class="category">书法</a>
        <a href="/goods/3" class="category">绘画</a>
        <a href="/goods/4" class="category">儿童</a>
        <a href="/goods/5" class="category">相关</a>
      </div>
    </div>

    <div class="slider">
      <div class="slide-viewer">
        <div class="slide-group">
          <div class="slide">
            <img src="/pictures/slide.webp" alt="slide1">
          </div>
          <div class="slide">
            <img src="/pictures/slide.jpg" alt="slide2">
          </div>
          <div class="slide">
            <img src="/pictures/slide2.webp" alt="slide3">
          </div>
          <div class="slide">
            <img src="/pictures/slide5.png" alt="slide4">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useUserStore } from '@/stores/user';

const userStore = useUserStore();
const user = userStore.user;
const searchQuery = ref('');
const successMessage = ref('');
const errorMessage = ref('');

const searchGoods = () => {
  // 搜索结果逻辑
  console.log('搜索商品:', searchQuery.value);
  // 实现搜索逻辑
};
</script>

<!-- Home.vue 样式优化 -->
<style scoped>
.home-container {
  padding: 2rem;
  background: #f8fafc;
  min-height: 100vh;
}

.search-box {
  max-width: 600px;
  margin: 2rem auto;
  position: relative;
}

.search-box input {
  width: 100%;
  padding: 12px 20px;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.search-box input:focus {
  border-color: #4CAF50;
  box-shadow: 0 0 0 3px rgba(76,175,80,0.1);
}

.search-box button {
  position: absolute;
  right: 5px;
  top: 5px;
  padding: 8px 20px;
  border-radius: 6px;
  background: #4CAF50;
  border: none;
  color: white;
  transition: transform 0.2s ease;
}

.search-box button:hover {
  transform: scale(1.05);
}

.categories {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1rem;
  margin: 2rem 0;
}

.category {
  padding: 10px 24px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
}

.category:hover {
  background: #4CAF50;
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 4px 6px rgba(76,175,80,0.2);
}

.slider {
  margin: 3rem auto;
  max-width: 1200px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 15px rgba(0,0,0,0.1);
}

.slide {
  height: 400px;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  display: flex;
  align-items: center;
  justify-content: center;
}

.slide img {
  width: 60%;
  height: auto;
  border-radius: 8px;
}



</style>