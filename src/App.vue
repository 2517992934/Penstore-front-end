<script>
import HelloWorld from './components/HelloWorld.vue'
import TheWelcome from './components/TheWelcome.vue'
export default {
  name: 'App',
  components: {}
}
</script>

<template>
  <h1>HelloWorld</h1>
  <p>
    <router-link to="/demo1">页面1</router-link>
    <router-link to="/demo2">页面2</router-link>
    <router-view></router-view>
    <a href="/home.html">点击跳转主页</a>
  </p>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
