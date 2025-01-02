import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";

import HomeView from "./views/HomeView.vue";
import AboutView from "./views/AboutView.vue";
import LoginView from "./views/LoginView.vue";
import NotFound from "./components/NotFound.vue";
import UserSettings from "./views/UserSettings.vue";
import UserEmailsSubscriptions from "./views/UserEmailsSubscriptions.vue";
import UserProfile from "./views/UserProfile.vue";
import UserProfilePreview from "./views/UserProfilePreview.vue";
import { useUserStore } from "./store/user.ts";
import BaseLayout from "./components/BaseLayout.vue";

// 定义路由配置
const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: BaseLayout,
    redirect: "/home",
    children: [
      {
        path: "home",
        name: "Home",
        component: HomeView,
        meta: {
          requiresAuth: true,
          isAdmin: true,
          title: "首页",
        },
      },
      {
        path: "about",
        name: "About",
        component: AboutView,
        meta: {
          title: "关于",
        },
      },
    ],
  },
  {
    path: "/settings",
    name: "Settings",
    component: UserSettings,
    meta: {
      requiresAuth: true,
      title: "设置",
    },
    children: [
      {
        path: "emails",
        name: "Emails",
        component: UserEmailsSubscriptions,
        meta: {
          title: "邮件订阅",
        },
      },
      {
        path: "profile",
        name: "Profile",
        components: {
          default: UserProfile,
          helper: UserProfilePreview,
        },
        meta: {
          title: "个人资料",
        },
      },
    ],
  },
  {
    path: "/login",
    name: "Login",
    component: LoginView,
    meta: {
      title: "登录",
    },
  },
  // ... 其他路由配置 ...
  {
    path: "/redirect/:path(.*)",
    component: BaseLayout,
    meta: { hidden: true },
    beforeEnter: (to, from, next) => {
      const {
        params: { path },
      } = to;
      next("/" + path);
    },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: NotFound,
    meta: {
      title: "404",
    },
  },
];

// 创建路由实例
export const router = createRouter({
  history: createWebHistory(),
  routes,
});

// 全局前置守卫
router.beforeEach(async (to) => {
  // 设置页面标题
  document.title = `${to.meta.title || "默认标题"} - 我的应用`;

  const userStore = useUserStore();
  // 检查是否需要登录认证
  if (to.meta.requiresAuth && !userStore.isAuthenticated) {
    return {
      name: "Login",
      query: { redirect: to.fullPath },
    };
  }

  // 添加返回 true 允许导航继续
  return true;
});
