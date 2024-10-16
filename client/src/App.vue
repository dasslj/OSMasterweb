<template>
  <div class="main">
    <el-col :span="30">
      <el-row :gutter="20" class="mainRow">
        <!-- 左侧的导航 -->
        <el-col :span="4">
          <h3 class="routerTitle">OS 大师</h3>
          <el-menu
            :default-active="routerStatus"
            class="mainMenu"
            active-text-color="#ffd04b"
            background-color="none"
            text-color="#fff"
            router="true"
            mode="vertical"
          >
            <el-menu-item index="/chat" class="mainMenuItem">
              <el-icon><ChatSquare /></el-icon>
              <span>会话</span>
            </el-menu-item>

            <el-menu-item index="/other" class="mainMenuItem">
              <el-icon><Search /></el-icon>
              <span>查询</span>
            </el-menu-item>
            <el-menu-item index="/other" class="mainMenuItem">
              <el-icon><Help /></el-icon>
              <span>介绍</span>
            </el-menu-item>
            <el-menu-item index="/other" class="mainMenuItem">
              <el-icon><Setting /></el-icon>
              <span>设置</span>
            </el-menu-item>
          </el-menu>
        </el-col>
        <el-col :span="19">
          <router-view></router-view>
        </el-col>
      </el-row>
    </el-col>
  </div>
</template>

<script setup>
import {
  ChatSquare,
  Search,
  Help,
  Setting,
  Microphone,
} from "@element-plus/icons-vue";
import chatPage from "./page/chatPage.vue";
import {ref} from "vue"
// import router from "./router/index.js"
// import {useRouter} from "vue-router"
// const routerList = ["/chat","/other"]
// const routerStatus = ref(window.location.pathname)
const routerStatus = ref("/chat")
// const route = useRouter()
// console.log(window.location.pathname)
</script>

<style scoped>
.routerTitle {
  color: #f0f8ff;
  margin-bottom: 15px;
  text-align: center;
}
.mainRow {
  height: 100%;
}

.main {
  margin: 50px 30px;
}
.mainMenuItem{
  border-radius: 50px;
}
.mainMenuItem:hover{
  background-color: #212121;
  border-radius: 50px;
}
</style>