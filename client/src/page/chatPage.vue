<template>
  <div class="chatPageMain">
    <el-row :gutter="0">
      <!-- 左侧的聊天记录  v-if="!isHide.bool"-->
      <el-col :span="chatPageSpan.chatHistoryWindow">
        <chatHistoryWindow></chatHistoryWindow>
        <div
          :class="[{ hideBtuMain: true, active: isHide }]"
          @click="hideHistoryWindow"
        >
          <div class="hideButton" title="打开历史记录">
            <div v-if="isHide">
              <ArrowRightBold />
            </div>
            <div v-else>
              <ArrowLeftBold />
            </div>
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
// 导入element-plus库的内置图标
import {
  ChatSquare,
  Search,
  Help,
  Setting,
  Microphone,
  ArrowRightBold,
  ArrowLeftBold,
} from "@element-plus/icons-vue";

// 导入自定义的组件
import chatWindow from "../components/chatWindow.vue";
import chatHistoryWindow from "../components/chatHistoryWindow.vue";

// 导入vue3自带的函数
import { reactive, ref } from "vue";

// 导入pinia库，以及相关配置
import { storeToRefs } from "pinia";
import useShop from "../store/index.js";
const store = useShop();
const { isHide } = storeToRefs(store);

/**
 * 下面是初始化本页面需要的响应式数据
 */
// chatPageSpan存放的是chatHistoryWindow组件和chatWindow组件在显示位置的占比值
const chatPageSpan = reactive({
  chatHistoryWindow: 4,
  chatWindow: 20,
});

/**
 * 前端
 *
 * 历史记录隐藏系统
 *
 * 功能：
 *      通过element-plus的el-col布局的span属性实现chatWindow和chatHistoryWindow在展示位置的占比修改
 *
 */

const hideHistoryWindow = () => {
  isHide.value = !isHide.value;
  // 隐藏
  if (isHide.value) {
    chatPageSpan.chatWindow = 23;
    chatPageSpan.chatHistoryWindow = 1;
  }

  // 打开
  if (!isHide.value) {
    chatPageSpan.chatWindow = 20;
    chatPageSpan.chatHistoryWindow = 4;
  }
};
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

/* .ArrowRightBold {
  width: 10px;
  height: 10px;
}

.ArrowLeftBold {
  width: 10px;
  height: 10px;
} */

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
  color: #ffd04b;
  /* font-weight: 700; */
  /* transform: scale(1.1); */
}

.hideButton {
  display: flex;
  align-items: center;
  justify-content: center;
  /* font-size: 10px; */
  width: 100%;
  transition: 0.5s;
  /* transform: scale(1.1); */
}

.hideButton:hover {
}

.hideButton div {
  width: 10px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  /* transform: scale(1.1); */
}

.active {
  /* transform: translate(-100%, 0); */
  left: 30px;
}
</style>