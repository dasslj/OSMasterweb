import { createRouter, createWebHistory } from "vue-router"
import chatPage from "../page/chatPage.vue"
import otherPage from "../page/otherPage.vue"
const routes = [
    { path: "/chatWeb", name: "对话页", component: chatPage },
    { path: "/other", name: "其他内容页", component: otherPage },
    { path: "/", redirect: "/chatWeb" }

]

const router = createRouter({
    routes,
    history: createWebHistory()
})

export default router