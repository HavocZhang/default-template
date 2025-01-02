import { createApp } from "vue";
import { createPinia } from "pinia";
import { router } from "./router";
import App from "./App.vue";

// 样式导入
import "ant-design-vue/dist/reset.css";
import "./styles/transition.css";
import "./styles/reset.css";
import "virtual:uno.css";

// 创建应用实例
const app = createApp(App);

// 注册插件
app.use(createPinia()).use(router).mount("#app");
