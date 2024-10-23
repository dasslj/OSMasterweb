<template>
  <div class="chatPageMain">
    <el-row :gutter="0">
      <!-- 左侧的聊天记录 -->
      <el-col :span="4">
        <chatHistoryWindow></chatHistoryWindow>
      </el-col>


      <!-- 右侧的聊天框 -->
      <el-col :span="20">
        <chatWindow></chatWindow>
      </el-col>

    </el-row>

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
import chatWindow from "../components/chatWindow.vue";
import chatHistoryWindow from "../components/chatHistoryWindow.vue";
</script>

<style scoped>
.chatPageMain .el-row {
  justify-content: space-between;
}

.chatPageMain {
  width: 100%;
  height: 100vh;
  /* padding: 50px 0 0 0 ; */
}
</style>