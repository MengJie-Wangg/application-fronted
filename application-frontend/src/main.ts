
import { createApp } from 'vue'
import App from './App.vue'
import router from './utils/router'
import '@/assets/styles/index.scss'
// 导入pinia
import { createPinia } from "pinia";
const store = createPinia();
//导入elementplus组件库
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.use(router)
app.use(ElementPlus)
app.use(store)
app.mount('#app')
