<template>

    <div class="table">
      <table id="cartTable">
        <thead>
        <h1>{{message}}</h1>
        <tr>
          <th>
            <input
                type="checkbox"
                v-model="allChosen"
                @change="handleSelectAll"
            /> 全选
          </th>
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
                :value="item.id"
                v-model="selectedItems"
                @change="handleItemSelect(item.id)"
            />
          </td>
          <td>{{ item.name }}</td>
          <td>{{ item.description }}</td>
          <td class="money">¥{{ item.price.toFixed(2) }}</td>
          <td class="amount">
            <span>{{ item.quantity }}</span>
            <button @click="modifyQuantity(item.id, 'increase')">+</button>
            <button
                @click="modifyQuantity(item.id, 'decrease')"
                :disabled="item.quantity <= 1"
            >-</button>
          </td>
          <td>
            <button @click="deleteItem(item.id)">删除</button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>

   

</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import request from '@/utils/request'
import { useRouter } from 'vue-router'
import { useCartStore } from '@/stores/cart'
import { storeToRefs } from 'pinia'


// 响应式数据
const cartItems = ref([])
const selectedItems = ref([])
const totalPrice = ref(0)
const allChosen = ref(false)
const router = useRouter()
const cartStore = useCartStore()
const message = ref('')


// 初始化加载购物车
const fetchCart = async () => {
  try {
    const response = await request.get('/cart', {
      params: { id: "af306b72-15e6-496d-a68e-a4f3772dde0f" }
    })

    cartItems.value = response.data.items
    totalPrice.value = response.data.totalPrice
    allChosen.value = response.data.allChosen
    selectedItems.value = response.data.items
        .filter(item => item.isChosen)
        .map(item => item.id)
    cartStore.updateSelected(
        response.data.items.filter(item => item.isChosen)
    )
  } catch (error) {
   message.value = "购物车为空"

  }
}

// 全选处理
const handleSelectAll = async () => {
  try {
    // 批量更新每个商品的选中状态
    await Promise.all(
        cartItems.value.map(item =>
            request.put(`/cart/items/${item.id}/chosen`, null, {
              params: {
                id: "af306b72-15e6-496d-a68e-a4f3772dde0f",
                isChosen: !allChosen.value }
            })
        )
    )
    await fetchCart() // 刷新数据
  } catch (error) {
    allChosen.value = !allChosen.value
    ElMessage.error('全选操作失败')
  }
}

// 单个商品选中处理
const handleItemSelect = async (productId) => {
  try {
    const isSelected = selectedItems.value.includes(productId)
    await request.put(`/cart/items/${productId}/chosen`,null,{
      params: {
        id: "af306b72-15e6-496d-a68e-a4f3772dde0f",
        isChosen: isSelected
      }
    })
    await fetchCart() // 刷新数据
  } catch (error) {
    ElMessage.error('选择操作失败')
  }
}

// 数量修改
const modifyQuantity = async (productId, operation) => {
  try {
    const response = await request.put(`/cart/items/${productId}/quantity`, null,{
      params: {
        id: "af306b72-15e6-496d-a68e-a4f3772dde0f",
        operation }
    })

    // 本地更新
    const item = cartItems.value.find(i => i.id === productId)
    // if (item) {
    //   item.quantity = response.data.quantity
    //   totalPrice.value = response.data.totalPrice
    // }
    await fetchCart()
  } catch (error) {
    ElMessage.error('数量修改失败')
    await fetchCart()
  }
}

// 删除商品
const deleteItem = async (productId) => {
  try {
    await ElMessageBox.confirm('确定删除该商品吗？', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消'
    })

    await request.delete(`/cart/items/${productId}`, {
      params: { id: "af306b72-15e6-496d-a68e-a4f3772dde0f" }
    })

    // 本地更新
    cartItems.value = cartItems.value.filter(item => item.id !== productId)
    selectedItems.value = selectedItems.value.filter(id => id !== productId)
    totalPrice.value = cartItems.value.reduce(
        (sum, item) => sum + (item.price * item.quantity), 0
    )
    cartStore.setSelectedItems(
        response.data.items.filter(item => item.isChosen)
    )
  } catch (error) {
    if (error !== 'cancel') {
      ElMessage.error('删除失败')
      await fetchCart()
    }
  }
}
const handleCheckout = () => {
  if (selectedItems.value.length === 0) {
    ElMessage.warning('请选择要结算的商品')
    return
  }

  router.push({
    name: 'Order',

  })
}

// 初始化加载
onMounted(fetchCart)
</script>

<style scoped>
/* 保持原有样式不变 */
.cart-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

th, td {
  padding: 12px;
  border-bottom: 1px solid #eee;
  text-align: center;
}

th {
  background-color: #f5f7fa;
}

button {
  padding: 6px 12px;
  margin: 0 4px;
  border-radius: 4px;
  cursor: pointer;
  background-color: #409eff;
  color: white;
  border: none;
}

.checkout-area {
  margin-top: 30px;
  text-align: right;
  padding: 20px;
  background: #f5f7fa;
  border-radius: 4px;
}

.total-price {
  font-size: 18px;
  margin-bottom: 20px;
  color: #f56c6c;
}
</style>