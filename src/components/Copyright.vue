<script lang="ts" setup>
// 使用计算属性获取当前年份
import { computed } from "vue";
import useSettingsStore from "@/store/settings";
const year = computed(() => new Date().getFullYear().toString());
const settingsStore = useSettingsStore();
</script>

<template>
  <footer v-if="settingsStore.settings.copyright.enable" class="copyright">
    <p class="text">
      Copyright &copy; {{ year }} {{ settingsStore.settings.copyright.company }}
    </p>
    <div class="text">
      <div class="logo-wrapper">
        <img alt="公安备案图标" class="logo" src="/images/galogo.png" />
      </div>
      <a
        :href="`https://beian.mps.gov.cn/#/query/webSearch?code=${settingsStore.settings.copyright.gwbCode}`"
        class="link"
        rel="noreferrer"
        target="_blank"
        >{{ settingsStore.settings.copyright.gwb }}</a
      >
      <a
        class="link"
        href="https://beian.miit.gov.cn/#/Integrated/index"
        target="_blank"
        >{{ settingsStore.settings.copyright.icp }}</a
      >
    </div>
  </footer>
</template>

<style scoped>
.copyright {
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
