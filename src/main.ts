import {createApp} from 'vue'
import 'ant-design-vue/dist/reset.css';
import App from './App.vue'
import {router} from "./router";
import {createPinia} from "pinia";
import './styles/transition.css'
import './styles/reset.css'
import 'virtual:uno.css'

const pinia = createPinia()
const app = createApp(App);
app.use(pinia);
app.use(router)
app.mount('#app')
