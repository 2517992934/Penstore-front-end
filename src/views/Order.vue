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
          <div class="item-info">
            {{ item.name }} &nbsp; {{ item.description }} &nbsp; 数量：{{ item.quantity }}
          </div>
        </div>

        <div class="total-price">
          订单总金额：¥{{ total.toFixed(2) }}
        </div>
      </template>

      <div v-else class="empty-tip">
        🛒 请先选择要购买的商品
      </div>

      <!-- 地址选择部分 -->
      <form @submit.prevent="submitOrder">
        <div>
          <label>
            <input type="radio" name="addressType" value="existing" v-model="addressType" @change="initAddressVisibility" /> 使用现有地址
          </label>
          <label>
            <input type="radio" name="addressType" value="new" v-model="addressType" @change="initAddressVisibility" /> 使用新地址
          </label>
        </div>

        <!-- 现有地址列表 -->
        <div v-if="addressType === 'existing'" id="existingAddressContainer">
          <label for="existingAddress">现有地址:</label>
          <select id="existingAddress" v-model="selectedAddress">
            <option v-for="address in existingAddresses" :key="address" :value="address">{{ address }}</option>
          </select>
        </div>

        <!-- 新地址输入 -->
        <div v-if="addressType === 'new'" id="newAddressContainer">
          <label for="newAddress">新地址:</label>
          <input type="text" id="newAddress" v-model="newAddress" />
        </div>

        <div>
          <label for="notes">备注:</label>
          <textarea id="notes" v-model="notes"></textarea>
        </div>
        <div>
          <label for="phone">电话:</label>
          <input type="text" id="phone" v-model="phone" />
        </div>

        <!-- 提交按钮 -->
        <button type="submit" class="submit-btn">提交订单</button>
      </form>
    </template>

    <div v-else class="loading">
      ⏳ 数据加载中...
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useCartStore } from '@/stores/cart';
import { storeToRefs } from 'pinia';
import axios from 'axios';
import request from '@/utils/request';

const cartStore = useCartStore();
const { selectedItems } = storeToRefs(cartStore);
const isLoading = ref(true);
const total = computed(() =>
    selectedItems.value.reduce((sum, item) => sum + (item.price * item.quantity), 0)
);

// 地址相关状态
const addressType = ref('existing'); // 默认选择现有地址
const existingAddresses = ref<string[]>([]);
const selectedAddress = ref('');
const newAddress = ref('');
const notes = ref('');
const phone = ref('');

// 初始化地址显示状态
function initAddressVisibility() {
  // 这里可以根据 addressType 的值来控制显示
}

// 提交订单
async function submitOrder() {
  const orderRequest = {
    user_id:"af306b72-15e6-496d-a68e-a4f3772dde0f",
    selectedProducts: selectedItems.value.map(item => item.id),
    amount: total.value,
    shipping_address: addressType.value === 'existing' ? selectedAddress.value : newAddress.value,
    note: notes.value,
    phone: phone.value,
    order_status:"代付款"
  };

  try {
    const response = await request.post('/orders', orderRequest,{
     headers: {

     }
    });
    console.log('订单提交成功:', response.data);
    // 可以在此处添加成功提示或重定向逻辑
  } catch (error) {
    console.error('订单提交失败:', error);
  }
}

// 获取现有地址
async function fetchExistingAddresses() {

    const response= await request.get('/orders/addresses', {
      params: {
        id: "af306b72-15e6-496d-a68e-a4f3772dde0f",
      }
      })

    existingAddresses.value = response.data; // 假设返回的数据格式是 { data: [...] }



}

// 页面初始化
onMounted(async () => {
  console.log('订单页数据:', selectedItems.value);
  await fetchExistingAddresses(); // 加载地址数据
  isLoading.value = false;
});
</script>

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

.order-item {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 10px;
  margin-bottom: 10px;
  background-color: #f9f9f9;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.item-info {
  display: inline;
}

.submit-btn {
  background: #d4af7a;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 10px;
}

.submit-btn:hover {
  background-color: #4cae4c;
}
</style>
