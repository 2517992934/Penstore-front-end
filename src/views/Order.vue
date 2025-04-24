<template>
  <div class="order-container">
    <template v-if="!isLoading">
      <h2>订单确认</h2>
      <h4 style="color: green;">{{ tip }}</h4>
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
import { useUserStore } from '@/stores/user'
const userUserStore = useUserStore()
const cartStore = useCartStore();
const { selectedItems } = storeToRefs(cartStore);
const isLoading = ref(true);
const total = computed(() =>
    selectedItems.value.reduce((sum, item) => sum + (item.price * item.quantity), 0)
);
let id=ref('')
let username=ref('')
// 地址相关状态
const addressType = ref('existing'); // 默认选择现有地址
const existingAddresses = ref<string[]>([]);
const selectedAddress = ref('');
const newAddress = ref('');
const notes = ref('');
const phone = ref('');
const orderId = ref('');
const tip=ref('');


// 初始化地址显示状态
function initAddressVisibility() {
  // 这里可以根据 addressType 的值来控制显示
}

// 提交订单
async function submitOrder() {
  const orderRequest = {
    user_id:id,
    selectedProducts: selectedItems.value.map(item => item.id),
    amount: total.value,
    shipping_address: addressType.value === 'existing' ? selectedAddress.value : newAddress.value,
    note: notes.value,
    phone: phone.value,
    order_status:"待付款",
    username:username
  };

  try {
    const response = await request.post('/orders', orderRequest,{
     headers: {

     }
    });
    console.log('订单提交成功:', response.data);
    orderId.value = response.data;
    tip.value="提交成功，您的订单号是"+orderId.value;


    // 可以在此处添加成功提示或重定向逻辑
  } catch (error) {
    console.error('订单提交失败:', error);
  }
}

// 获取现有地址
async function fetchExistingAddresses() {
  // 现场赋值
   const myget=await userUserStore.myget({})
    id=myget.id;
   username=myget.username;
    const response= await request.get('/orders/addresses', {
      params: {
        id: id,
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
.order-container {
  max-width: 800px;
  margin: 2rem auto;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(12px);
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  color: #2c3e50;
  margin-bottom: 2rem;
  font-size: 2rem;
  font-weight: 600;
}

.order-item {
  width: 100%;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 8px;
  padding: 1.2rem;
  margin-bottom: 1rem;
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(4px);
  transition: all 0.3s ease;
}

.total-price {
  text-align: right;
  font-size: 1.2rem;
  font-weight: 500;
  color: #2c3e50;
  margin: 1.5rem 0;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 8px;
}

form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

form > div {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

label {
  font-weight: 500;
  color: #4a5568;
  margin-bottom: 0.5rem;
}

input[type="text"],
select,
textarea {
  width: 100%;
  padding: 0.8rem 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.8);
  transition: all 0.3s ease;
}

input[type="text"]:focus,
select:focus,
textarea:focus {
  outline: none;
  border-color: #d4af7a;
  box-shadow: 0 0 0 3px rgba(212, 175, 122, 0.2);
}

.submit-btn {
  width: 100%;
  padding: 1rem;
  background: #d4af7a;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 500;
  transition: all 0.3s ease;
}

.submit-btn:hover {
  background: #b6956c;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(212, 175, 122, 0.3);
}

/* 单选按钮样式优化 */
[type="radio"] {
  margin-right: 0.5rem;
  accent-color: #d4af7a;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .order-container {
    margin: 1rem;
    padding: 1.5rem;
  }

  h2 {
    font-size: 1.5rem;
  }

  .order-item {
    padding: 1rem;
  }
}

.empty-tip,
.loading {
  text-align: center;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 8px;
  margin: 1rem 0;
}

/* 现有地址选择框样式 */
#existingAddressContainer {
  position: relative;
}

#existingAddress {
  appearance: none;
  background-image: url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23d4af7a%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E");
  background-repeat: no-repeat;
  background-position: right 0.7rem top 50%;
  background-size: 0.65rem auto;
}
</style>