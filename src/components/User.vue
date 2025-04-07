<script>
import {useRoute} from "vue-router";

export default {
  methods: {useRoute}
}
</script>

<template>
<h1>姓名：{{useRoute().params.username}}</h1>
  <h2>id：{{useRoute().params.id}}</h2>
</template>

<style scoped>

</style>