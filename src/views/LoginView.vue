<script lang="ts" setup>
import {useUserStore} from "../store/user.ts";

const userStore = useUserStore()

async function login() {
  const res = await userStore.login()
  userStore.token = res
}
</script>

<template>
  <div>
    登录
    <a-button type="primary" @click="login">登录</a-button>
  </div>
</template>

<style scoped>

</style>