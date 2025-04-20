<template>

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

// 全选相关逻辑
const selectAll = ref(false)
const isIndeterminate = computed(() => {
  const selectedCount = cartItems.value.filter(item => item.selected).length
  return selectedCount > 0 && selectedCount < cartItems.value.length
})

const handleSelectAll = (val) => {
  cartItems.value.forEach(item => {
    item.selected = val
  })
  updateTotalPrice()
}

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