<script lang="ts" setup>
import HelloWorld from "../components/HelloWorld.vue";
import { onBeforeRouteLeave, onBeforeRouteUpdate } from "vue-router";
import type { RouteLocationNormalized } from "vue-router";

// 路由离开守卫
onBeforeRouteLeave(
  (to: RouteLocationNormalized, from: RouteLocationNormalized) => {
    console.log("路由即将离开:", { from: from.path, to: to.path });

    const answer = window.confirm("确定要离开吗?您有未保存的更改!");
    return answer; // 直接返回布尔值控制导航
  }
);

// 路由更新守卫
onBeforeRouteUpdate(
  async (to: RouteLocationNormalized, from: RouteLocationNormalized) => {
    console.log("路由即将更新:", { from: from.path, to: to.path });

    // 仅当路由参数id变化时才获取新数据
    if (to.params.id !== from.params.id) {
      try {
        // const userData = await fetchUser(to.params.id as string);
        // TODO: 处理获取到的用户数据
      } catch (error) {
        console.error("获取用户数据失败:", error);
      }
    }
  }
);
</script>

<template>
  <div class="about-view">
    <h1>关于页面</h1>
  </div>
</template>

<style scoped>
.about-view {
  padding: 20px;
}
</style>
