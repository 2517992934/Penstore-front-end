<template>
  <body>
  <div class="page-wrapper">
    <div class="home">
      <!-- 消息提示 -->
      <transition name="fade">
        <div v-if="successMessage" class="alert alert-success">
          {{ successMessage }}
        </div>
      </transition>
      <transition name="fade">
        <div v-if="errorMessage" class="alert alert-danger">
          {{ errorMessage }}
        </div>
      </transition>

      <!-- 头部 -->
      <header class="header">
        <div class="username">
          <template v-if=id>
            <span>欢迎, <router-link :to="`/mypage/${id}`">{{username }}</router-link></span>
            <a @click="logout">退出登录</a>
          </template>
          <template v-else>
            <span>你好， <router-link to="/login">请登录</router-link></span>
          </template>
        </div>

        <div class="logo">
          <img :src="logoImage" alt="peiahuishi">
        </div>

        <div class="utility">
          <router-link v-if="id" :to="`/seller/${id}`">卖家中心</router-link>
          <a href="/cart">购物车</a>
          <router-link to="/customerService">消息</router-link>
        </div>
      </header>

      <!-- 主体内容 -->

      <div class="container">
        <div class="search-box">
          <form @submit.prevent="searchGoods">
            <input type="text" v-model="searchQuery" placeholder="搜索商品...">
            <button type="submit">搜索</button>
          </form>
        </div>

        <div class="categories">
          <a href="/goods/1" class="category">书写</a>
          <a href="/goods/2" class="category">书法</a>
          <a href="/goods/3" class="category">绘画</a>
          <a href="/goods/4" class="category">儿童</a>
          <a href="/goods/5" class="category">相关</a>
        </div>
      </div>



        <!-- 轮播图 -->
        <div class="slider">
          <div class="slide-viewer">
            <div class="slide-group" ref="slideGroupRef">
              <div
                v-for="(slide, index) in slides"
                :key="index"
                class="slide"
                :class="{ active: activeSlide === index }"
              >
                <img :src="slide.image" :alt="`slide${index + 1}`">
              </div>
            </div>
          </div>
          <!--左右箭头按钮-->
          <button class="arrow left" @click="prevSlide"><</button>
          <button class="arrow right" @click="prevSlide">></button>
          <!--底部圆点按钮-->
          <div class="slide-buttons">
            <button
              v-for="(_, index) in slides"
              :key="index"
              :class="{ active: activeSlide === index }"
              @click="activeSlide = index;updateSlideTransform()"
            ></button>
          </div>
        </div>
    </div>
  </div>
  </body>
  </template>

  <script setup>
  import { ref, computed, onMounted, watch } from 'vue'
  import { useRouter } from 'vue-router'
  import { useUserStore } from '@/stores/user'
  import logoImage from '/images/logo.png'


  // 轮播图图片导入
  import slide1 from '/images/slide.webp'
  import slide2 from '/images/slide.jpg'
  import slide3 from '/images/slide2.webp'
  import slide4 from '/images/slide5.png'
  import request from "@/utils/request.js";

  const router = useRouter()
  const userUserStore = useUserStore()

  // 响应式数据
  const searchQuery = ref('')
  const suggestions = ref([])
  const activeSlide = ref(0)
  const slideGroupRef=ref(null)
  const successMessage = ref('')
  const errorMessage = ref('')
  const id=ref('')
  const username = ref('')
  const email = ref('')

  // 静态数据
  const categories = ref([
    { id: 1, name: '书写' },
    { id: 2, name: '书法' },
    { id: 3, name: '绘画' },
    { id: 4, name: '儿童' },
    { id: 5, name: '相关' }
  ])

  const slides = ref([
    { image: slide1 },
    { image: slide2 },
    { image: slide3 },
    { image: slide4 }
  ])
  watch(activeSlide, (newIndex) => {
  if (slideGroupRef.value) {
    slideGroupRef.value.style.transform = `translateX(-${newIndex * 100}%)`
  }
})
  const updateSlideTransform = () => {
  if (slideGroupRef.value) {
    slideGroupRef.value.style.transform = `translateX(-${activeSlide.value * 100}%)`
  }
}

  // 自动轮播逻辑
  let slideInterval

  onMounted(async () => {
    await getpinia();
    startAutoPlay()
    loadMessages()
    updateSlideTransform()
  })
  async function getpinia() {
    // 现场赋值
    const myget=await userUserStore.myget({})
    id.value=myget.id;
    username.value=myget.username;
    email.value=myget.email;
  }

  // 消息自动消失
  watch([successMessage, errorMessage], ([newSuccess, newError]) => {
    if (newSuccess || newError) {
      setTimeout(() => {
        successMessage.value = ''
        errorMessage.value = ''
      }, 3000)
    }
  })

  // 方法
  const prevSlide = () => {
  activeSlide.value = (activeSlide.value - 1 + slides.value.length) % slides.value.length
  updateSlideTransform()
}


const nextSlide = () => {
  activeSlide.value = (activeSlide.value + 1) % slides.value.length
  updateSlideTransform()
}
  const startAutoPlay = () => {
    slideInterval = setInterval(() => {
      activeSlide.value = (activeSlide.value + 1) % slides.value.length
      updateSlideTransform()
    }, 2000)
  }

  const handleSearch = () => {
    router.push({ path: '/goods/search', query: { q: searchQuery.value } })
  }

  const handleInput = async () => {
    if (searchQuery.value.length > 2) {
      try {
        const response = await fetch(`/api/suggestions?q=${searchQuery.value}`)
        suggestions.value = await response.json()
      } catch (error) {
        console.error('获取建议失败:', error)
      }
    }
  }

  const selectSuggestion = (suggestion) => {
    searchQuery.value = suggestion
    handleSearch()
  }

  const logout = async () => {
    try {
      await userStore.logout()
      router.push('/login')
    } catch (error) {
      errorMessage.value = '注销失败，请重试'
    }
  }

  const loadMessages = () => {

    const queryParams = new URLSearchParams(window.location.search)
    successMessage.value = queryParams.get('success') || ''
    errorMessage.value = queryParams.get('error') || ''
  }
  </script>


  <style scoped>
  /* 基础设置 */
  html, body {
    margin: 0;
    padding: 0;
    width: 100vw;
    height: 100vh;
    font-family: 'Helvetica Neue', sans-serif;
    background: #ffffff;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow-x: hidden;
  }

  /* 外层容器：控制页面大小与居中 */
  .page-wrapper {
    width: 100%;
    min-height: 100vh;
    background: #ffffff;
    border-radius: 16px;
    justify-content: flex-start;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
    padding: 3rem 2rem;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  /* Header */
  .header {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
  }
  .logo img {
    height: 60px;
  }
  .username a {
    text-decoration: none;
    color: #333;
    margin-left: 12px;
  }
  .utility a {
    text-decoration: none;
    color: #555;
    padding: 6px 12px;
    border-radius: 4px;
    transition: background 0.2s;
  }
  .utility a:hover {
    background-color: #eaeaea;
  }

  /* 搜索框 */
  .search-box {
    margin-bottom: 2rem;
    text-align: center;
  }
  .search-box input {
    padding: 0.8rem 1rem;
    width: 350px;
    border: 1px solid #ccc;
    border-radius: 6px;
    font-size: 16px;
  }
  .search-box button {
    margin-left: 10px;
    padding: 0.8rem 1.2rem;
    background-color: #333;
    color: #fff;
    border: none;
    border-radius: 6px;
    cursor: pointer;
  }
  .search-box button:hover {
    background-color: #555;
  }

  /* 自动建议 */
  .suggestions {
    position: absolute;
    top: calc(100% + 8px);
    left: 50%;
    transform: translateX(-50%);
    width: 350px;
    background: white;
    border: 1px solid #ccc;
    border-radius: 6px;
    box-shadow: 0 4px 10px rgba(0,0,0,0.1);
    z-index: 100;
  }
  .suggestions div {
    padding: 0.6rem 1rem;
    cursor: pointer;
  }
  .suggestions div:hover {
    background-color: #f0f0f0;
  }

  /* 分类 */
  .categories {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 1rem;
    margin: 2rem 0;
  }

  .category {
    padding: 10px 24px;
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.05);
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
  }

  .category:hover {
    background: #4CAF50;
    color: white;
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(76,175,80,0.2);
  }

  /* 轮播图 */
  .slider {
    width: 100%;
    max-width: 1000px;
    height: 400px;
    margin: 2rem 0;
    position: relative;
    overflow: hidden;
    border-radius: 16px;
    box-shadow: 0 6px 20px rgba(0,0,0,0.1);
  }
  .slide-group {
    display: flex;
    transition: transform 0.5s ease-in-out;
  }
  .slide {
    flex: 0 0 100%;
  }
  .slide img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .arrow {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(0,0,0,0.4);
    color: #fff;
    border: none;
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    cursor: pointer;
  }
  .arrow.left {
    left: 1rem;
  }
  .arrow.right {
    right: 1rem;
  }
  .slide-buttons {
    position: absolute;
    bottom: 1rem;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 6px;
  }
  .slide-buttons button {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: #ccc;
    border: none;
    opacity: 0.6;
  }
  .slide-buttons button.active {
    background-color: #007bff;
    opacity: 1;
  }

  /* 提示框 */
  .alert {
    margin: 1rem 0;
    padding: 1rem;
    max-width: 700px;
    text-align: center;
    border-radius: 6px;
  }
  .alert-success {
    background-color: #e1f3e8;
    color: #276738;
  }
  .alert-danger {
    background-color: #f9d6d5;
    color: #842029;
  }

  /* 页脚 */
  footer {
    margin-top: 2rem;
    text-align: center;
    width: 100%;
    padding-top: 1rem;
    border-top: 1px solid #ddd;
    color: #666;
  }
  </style>

