<script setup>
import axios from "axios"
import {ref} from "vue";
//准备api
const message = ref("Hello, Vue 3!");
const goodsData = ref(null);
const fetchGoods = async () => {
  try {
    const response = await axios.get("/api/goods/1");
    goodsData.value = response.data;
    message.value = "Data loaded successfully!";
  } catch (error) {
    console.error("Error fetching goods:", error);
    message.value = "Failed to load data.";
  }
};
//Call the function when the component is mounted
fetchGoods();
</script>

<template>
hello world
  hello
  <div>
    <p>{{message}}</p>
    <pre>{{goodsData}}</pre>
  </div>
</template>

<style scoped>

</style>