<script lang="ts" setup>

import Footer from "../components/Footer.vue";
</script>

<template>
  <div>
    home
    <div @click="$router.push({path:'/about'})">点击我</div>
    <Footer/>
  </div>
</template>

<style scoped>

</style>