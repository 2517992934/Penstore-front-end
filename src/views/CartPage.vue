<template>
  <!-- 独立背景层 -->
  <div class="global-background"></div>

  <div class="cart-page">
    <!-- 导航按钮组 -->
    <div class="nav-buttons">
      <button
          @click="switchTab(Cart)"
          :class="{ active: activeTab === Cart }"
          class="nav-button"
      >
        <span class="material-icons-outlined"></span>
        购物车
        <span class="badge" v-if="activeTab === Cart">▶</span>
      </button>

      <button
          @click="switchTab(Order)"
          :class="{ active: activeTab === Order }"
          class="nav-button"
      >
        <span class="material-icons-outlined"></span>
        订单确认
        <span class="badge" v-if="activeTab === Order">▶</span>
      </button>
    </div>

    <!-- 内容区 -->
    <transition name="slide-fade" mode="out-in">
      <component
          :is="activeTab"
          :key="activeTab.__name"
          class="content-area"
      />
    </transition>
  </div>
</template>

<script setup>
import { ref, defineAsyncComponent } from 'vue'
import Cart from './Cart.vue'

const Order = defineAsyncComponent(() => import('./Order.vue'))
const activeTab = ref(Cart)

const switchTab = (component) => {
  activeTab.value = component
}
</script>

<style>
/* 全局样式重置 */
body {
  margin: 0;
  padding: 0;
  min-height: 100vh;
}

/* 背景层 */
.global-background {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
  background-image: url('/images/background2.jpg'); /* 替换为实际路径 */
  background-size: cover;
  background-position: center;
  filter: brightness(0.8);
}
</style>

<style scoped>
.cart-page {
  position: relative;
  min-height: 100vh;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

.nav-buttons {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  padding: 0 1rem;
}

.nav-button {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.2rem;
  border: none;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.85);
  color: #495057;
  font-size: 1.1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  position: relative;
  backdrop-filter: blur(4px);
}

.nav-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
}

.nav-button.active {
  background: rgba(33, 150, 243, 0.15);
  color: #2196f3;
  border: 1px solid rgba(33, 150, 243, 0.2);
}

.content-area {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(12px);
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);
}

/* 过渡动画 */
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}

@media (max-width: 768px) {
  .nav-buttons {
    flex-direction: column;
  }

  .nav-button {
    padding: 1rem;
  }

  .content-area {
    padding: 1.5rem;
  }
}
</style>