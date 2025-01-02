<script lang="ts" setup>
import { useRouter } from "vue-router";

const router = useRouter();

const handleBackHome = () => {
  router.push("/home");
};
</script>

<template>
  <a-result status="404" title="404" sub-title="抱歉,您访问的页面不存在">
    <template #extra>
      <a-button type="primary" @click="handleBackHome"> 返回首页 </a-button>
    </template>
  </a-result>
</template>

<style scoped>
.ant-result {
  padding: 48px 32px;
}
</style>
