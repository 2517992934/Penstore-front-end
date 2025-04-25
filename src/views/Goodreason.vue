<template>
  <div>
    <p>对于输入： {{ value }}的搜索结果：</p>
    <div v-if="goods.length > 0" class="goods-list">
      <div v-for="good in goods" :key="good.id" class="product">
        <img :src="good.image_url ? '/' + good.image_url : '/default-image.png'" :alt="good.name" />
        <h2>{{ good.name }}</h2>
        <p>价格: ￥{{ good.price }}</p>
        <p>库存: {{ good.stock }}</p>
        <a :href="`/goods/details/${good.id}`">查看详情</a>
      </div>
    </div>
    <div v-else>
      <p>没有商品可显示</p>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { ref, onMounted } from 'vue';
import { useUserStore } from '@/stores/user';
import { useGoodsStore } from '@/stores/goods';
import request from "@/utils/request.js";

// 使用 useRoute 获取路由参数
const route = useRoute();
const value = route.params.searchQuery; // 获取 URL 中的 searchQuery 参数

const goods = ref([]); // 定义 goods 为响应式数组
const userUserStore = useUserStore();
const goodsStore = useGoodsStore();

onMounted(async () => {
  try {
    const res = await request.get('/goods/searchInputServlet', {
      params: {
        id: value
      }
    });

    console.log(res);
    goods.value = res; // 将 API 返回的数据赋值给 goods
    console.log(goods.value);
    console.log(goods.value.length);
  } catch (error) {
    console.error('获取商品列表失败:', error);
  }
});
</script>

<style scoped>
.goods-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.product {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 16px;
  width: 200px;
  text-align: center;
}

.product img {
  max-width: 100%;
  height: auto;
  border-radius: 4px;
}
</style>
