<script setup>
import { ref, defineAsyncComponent } from 'vue'
import Cart from './Cart.vue'

const Order = defineAsyncComponent(() => import('./Order.vue'))
const activeTab = ref(Cart)

const switchTab = (component) => {
  if (component === Order && activeTab.value === Cart) {
    activeTab.value = Order
  } else {
    activeTab.value = component
  }
}
</script>

<template>
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

<style scoped>
.cart-page {
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
  background: #f8f9fa;
  color: #495057;
  font-size: 1.1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  position: relative;
}

.nav-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.nav-button.active {
  background: #fff;
  color: #2196f3;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.nav-button.active .badge {
  position: absolute;
  right: 1rem;
  color: #2196f3;
  animation: bounce 0.8s infinite;
}

.material-icons-outlined {
  margin-right: 0.8rem;
  font-size: 1.4rem;
}

.content-area {
  background: #fff;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.05);
}

/* 切换动画 */
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

@keyframes bounce {
  0%, 100% { transform: translateX(0); }
  50% { transform: translateX(4px); }
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
    border-radius: 12px;
  }
}
</style>