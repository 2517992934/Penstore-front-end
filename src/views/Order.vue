<script setup lang="ts">
import { useCartStore } from '@/stores/cart'
import { storeToRefs } from 'pinia'
import { ref, computed, onMounted } from 'vue'

const cartStore = useCartStore()
const { selectedItems } = storeToRefs(cartStore) // 确保状态名一致
const isLoading = ref(true)

// 正确使用计算属性
const total = computed(() =>
    selectedItems.value.reduce((sum, item) =>
        sum + (item.price * item.quantity), 0
    )
)

onMounted(() => {
  console.log('订单页数据:', selectedItems.value)
  isLoading.value = false
})
</script>

<template>
  <div class="order-container">
    <template v-if="!isLoading">
      <h2>订单确认</h2>

      <template v-if="selectedItems.length">
        <div
            v-for="item in selectedItems"
            :key="item.id"
            class="order-item"
        >
          <h3>{{ item.name }}</h3>
          <p class="description">{{ item.description }}</p>
          <div class="detail">
            <span>单价：¥{{ item.price.toFixed(2) }}</span>
            <span>数量：{{ item.quantity }}</span>
            <span>小计：¥{{ (item.price * item.quantity).toFixed(2) }}</span>
          </div>
        </div>

        <div class="total-price">
          订单总金额：¥{{ total.toFixed(2) }}
        </div>
      </template>

      <div v-else class="empty-tip">
        🛒 请先选择要购买的商品
      </div>
    </template>

    <div v-else class="loading">
      ⏳ 数据加载中...
    </div>
  </div>
</template>

<style scoped>
.empty-tip {
  text-align: center;
  font-size: 18px;
  color: #666;
  padding: 50px;
}

.loading {
  text-align: center;
  font-size: 16px;
  color: #999;
  padding: 30px;
}
</style>