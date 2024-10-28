import { createRouter, createWebHistory } from "vue-router"
import chatPage from "../page/chatPage.vue"
import otherPage from "../page/otherPage.vue"
import registerPage from "../page/registerPage.vue"
import chatWebRouterPage from "../page/chatWebRouterPage.vue"
import userPage from "../page/userPage.vue"
import settingPage from "../page/settingPage.vue"

const routes = [
    {
        path: "/chatWeb:uid&:uname", name: "提问页", props: true, component: chatWebRouterPage, children: [
            { path: "/chatWeb", redirect: "/chatWeb:uid&:uname/chat" },
            { path: "chat", name: "对话页", component: chatPage },
            { path: "user", name: "用户页", component: userPage },
            { path: "setting", name: "设置页", component: settingPage },
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