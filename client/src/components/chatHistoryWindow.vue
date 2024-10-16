<template>
  <div>
    <div class="chatHistory">
      <h4 class="topicTitle">历史对话</h4>

      <div
        class="topic"
        v-for="(item, index) in historyList"
        :key="index"
        @click="getHistory(item)"
      >
        {{ item.topic }}
      </div>
    </div>
    <div class="newHistoryBtu" @click="newChat">+ 新的话题</div>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { storeToRefs } from "pinia";
import useShop from "../store/index.js";
const store = useShop();
const { historyList } = storeToRefs(store);
const getHistory = (qustion) => {
  console.log(qustion);
};
const newChat = () => {
  console.log("new a chat");
};
</script>

<style>
.chatHistory {
  border: 1px #353535 solid;
  border-radius: 30px;
  width: 100%;
  height: 49em;
  padding: 0 10px;
  overflow: auto; /* 隐藏超出范围的内容 */
}
.chatHistory::-webkit-scrollbar {
  display: none;
}
.topicTitle {
  color: #f0f8ff;
  text-align: center;
  margin: 25px 0;
}
.topic {
  color: #6b6c6d;
  white-space: nowrap; /* 禁止文本换行 */
  overflow: hidden; /* 隐藏超出范围的内容 */
  text-overflow: ellipsis; /* 使用省略号 */
  width: 90%;
  margin: 0px auto;
  height: 60px;
  line-height: 60px;
  padding: 0 10px;
  user-select: none;
  border-radius: 100px;
  cursor: pointer;
}
.topic:hover {
  color: #e7e7e7;
  background-color: #353535;
}
.newHistoryBtu {
  color: #6b6c6d;
  white-space: nowrap; /* 禁止文本换行 */
  overflow: hidden; /* 隐藏超出范围的内容 */
  text-overflow: ellipsis; /* 使用省略号 */
  width: 90%;
  margin: 26px auto 0 auto;
  height: 60px;
  line-height: 60px;
  padding: 0 10px;
  user-select: none;
  border-radius: 100px;
  cursor: pointer;
  text-align: center;
  border: 2px solid #353535;
}
.newHistoryBtu:hover {
  color: #e7e7e7;
  background-color: #353535;
}
</style>