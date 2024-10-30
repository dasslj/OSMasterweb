<template>
  <div :class="[
    { chatHistoryWindowMain: true },
    { active: isHide.bool },
    { Disabled: isUpload },
    { Disabled: isReUpload }
  ]">
    <div class="chatHistoryLeft">
      <div class="topicTitleCon">
        <h4 class="topicTitle">历史对话</h4>
      </div>
      <div class="chatHistory">
        <div :class="[{ topic: true }, { topicActive: item.topicId == chatId }]" v-for="(item, index) in historyList"
          :key="index">
          <div class="topicContent" @click="getHistory(item)">{{ item.topic }}</div>
          <div class="topicSetting">
            <div class="BGfuzzy"></div>
            <el-button @click="deleteTopic(item, index)">
              <!-- 1111 -->
              <Delete style="height: 20px; width: 20px;" />
            </el-button>
          </div>


        </div>
      </div>
      <div class="newBtnCon">
        <div class="newHistoryBtu" @click="newChat">
          + 新的话题

        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  Delete
} from "@element-plus/icons-vue";

import { ref, reactive, onMounted, onBeforeMount, watch } from "vue";
import axios from "axios";
import { storeToRefs } from "pinia";
import useShop from "../store/index.js";

// 关于路由
import { useRoute } from "vue-router";
import router from "../router/index.js";

// 第一次的时候执行这个函数获取路由参数
const route = useRoute();

const store = useShop();
const { chatId, historyList, isUpload, isReUpload, isHide, uname, email, phone } = storeToRefs(store);

// 历史数据列表
// 获取历史数据列表

const getHistoryList = (uid) => {
  axios
    .post("http://localhost:8888/one/data", {
      uid,
      postCode: "gdcpRegisterWebData",
    })
    .then((res) => {
      if (res.status === 200) {
        // 获取历史列表
        for (let i = 0; i < res.data.historyList.length; ++i) {
          historyList.value[i] = res.data.historyList[i];
        }
      }
    });
};

// 这是为了防止别人直接输账号可以进入
const keepRegister = () => {
  let routeParams = route.params;
  try {
    let registerSucceedUid = localStorage.getItem("registerSucceedUid");
    if (routeParams.uid.split(":")[1] === registerSucceedUid) {
      getHistoryList(routeParams.uid.split(":")[1]);
    } else {
      router.push("/");
    }
  } catch (error) {
    router.push("/");
    console.log(error);
  }
};

const getHistory = (topic) => {
  chatId.value = topic.topicId;
  const routeParams = route.params;
  store.postDataTOServer(routeParams.uid.split(":")[1], chatId.value, uname.value, email.value, phone.value, historyList.value)

};
// 创建新的对话
const newChat = () => {
  const topicId = "" + Date.now();
  let newTopic = {
    topicId: topicId,
    topic: "新对话",
    history: [],
  };
  // 将新对话加入到对话历史列表中
  historyList.value.push(newTopic);
  chatId.value = topicId;
};

watch(
  historyList,
  (newData, oldData) => {
    historyList.value.find((value, index, list) => {
      if (value.topic == "新对话" && value.history.length != 0) {
        value.topic = value.history[0].question;
      }
    });


  },
  { deep: true, immediate: true }
);

// 
const deleteTopic = (item, index) => {
  let isDelete = confirm(`确定要删除${item.topic}这个对话吗`)
  if (isDelete) {
    historyList.value.splice(index, 1)
    const routeParams = route.params;
    store.postDataTOServer(routeParams.uid.split(":")[1], chatId.value, uname.value, email.value, phone.value, historyList.value)

  }
}


// 页面渲染之前
onBeforeMount(() => {
  keepRegister();
});
onMounted(() => {
  keepRegister();
});
</script>

<style>
.chatHistoryWindowMain {
  background: linear-gradient(270deg, #212121, #111111);
  z-index: -1;
  transition: 0.5s;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
}

.active {
  transform: translate(-100%, 0);
}

.Disabled {
  pointer-events: none;
  user-select: none;
  /* filter: blur(20px); */
}

.chatHistoryLeft {
  width: 100%;
}

.chatHistory {
  /* border: 1px #353535 solid; */
  /* border-radius: 30px; */
  width: 100%;
  height: 80vh;
  padding: 0 10px;
  overflow: auto;
  /* 隐藏超出范围的内容 */
}

.chatHistory::-webkit-scrollbar {
  display: none;
}

.topicTitleCon {
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.topicTitle {
  color: #c0c0c0;
  /* text-align: center; */
  /* padding: 25px 0; */
  font-size: 25px;
}

.topic {
  color: #6b6c6d;
  /* white-space: nowrap; */
  /* 禁止文本换行 */
  overflow: hidden;
  /* 隐藏超出范围的内容 */
  /* text-overflow: ellipsis; */
  /* 使用省略号 */
  width: 100%;
  /* margin: 0px auto; */
  height: 60px;
  line-height: 60px;
  padding: 0 5px;
  user-select: none;
  cursor: pointer;
  border-radius: 100px;
  transition: 0.5s;
  position: relative;

}

.topic:hover {
  color: #ffd04b;
  background-color: #353535;

}



.topicActive {
  color: #ffd04b;
  background-color: #353535;
}

.topicContent {
  /* 禁止文本换行 */
  white-space: nowrap;
  /* 使用省略号 */
  overflow: hidden;
  /* 隐藏超出范围的内容 */
  text-overflow: ellipsis;
  width: 100%;
  padding: 0 15px;
  text-align: center;
}

.topicSetting {
  z-index: 400;
  transition: 0.5s;
  position: absolute;
  top: 50%;
  transform: translate(100%, -50%);
  right: 0%;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: end;
}

.topic:hover .topicSetting {

  position: absolute;
  transform: translateY(-50%);
  margin: 0 10px 0 0;
  height: 100%;
  transition: 0.5s;
}

.topicSetting .BGfuzzy {
  width: 20px;
  height: 60px;
  background: linear-gradient(-90deg, rgba(53, 53, 53, 1), rgba(53, 53, 53, 0));
  transition: 0.5s;
}

.topicSetting .el-button {
  transition: 0.5s;
  background-color: rgb(53, 53, 53);
  width: 40px;
  height: 40px;
  color: #c0c0c0;
  border: none;
}

.topicSetting .el-button:hover {

  color: #ffd04b;

}

.newBtnCon {
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
  /* border-top: #f0f8ff 3px solid; */
}

.newHistoryBtu {
  color: #6b6c6d;
  white-space: nowrap;
  /* 禁止文本换行 */
  overflow: hidden;
  /* 隐藏超出范围的内容 */
  text-overflow: ellipsis;
  /* 使用省略号 */
  width: 90%;
  display: flex;
  height: 60px;
  /* line-height: 60px; */
  padding: 0 10px;
  user-select: none;
  border-radius: 100px;
  cursor: pointer;
  text-align: center;
  border: 4px solid #353535;
  justify-content: center;
  align-items: center;
  position: relative;
  transition: 0.5s;
  font-weight: 600;
  font-size: 21px;
}

.newHistoryBtu:hover {
  color: #ffd04b;
  background-color: #353535;
}
</style>