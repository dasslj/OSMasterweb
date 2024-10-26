import { createRouter, createWebHistory } from "vue-router"
import chatPage from "../page/chatPage.vue"
import otherPage from "../page/otherPage.vue"
import registerPage from "../page/registerPage.vue"
import chatWebRouterPage from "../page/chatWebRouterPage.vue"
const routes = [
    {
        path: "/chatWeb", name: "提问页", component: chatWebRouterPage, children: [
            { path: "/chatWeb", redirect: "/chatWeb/chat" },
            { path: "chat", name: "对话页", component: chatPage },
            { path: "other", name: "其他内容页", component: otherPage },
        ]
    },
    { path: "/register", name: "登录页", component: registerPage },
    { path: "/", redirect: "/register" }

]

const router = createRouter({
    routes,
    history: createWebHistory()
})

export default router