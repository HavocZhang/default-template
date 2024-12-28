<script lang="ts" setup>
import HelloWorld from "../components/HelloWorld.vue";
import {onBeforeRouteLeave, onBeforeRouteUpdate} from "vue-router";

onBeforeRouteLeave(() => {
  console.log("beforeRouteLeave");
  const answer = window.confirm(
      'Do you really want to leave? you have unsaved changes!'
  )
  // 取消导航并停留在同一页面上
  if (!answer) return false
})

// 与 beforeRouteUpdate 相同，无法访问 `this`
onBeforeRouteUpdate(async (to, from) => {
  console.log("beforeRouteUpdate");
  //仅当 id 更改时才获取用户，例如仅 query 或 hash 值已更改
  if (to.params.id !== from.params.id) {
    // userData.value = await fetchUser(to.params.id)
  }
})
</script>

<template>
  <div>
    about
    <HelloWorld msg="Welcome to the world!"/>
  </div>
</template>

<style scoped>

</style>