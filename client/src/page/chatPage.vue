<template>
  <div class="chatPageMain">
    <el-row :gutter="0">
      <!-- 左侧的聊天记录  v-if="!isHide.bool"-->
      <el-col :span="chatPageSpan.chatHistoryWindow">
        <chatHistoryWindow></chatHistoryWindow>
        <div :class="[{ hideBtuMain: true, active: isHide.bool }]" @click="hideHistoryWindow">
          <div class="hideButton" title="打开历史记录">
            <div v-if="isHide.bool">{{ isHide.iconOpen }} </div>
            <div v-else>{{ isHide.iconHide }} </div>
          </div>
        </div>
      </el-col>





      <!-- 右侧的聊天框 -->
      <el-col :span="chatPageSpan.chatWindow">
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
import { reactive, ref } from "vue";
import { storeToRefs } from "pinia";
import useShop from "../store/index.js";
const store = useShop();
const { isHide } = storeToRefs(store);
const chatPageSpan = reactive({
  chatHistoryWindow: 4,
  chatWindow: 20
})
// 隐藏历史
const hideHistoryWindow = () => {

  isHide.value.bool = !isHide.value.bool

  // 隐藏
  if (isHide.value.bool) {
    chatPageSpan.chatWindow = 23
    chatPageSpan.chatHistoryWindow = 1
  }

  // 打开
  if (!isHide.value.bool) {
    chatPageSpan.chatWindow = 20
    chatPageSpan.chatHistoryWindow = 4
  }
}
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

.chatPageMain .el-col {
  transition: 0.5s;
  /* display: flex; */
  position: relative;
  flex-direction: row;
}

.hideBtuMain {
  position: absolute;
  top: 50%;
  left: 101%;
  /* left: 32vh; */
  height: 40px;
  width: 20px;
  background-color: #212121;
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
  cursor: pointer;
  border-radius: 10px;
  transition: 0.5s;
  color: #fff;
  z-index: 100000;
}

.hideBtuMain:hover {
  /* border-left: #8b8b8b 2px solid; */
  background-color: #6b6c6d;
  color: #111111;
  font-weight: 700;
}

.hideButton {

  display: flex;
  align-items: center;
  justify-content: center;
  /* font-size: 10px; */
  width: 100%;
}

.hideButton:hover {}


.active {
  /* transform: translate(-100%, 0); */
  left: 30px;
}
</style>