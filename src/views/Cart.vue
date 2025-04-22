
<!--<template>-->

<!--  <div v-for="item in cartItems" :key="item.id">-->
<!--    {{ item.id }}-->
<!--  </div>-->
<!--</template>-->
<!--e-->
<template>
  <div>

      <div class="table">
        <table id="cartTable">
          <thead>
          <tr>
            <th><input type="checkbox" class="product-checkbox" id="selectAll"/>全选</th>
            <th>商品名称</th>
            <th>描述</th>
            <th class="money">单价</th>
            <th class="amount">数量</th>
            <th>操作</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="item in cartItems" :key="item.id" :id="`product_${item.id}`">
            <td>
              <input
                  type="checkbox"
                  class="product-checkbox"
                  :value="item.id"
                  v-model="selectedItems"
              />
            </td>
            <td>{{ item.name }}</td>
            <td>{{ item.description }}</td>
            <td class="money">¥{{ item.price.toFixed(2) }}</td>
            <td class="amount">
              <span :id="item.id" class="quantity">{{ item.quantity }}</span>
            </td>
            <td>
              <button type="button" @click="modifyQuantity(item.id, 'increase')">增加</button>
              <button type="button" @click="modifyQuantity(item.id, 'decrease')">减少</button>
              <button type="button" @click="deleteItem(item.id)">删除</button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>

  </div>
</template>

<script setup  >
import { ref, computed, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useRouter } from 'vue-router'
import axios from '@/utils/request'
import request from "@/utils/request";

const router = useRouter()

// 响应式数据
const cartItems = ref([])

const totalPrice = ref(0)
const isSubmitting = ref(false)



const fetchCart = async () => {
  try {
    const response =await request.get('/jj/cart',{
      params: {
        userId: "af306b72-15e6-496d-a68e-a4f3772dde0f"
      }
        }


    )
    cartItems.value = response.items || []
    totalPrice.value = response.totalPrice ?? 0
  } catch (error) {
    console.error('获取购物车失败', error)
  }
}
onMounted(() => {
  fetchCart();
});



</script>


<style scoped>
.cart-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.checkout-area {
  margin-top: 30px;
  text-align: right;
  padding: 20px;
  background: #f5f7fa;
  border-radius: 4px;
}

.total-price {
  margin-bottom: 20px;
}

.back-home {
  margin-top: 20px;
  text-align: center;
}
</style>