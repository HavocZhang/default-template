<script lang="ts" setup>
import { useUserStore } from "../store/user";
import Footer from "./Copyright.vue";
import { computed, ref, watch } from "vue";
import { useRouter, useRoute } from "vue-router";

const userStore = useUserStore();
const userInfo = computed(() => userStore.userInfo);
const router = useRouter();
const route = useRoute();

// 根据路由生成菜单项
const menuItems = computed(() => {
  const routes = router.options.routes;
  // 获取主布局下的子路由
  const mainRoutes = routes.find((route) => route.path === "/")?.children || [];
  return mainRoutes.map((route) => ({
    key: route.path,
    label: route.meta?.title,
    path: `/${route.path}`,
  }));
});

// 标签页相关
const tabs = ref([
  {
    key: "home",
    title: "首页",
    path: "/home",
    closable: false,
  },
]);
const activeKey = ref("home");

// 添加标签页
const addTab = (route) => {
  const { path, meta } = route;
  const key = path.split("/")[1];
  if (!tabs.value.find((tab) => tab.key === key)) {
    tabs.value.push({
      key,
      title: meta.title,
      path,
      closable: key !== "home",
    });
  }
  activeKey.value = key;
};

// 监听路由变化添加标签
watch(
  route,
  (newRoute) => {
    addTab(newRoute);
  },
  { immediate: true }
);

// 关闭标签
const removeTab = (targetKey: string) => {
  const targetIndex = tabs.value.findIndex((tab) => tab.key === targetKey);
  tabs.value = tabs.value.filter((tab) => tab.key !== targetKey);

  if (activeKey.value === targetKey) {
    activeKey.value = tabs.value[targetIndex - 1]?.key || tabs.value[0].key;
    router.push(tabs.value.find((tab) => tab.key === activeKey.value).path);
  }
};

// 关闭其他标签
const closeOtherTabs = (targetKey: string) => {
  tabs.value = tabs.value.filter(
    (tab) => !tab.closable || tab.key === targetKey
  );
  activeKey.value = targetKey;
};

// 关闭左侧标签
const closeLeftTabs = (targetKey: string) => {
  const targetIndex = tabs.value.findIndex((tab) => tab.key === targetKey);
  tabs.value = tabs.value.filter(
    (tab, index) => !tab.closable || index >= targetIndex
  );
  activeKey.value = targetKey;
};

// 关闭右侧标签
const closeRightTabs = (targetKey: string) => {
  const targetIndex = tabs.value.findIndex((tab) => tab.key === targetKey);
  tabs.value = tabs.value.filter(
    (tab, index) => !tab.closable || index <= targetIndex
  );
  activeKey.value = targetKey;
};

// 刷新当前页
const refreshCurrentPage = async () => {
  const { fullPath } = route;
  const targetPath = "/redirect" + fullPath;
  try {
    await router.replace(targetPath);
    router.replace(fullPath);
  } catch (error) {
    console.error("页面刷新失败:", error);
  }
};

// 右键菜单相关
const contextMenuVisible = ref(false);
const contextMenuPosition = ref({ x: 0, y: 0 });
const contextMenuTargetKey = ref("");

const showContextMenu = (e: MouseEvent, tab) => {
  e.preventDefault();
  contextMenuVisible.value = true;
  contextMenuPosition.value = {
    x: e.clientX,
    y: e.clientY,
  };
  contextMenuTargetKey.value = tab.key;
};

const hideContextMenu = () => {
  contextMenuVisible.value = false;
};
</script>

<template>
  <a-layout class="layout-container" @click="hideContextMenu">
    <a-layout-sider class="layout-sider">
      <div class="logo" />
      <a-menu
        theme="dark"
        mode="inline"
        :selectedKeys="[$route.path.split('/')[1]]"
      >
        <a-menu-item v-for="item in menuItems" :key="item.key">
          <router-link :to="item.path">{{ item.label }}</router-link>
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

      <div class="tabs-bar">
        <div class="tabs-wrapper">
          <div
            v-for="tab in tabs"
            :key="tab.key"
            class="tab-item"
            :class="{ active: activeKey === tab.key }"
            @click="router.push(tab.path)"
            @contextmenu="showContextMenu($event, tab)"
          >
            <span>{{ tab.title }}</span>
            <span
              v-if="tab.closable"
              class="close-icon"
              @click.stop="removeTab(tab.key)"
              >×</span
            >
          </div>
        </div>

        <div class="tabs-extra">
          <a-dropdown>
            <template #overlay>
              <a-menu>
                <a-menu-item @click="refreshCurrentPage"
                  >刷新当前页</a-menu-item
                >
                <a-menu-item @click="closeOtherTabs(activeKey)"
                  >关闭其他</a-menu-item
                >
                <a-menu-item @click="closeLeftTabs(activeKey)"
                  >关闭左侧</a-menu-item
                >
                <a-menu-item @click="closeRightTabs(activeKey)"
                  >关闭右侧</a-menu-item
                >
              </a-menu>
            </template>
            <a-button type="text">
              <SettingOutlined />
            </a-button>
          </a-dropdown>
        </div>
      </div>

      <!-- 右键菜单 -->
      <a-menu
        v-if="contextMenuVisible"
        :style="{
          position: 'fixed',
          left: contextMenuPosition.x + 'px',
          top: contextMenuPosition.y + 'px',
          zIndex: 1000,
        }"
        class="context-menu"
      >
        <a-menu-item @click="refreshCurrentPage">刷新当前页</a-menu-item>
        <a-menu-item @click="closeOtherTabs(contextMenuTargetKey)"
          >关闭其他</a-menu-item
        >
        <a-menu-item @click="closeLeftTabs(contextMenuTargetKey)"
          >关闭左侧</a-menu-item
        >
        <a-menu-item @click="closeRightTabs(contextMenuTargetKey)"
          >关闭右侧</a-menu-item
        >
      </a-menu>

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

.tabs-bar {
  margin: 6px 4px 0;
  background: #fff;
  padding: 6px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #f0f0f0;
}

.tabs-wrapper {
  flex: 1;
  display: flex;
  overflow-x: auto;
}

.tab-item {
  padding: 8px 16px;
  background: #fafafa;
  border: 1px solid #f0f0f0;
  border-radius: 2px;
  margin-right: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  white-space: nowrap;
}

.tab-item:hover {
  color: #1890ff;
}

.tab-item.active {
  background: #fff;
  border-color: #1890ff;
  color: #1890ff;
}

.close-icon {
  width: 16px;
  height: 16px;
  line-height: 16px;
  text-align: center;
  border-radius: 50%;
}

.close-icon:hover {
  background: rgba(0, 0, 0, 0.06);
}

.tabs-extra {
  margin-left: 8px;
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

.context-menu {
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}
</style>
