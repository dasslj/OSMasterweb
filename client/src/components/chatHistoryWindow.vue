<template>
  <div>
    <div class="chatHistory">
      <h4 class="topicTitle">历史对话</h4>

      <div
        :class="[{ topic: true }, { topicActive: item.topicId == chatId }]"
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
import { ref, reactive, onMounted, onBeforeMount } from "vue";
import axios from "axios";
import { storeToRefs } from "pinia";
import useShop from "../store/index.js";
const store = useShop();
const { chatId, historyList } = storeToRefs(store);

// 历史数据列表
// const historyList = reactive([]);
// 获取历史数据列表
const getHistoryList = () => {
  axios.get("http://localhost:8888/one/data").then((res) => {
    if (res.status === 200) {
      // console.log(res.data.historyList);
      for (let i = 0; i < res.data.historyList.length; ++i) {
        historyList.value[i] = res.data.historyList[i];
      }
      // console.log(historyList.value);
      // topicList.push(historyList.value[topicIndex.value].history);
    }
  });
};
const getHistory = (topic) => {
  // console.log(topic);
  chatId.value = topic.topicId;
  // console.log(chatId.value);
};
const newChat = () => {
  console.log("new a chat");
};
// 页面渲染之前
onBeforeMount(() => {
  getHistoryList();
  // console.log(111);
});
onMounted(() => {
  getHistoryList();
});
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
  text-align: center;
}
.topic:hover {
  color: #e7e7e7;
  background-color: #353535;
}
.topicActive {
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