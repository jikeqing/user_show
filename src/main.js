import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'ant-design-vue/dist/reset.css' // 引入 Ant Design Vue 的样式
import AntDesignVue from 'ant-design-vue' // 引入 Ant Design Vue

const app = createApp(App)

app.use(router)
app.use(AntDesignVue) // 使用 Ant Design Vue

app.mount('#app')