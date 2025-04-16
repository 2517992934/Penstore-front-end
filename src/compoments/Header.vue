<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'

// 模拟用户数据，实际应该从 API 或 Vuex/Pinia 获取
const user = {
  id: 1,
  username: "张三"
} // 这里替换成你的 Vuex/Pinia 数据

const isLoggedIn = computed(() => user && user.id) // 判断用户是否登录
const router = useRouter()

// 生成动态 URL
const myPageUrl = computed(() => `/mypage?id=${user.id}`)
const sellerUrl = computed(() => `/seller/${user.id}`)

const logout = () => {
  // 执行退出逻辑
  console.log("退出登录")
  router.push('/logout') // 跳转到后端退出接口
}
</script>

<template>
  <div class="header">
    <div class="username">
      <span v-if="isLoggedIn">
        欢迎, <a :href="myPageUrl">{{ user.username }}</a>
        <a href="#" @click.prevent="logout">退出登录</a>
      </span>
      <span v-else>
        你好， <a href="/logsign">请登录</a>
      </span>
    </div>
    <div class="logo">
<!--      <img src="/images/logo.png" alt="peiahuishi">-->
    </div>
    <div class="utility">
      <a :href="sellerUrl">卖家中心</a>
      <a href="/cart">购物车</a>
      <a href="/customerService">消息</a>
    </div>
  </div>
</template>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background: #f8f8f8;
  border-bottom: 1px solid #ddd;
}

.username {
  font-size: 14px;
}

.logo img {
  height: 40px;
}

.utility a {
  margin-left: 15px;
  text-decoration: none;
  color: #333;
}

.utility a:hover {
  color: #007bff;
}
</style>
