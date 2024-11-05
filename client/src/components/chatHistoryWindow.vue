<template>
  <div
    :class="[
      { chatHistoryWindowMain: true },
      { active: isHide },
      { Disabled: isUpload },
      { Disabled: isReUpload },
    ]"
  >
    <div class="chatHistoryLeft">
      <div class="topicTitleCon">
        <h4 class="topicTitle">历史对话</h4>
      </div>
      <div class="chatHistory">
        <div
          :class="[{ topic: true }, { topicActive: item.topicId == chatId }]"
          v-for="(item, index) in historyList"
          :key="index"
        >
          <div class="topicContent" @click="getHistory(item.topicId)">
            {{ item.topic }}
          </div>
          <div class="topicSetting">
            <div class="BGfuzzy"></div>
            <el-button @click="deleteTopic(item, index)">
              <Delete style="height: 20px; width: 20px" />
            </el-button>
          </div>
        </div>
      </div>
      <div class="newBtnCon">
        <div class="newHistoryBtu" @click="newChat">+ 新的话题</div>
      </div>
    </div>
  </div>
</template>

<script setup>
// 导入element-plus库的内置图标
import { Delete } from "@element-plus/icons-vue";

// 导入vue3自带的函数
import { ref, reactive, onMounted, onBeforeMount, watch } from "vue";

// 导入axios库
import axios from "axios";

// 导入pinia库，以及相关配置
import { storeToRefs } from "pinia";
import useShop from "../store/index.js";
const store = useShop();
const {
  chatId,
  historyList,
  isUpload,
  isReUpload,
  isHide,
  uname,
  email,
  phone,
} = storeToRefs(store);

// 导入vue-router库，以及相关配置
import { useRoute } from "vue-router";
import router from "../router/index.js";
const route = useRoute();

/**
 * 前端
 *
 * 数据加载系统
 *
 * @param uid 用户id，用于让后端定位用户信息
 *
 * 功能：
 *      获取历史数据列表，用于显示历史记录（与chatWindow.vue的getHistoryList功能类似，但是比它的简单）
 *
 */

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

/**
 * 前端
 *
 * 退出系统
 *
 * 功能：
 *      1、用户刷新页面后，不需要重新登录
 *      2、防止其他人拿到用户用户登录之后，可以直接进入
 *
 */

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

/**
 * 前端
 *
 * 切换对话系统
 *
 * @param topicId 要切换到的对话，主要使用topic中的topicId
 *
 * 功能：
 *      修改在piaio仓库中的chatId，从而实现切换对话
 *
 * 更多在chatWindow.vue查找:切换对话系统
 */

const getHistory = (topicId) => {
  chatId.value = topicId;
  const routeParams = route.params;
  store.postDataTOServer(
    routeParams.uid.split(":")[1],
    chatId.value,
    uname.value,
    email.value,
    phone.value,
    historyList.value
  );
};

// 创建新的对话

/**
 * 前端
 *
 * 对话增删系统
 *
 * 功能：
 *      1、新增一个新对话
 *
 * 注意：
 *      1、新增对话后，不会立即更新到后端的数据库，只有在进行第一次会话对话后才会更新
 */
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

/**
 * 前端
 *
 * 对话增删系统
 *
 * 功能：
 *      1、删除指定的对话
 *
 * 注意：
 *      1、删除会话后，在用户确认后会立即更新到后端
 */

const deleteTopic = (item, index) => {
  let isDelete = confirm(`确定要删除${item.topic}这个对话吗`);
  if (isDelete) {
    historyList.value.splice(index, 1);
    const routeParams = route.params;
    store.postDataTOServer(
      routeParams.uid.split(":")[1],
      chatId.value,
      uname.value,
      email.value,
      phone.value,
      historyList.value
    );
  }
};

/**
 * 前端
 *
 * 对话增删系统
 *
 * 功能：
 *      1、将新的对话名修改为第一次提的问题
 *        （1）使用vue自带的watch监测piaio的historyList
 *        （2）如果发现有对话名为：新对话，且history中对话不为零，则将对话名修改为第一次提的问题
 *
 */

watch(
  historyList,
  (newData, oldData) => {
    historyList.value.find((value, index, list) => {
      if (value.topic == "新对话" && value.history.length != 0) {
        value.topic = value.history[0].question;
        const routeParams = route.params;
        store.postDataTOServer(
          routeParams.uid.split(":")[1],
          chatId.value,
          uname.value,
          email.value,
          phone.value,
          historyList.value
        );
      }
    });
  },
  { deep: true, immediate: true }
);

// 页面渲染之前的钩子函数
onBeforeMount(() => {
  keepRegister();
});

// 页面渲染之后的钩子函数
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
  background-color: rgba(53, 53, 53, 1);
  /* transform: translate(100%, -50%); */
  transform: translate(0%, -50%);
  right: 0%;
  opacity: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: end;
}

.topic:hover .topicSetting {
  position: absolute;
  /* transform: translateY(-50%);  */
  opacity: 1;
  padding: 0 10px 0 0;
  height: 100%;
  transition: 0.5s;
}

.topicSetting .BGfuzzy {
  width: 20px;
  height: 60px;
  background: linear-gradient(-90deg, rgba(53, 53, 53, 1), rgba(53, 53, 53, 0));
  transition: 0.5s;
  position: relative;
  /* right: 100%; */
  left: -20px;
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