<template>
  <div class="main-layout">
    <nav class="navigation">

      <button
          :class="['nav-button', { active: isActiveHome }]"
          @click="navigateHome"
      >
        主页
      </button>

      <button
          :class="['nav-button', { active: isActiveReason }]"
          @click="goToGoodsReason"
      >
        搜索
      </button>

      <!-- 输入框 -->
      <div class="search-container">
        <input
            v-model="searchQuery"
            type="text"
            placeholder="输入搜索内容"
            class="search-input"
        />
      </div>
      <div class="logo">
        <img src="/images/logo.png" alt="peiahuishi">
      </div>
    </nav>


    <div class="content-wrapper">
      <router-view v-slot="{ Component }">
        <transition name="slide" mode="out-in">
          <component
              :is="Component"
              class="content-main"
          />
        </transition>
      </router-view>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';


const router = useRouter();
const searchQuery = ref('');

// 跳转到首页
const navigateHome = () => {
  router.push({ name: 'Home' });
};

// 跳转到 GoodsReason，并带上参数
const goToGoodsReason = () => {
  if (searchQuery.value.trim() !== '') {
    router.push({
      name: 'GoodsReason',
      params: { searchQuery: searchQuery.value },
    });
  } else {
    alert('请输入搜索内容');
  }
};

// 可选：可以定义一些变量控制按钮的激活状态
const isActiveHome = false; // 根据实际情况设置
const isActiveReason = false; // 根据实际情况设置
</script>

<style scoped>
.main-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.navigation {
  padding: 1rem;
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.nav-button {
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 8px;
  background: rgba(66, 185, 131, 0.1);
  color: #2c3e50;
  cursor: pointer;
  transition: all 0.3s ease;
}

.nav-button.active {
  background: #42b983;
  color: white;
}

.search-container {
  display: flex;
  align-items: center;
}

.search-input {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-right: 0.5rem;
}

.content-wrapper {
  flex: 1;
  padding: 2rem 1rem;
  display: flex;
  justify-content: center;
}

.content-main {
  width: 100%;
  max-width: 1200px;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

/* 过渡动画 */
.slide-enter-active {
  transition: all 0.3s ease-out;
}

.slide-leave-active {
  transition: all 0.2s ease-in;
}

.slide-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}

.slide-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
