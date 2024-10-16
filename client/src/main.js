import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import elementPlus from "element-plus"
import "../node_modules/element-plus/dist/index.css"
import { createPinia } from 'pinia'
import axios from 'axios'
import router from "./router/index.js"
const app = createApp(App)
const pinina = createPinia()
app.use(elementPlus)
app.use(pinina)
//引入axios  by zhengkai.blog.csdn.net

// Vue.prototype.$axios = axios
// axios.defaults.baseURL = '/'  //自动附加在所有axios请求前面，则可以省略/api，直接写'/xxxx/xxx'。否则需要设置'/api/xxxx/xxx'

app.use(router)

app.mount('#app')
