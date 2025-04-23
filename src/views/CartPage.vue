<!-- CartPage.vue -->
<script setup>
import { ref, shallowRef } from 'vue'
import Cart from '@/views/Cart.vue'
import Order from '@/views/Order.vue'

const activeTab = shallowRef(Cart) // 默认显示购物车
</script>

<template>
  <div class="container">
    <!-- 切换按钮组 -->
    <div class="button-group">
      <button
          :class="{ active: activeTab === Cart }"
          @click="activeTab = Cart"
      >
        购物车
      </button>
      <button
          :class="{ active: activeTab === Order }"
          @click="activeTab = Order"
      >
        订单确认
      </button>
    </div>


    <component :is="activeTab" />
  </div>
</template>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.button-group {
  margin-bottom: 30px;
  border-bottom: 2px solid #eee;
}

button {
  padding: 12px 30px;
  margin-right: 15px;
  border: none;
  background: none;
  cursor: pointer;
  font-size: 16px;
  transition: all 0.3s;
}

button.active {
  border-bottom: 3px solid #007bff;
  color: #007bff;
  font-weight: bold;
}
</style>