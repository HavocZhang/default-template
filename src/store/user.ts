import { defineStore } from "pinia";
import { useLocalStorage } from "@vueuse/core";
import { computed, ref } from "vue";

export const useUserStore = defineStore("user", () => {
  // 用户信息持久化
  const token = useLocalStorage<string>("token", "");
  const userInfo = useLocalStorage<{
    username: string;
    avatar?: string;
    roles?: string[];
  }>("user-info", {
    username: "",
  });

  // 计算属性
  const isAuthenticated = computed(() => token.value !== "");
  const isAdmin = computed(() => userInfo.value.roles?.includes("admin"));

  // 登录方法
  async function login(params: { username: string; password: string }) {
    try {
      // TODO: 调用实际登录接口
      const res = await Promise.resolve({
        token: "1234567890",
        userInfo: {
          username: params.username,
          roles: ["admin"],
        },
      });

      token.value = res.token;
      userInfo.value = res.userInfo;
      return true;
    } catch (err) {
      console.error("登录失败:", err);
      return false;
    }
  }

  // 登出方法
  function logout() {
    token.value = "";
    userInfo.value = {
      username: "",
    };
    window.location.href = "/login";
  }

  return {
    token,
    userInfo,
    isAuthenticated,
    isAdmin,
    login,
    logout,
  };
});
