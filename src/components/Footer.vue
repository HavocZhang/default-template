<script lang="ts" setup>
// 使用计算属性获取当前年份
import { computed } from "vue";

const year = computed(() => new Date().getFullYear().toString());

// 从环境变量中获取配置信息
const {
  VITE_APP_COMPANY: company,
  VITE_APP_GWB: gwb,
  VITE_APP_GWB_CODE: gwbCode,
  VITE_APP_ICP: icp,
} = import.meta.env;
</script>

<template>
  <footer class="footer">
    <p class="text">Copyright &copy; {{ year }} {{ company }}</p>
    <div class="text">
      <div class="logo-wrapper">
        <img alt="公安备案图标" class="logo" src="/images/galogo.png" />
      </div>
      <a
        :href="`https://beian.mps.gov.cn/#/query/webSearch?code=${gwbCode}`"
        class="link"
        rel="noreferrer"
        target="_blank"
        >{{ gwb }}</a
      >
      <a
        class="link"
        href="https://beian.miit.gov.cn/#/Integrated/index"
        target="_blank"
        >{{ icp }}</a
      >
    </div>
  </footer>
</template>

<style scoped>
.footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
}

.text {
  font-family: MicrosoftYaHei, sans-serif;
  font-size: 12px;
  line-height: 1.5;
  display: flex;
  align-items: center;
  margin: 5px 0;
  color: #666;
}

.logo-wrapper {
  width: 16px;
  height: 16px;
  margin-right: 4px;
}

.logo {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.link {
  color: inherit;
  text-decoration: none;
  transition: color 0.2s;
  margin-left: 20px;
}

.link:first-of-type {
  margin-left: 0;
}

.link:hover {
  color: #1890ff;
}
</style>
