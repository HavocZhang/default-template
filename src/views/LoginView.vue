<script lang="ts" setup>
import { ref } from "vue";
import { useUserStore } from "../store/user.ts";
import { useRouter } from "vue-router";
import Footer from "../components/Footer.vue";

const userStore = useUserStore();
const router = useRouter();

const loading = ref(false);
const formState = ref({
  username: "",
  password: "",
});

const rules = {
  username: [{ required: true, message: "请输入用户名" }],
  password: [{ required: true, message: "请输入密码" }],
};

async function handleLogin() {
  try {
    loading.value = true;
    const success = await userStore.login(formState.value);
    if (success) {
      router.push("/home");
    }
  } catch (error) {
    console.error("登录失败:", error);
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <div class="login-container">
    <div class="login-content">
      <a-card title="系统登录" class="login-card">
        <a-form :model="formState" :rules="rules" @finish="handleLogin">
          <a-form-item name="username">
            <a-input
              v-model:value="formState.username"
              placeholder="请输入用户名"
            >
              <template #prefix>
                <UserOutlined />
              </template>
            </a-input>
          </a-form-item>

          <a-form-item name="password">
            <a-input-password
              v-model:value="formState.password"
              placeholder="请输入密码"
            >
              <template #prefix>
                <LockOutlined />
              </template>
            </a-input-password>
          </a-form-item>
          <a-form-item>
            <a-button
              type="primary"
              html-type="submit"
              :loading="loading"
              block
            >
              登录
            </a-button>
          </a-form-item>
        </a-form>
      </a-card>
    </div>
    <Footer class="login-footer" />
  </div>
</template>

<style scoped>
.login-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f0f2f5;
}

.login-content {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-card {
  width: 100%;
  max-width: 360px;
}

.login-footer {
  margin-top: auto;
}
</style>
