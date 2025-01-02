<script lang="ts" setup>
import { useUserStore } from "../store/user";
import Footer from "./Footer.vue";
import { computed } from "vue";

const userStore = useUserStore();
const userInfo = computed(() => userStore.userInfo);
</script>

<template>
  <a-layout class="layout-container">
    <a-layout-sider class="layout-sider">
      <div class="logo" />
      <a-menu theme="dark" mode="inline">
        <a-menu-item key="1">
          <router-link to="/home">首页</router-link>
        </a-menu-item>
        <a-menu-item key="2">
          <router-link to="/settings">设置</router-link>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>

    <a-layout class="layout-content">
      <a-layout-header class="layout-header">
        <div class="header-right">
          <span>欢迎, {{ userInfo.username }}</span>
          <a-button type="link" @click="userStore.logout">退出</a-button>
        </div>
      </a-layout-header>

      <a-layout-content class="main-content">
        <div class="content-wrapper">
          <router-view v-slot="{ Component }">
            <transition mode="out-in" name="fade">
              <component :is="Component" />
            </transition>
          </router-view>
        </div>
      </a-layout-content>

      <a-layout-footer>
        <Footer />
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>

<style scoped>
.layout-container {
  min-height: 100vh;
}

.layout-sider {
  background: #001529;
}

.logo {
  height: 32px;
  margin: 16px;
  background: rgba(255, 255, 255, 0.2);
}

.layout-content {
  display: flex;
  flex-direction: column;
}

.layout-header {
  background: #fff;
  padding: 0 24px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
}

.header-right {
  display: flex;
  align-items: center;
  gap: 16px;
}

.main-content {
  margin: 24px 16px;
  padding: 24px;
  background: #fff;
  flex: 1;
}

.content-wrapper {
  height: 100%;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
