<template>
  <div class="main">
    <el-col :span="30">
      <el-row :gutter="20" class="mainRow">
        <!-- 左侧的导航 -->
        <el-col :span="5">
          <h3 class="routerTitle">OS 大师</h3>
          <el-menu
            default-active="1"
            class="mainMenu"
            active-text-color="#ffd04b"
            background-color="#212121"
            text-color="#fff"
          >
            <el-menu-item index="1">
              <el-icon><ChatSquare /></el-icon>
              <span>会话</span>
            </el-menu-item>

            <el-menu-item index="2">
              <el-icon><Search /></el-icon>
              <span>查询</span>
            </el-menu-item>
            <el-menu-item index="3">
              <el-icon><Help /></el-icon>
              <span>介绍</span>
            </el-menu-item>
            <el-menu-item index="4">
              <el-icon><Setting /></el-icon>
              <span>设置</span>
            </el-menu-item>
          </el-menu>
        </el-col>
        <!-- 中间的聊天框 -->
        <el-col :span="15">
          <chatWindow></chatWindow>
        </el-col>
        <!-- 右侧的聊天记录 -->
        <el-col :span="4">
          <chatHistoryWindow></chatHistoryWindow>
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
import chatWindow from "./components/chatWindow.vue";
import chatHistoryWindow from "./components/chatHistoryWindow.vue";
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
</style>