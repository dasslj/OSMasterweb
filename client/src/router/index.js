import {createRouter, createWebHistory} from "vue-router"
import chatPage from "../page/chatPage.vue"
import otherPage from "../page/otherPage.vue"
const routes = [
    {path:"/chat",name:"对话页",component:chatPage},
    {path:"/other",name:"其他内容页",component:otherPage},
    
]

const router = createRouter({
    routes,
    history:createWebHistory()
})

export default router