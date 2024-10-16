<template>
    <div>
        
            <el-row :gutter="20">
            <!-- 中间的聊天框 -->
        <el-col :span="19">
          <chatWindow></chatWindow>
        </el-col>
        <!-- 右侧的聊天记录 -->
        <el-col :span="5">
          <chatHistoryWindow></chatHistoryWindow>
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


</style>