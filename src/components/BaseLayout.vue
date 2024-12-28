<script lang="ts" setup>

import Footer from "./Footer.vue";
</script>

<template>
  <a-layout class="w-full h-full">
    <a-layout-sider class="h-100vh">Sider</a-layout-sider>
    <a-layout class="h-full flex flex-col">
      <a-layout-header>Header</a-layout-header>
      <a-layout-content>
        <div class="flex-1 p-16px flex flex-col">
          <router-view v-slot="{ Component }" class="flex-1">
            <transition mode="out-in" name="fade">
              <component :is="Component"/>
            </transition>
          </router-view>
        </div>
      </a-layout-content>
      <a-layout-footer>
        <Footer/>
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>

<style scoped>
</style>