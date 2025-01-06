<script lang="ts" setup>
import { ref } from "vue";
import { useUserStore } from "../store/user.ts";
import { useRouter } from "vue-router";
import Footer from "../components/Copyright.vue";

const userStore = useUserStore();
const router = useRouter();

const loading = ref(false);
const loginType = ref("account"); // 登录方式:account-账号密码,qrcode-扫码,phone-手机号
const formState = ref({
  username: "",
  password: "",
  phone: "",
  code: "",
});

const rules = {
  username: [{ required: true, message: "请输入用户名" }],
  password: [{ required: true, message: "请输入密码" }],
  phone: [
    { required: true, message: "请输入手机号" },
    { pattern: /^1[3-9]\d{9}$/, message: "请输入正确的手机号" },
  ],
  code: [{ required: true, message: "请输入验证码" }],
};

async function handleLogin() {
  try {
    loading.value = true;
    let success;
    if (loginType.value === "phone") {
      success = await userStore.loginByPhone({
        phone: formState.value.phone,
        code: formState.value.code,
      });
    } else {
      success = await userStore.login(formState.value);
    }
    if (success) {
      router.push("/home");
    }
  } catch (error) {
    console.error("登录失败:", error);
  } finally {
    loading.value = false;
  }
}

// 切换登录方式
function switchLoginType() {
  loginType.value = loginType.value === "account" ? "qrcode" : "account";
}

// 处理扫码登录
function handleQrCodeLogin() {
  // TODO: 实现扫码登录逻辑
  console.log("扫码登录");
}

// 发送验证码
const codeSending = ref(false);
const countdown = ref(0);
let timer = null;

async function sendCode() {
  if (!formState.value.phone) {
    return;
  }
  try {
    codeSending.value = true;
    // TODO: 调用发送验证码接口
    // await userStore.sendCode(formState.value.phone);
    countdown.value = 60;
    timer = setInterval(() => {
      countdown.value--;
      if (countdown.value <= 0) {
        clearInterval(timer);
      }
    }, 1000);
  } catch (error) {
    console.error("发送验证码失败:", error);
  } finally {
    codeSending.value = false;
  }
}
</script>

<template>
  <div class="login-container">
    <div class="login-content">
      <a-card title="系统登录" class="login-card">
        <div class="login-type-switch">
          <a-tabs v-model:activeKey="loginType">
            <a-tab-pane key="account" tab="账号密码登录">
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
            </a-tab-pane>

            <a-tab-pane key="phone" tab="手机号登录">
              <a-form :model="formState" :rules="rules" @finish="handleLogin">
                <a-form-item name="phone">
                  <a-input
                    v-model:value="formState.phone"
                    placeholder="请输入手机号"
                  >
                    <template #prefix>
                      <MobileOutlined />
                    </template>
                  </a-input>
                </a-form-item>

                <a-form-item name="code">
                  <a-space>
                    <a-input
                      v-model:value="formState.code"
                      placeholder="请输入验证码"
                      style="width: 200px"
                    >
                      <template #prefix>
                        <SafetyCertificateOutlined />
                      </template>
                    </a-input>
                    <a-button
                      :disabled="countdown > 0"
                      :loading="codeSending"
                      @click="sendCode"
                    >
                      {{
                        countdown > 0 ? `${countdown}秒后重试` : "获取验证码"
                      }}
                    </a-button>
                  </a-space>
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
            </a-tab-pane>

            <a-tab-pane key="qrcode" tab="扫码登录">
              <div class="qrcode-container">
                <div class="qrcode-box">
                  <!-- 这里放置二维码图片 -->
                  <img alt="扫码登录" class="qrcode-img" />
                </div>
                <p class="qrcode-tip">请使用手机扫描二维码登录</p>
                <a-button type="link" @click="handleQrCodeLogin"
                  >刷新二维码</a-button
                >
              </div>
            </a-tab-pane>
          </a-tabs>
        </div>
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

.qrcode-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0;
}

.qrcode-box {
  width: 200px;
  height: 200px;
  border: 1px solid #eee;
  display: flex;
  justify-content: center;
  align-items: center;
}

.qrcode-img {
  width: 180px;
  height: 180px;
}

.qrcode-tip {
  margin: 16px 0;
  color: #666;
}
</style>
