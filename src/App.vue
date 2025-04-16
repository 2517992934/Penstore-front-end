<script setup>
import { RouterView } from 'vue-router'
import Header from '@/compoments/Header.vue'
</script>

<template>
  <div class="app-container">
    <!-- 头部导航 -->
    <Header />

    <!-- 主要内容区域 -->
    <main class="main-content">
      <RouterView /> <!-- 路由内容显示区域 -->
    </main>

    <!-- 页脚（可选） -->
    <footer class="app-footer">
      <p>© 2024 Your Company. All rights reserved.</p>
    </footer>
  </div>
</template>

<style>
/* 全局样式 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
  padding: 20px;
}

.app-footer {
  background: #f8f9fa;
  padding: 20px;
  text-align: center;
  border-top: 1px solid #dee2e6;
}
</style>