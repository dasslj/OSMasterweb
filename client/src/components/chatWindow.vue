<template>
  <div style="position: relative; height: 100vh">
    <!-- <div class="chatWindowTitle"></div> -->
    <el-col>
      <div class="chatWindow">
        <div class="BGfuzzyTop" style="
            top: 0%;
            background: linear-gradient(
              180deg,
              rgba(44, 44, 44, 1),
              rgba(44, 44, 44, 0)
            );
            left: 50%;
            transform: translateX(-50%);
          "></div>
        <div class="placehoderBox"></div>
        <div class="agentBubble" id="firstAgentBubble">
          <div class="agentText">
            <div class="agentImg Image">
              <img src="../assets/MdiLinux.svg" alt="" />
            </div>
            <div class="agentTextContent">
              请问您要问什么关于Linux的问题呢？
            </div>
          </div>
        </div>
        <div v-for="(item, index) in topicList[0]" :key="index">
          <!-- {{ item }} -->
          <div class="bubbleList">
            <div class="userBubble">
              <div class="userText">
                <div class="userImg Image">
                  <img src="../assets/MdiAccount.svg" alt="" />
                </div>
                {{ item.question }}
              </div>
            </div>

            <div class="agentBubble">
              <div class="agentText">
                <div class="agentImg Image">
                  <img src="../assets/MdiLinux.svg" alt="" />
                </div>
                <div class="agentTextContent">
                  <div v-html="item.answer"></div>
                </div>
                <div class="agentTextBottom">
                  <el-button :icon="CopyDocument" name="复制" @click="copy(item.answer)"></el-button>
                  <el-button :icon="Refresh" name="再来一次" @click="Reanswer(index, topicList[0])"></el-button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="tempBubble" v-if="isUpload">
          <div class="userBubble">
            <div class="userText">
              <div class="userImg Image">
                <img src="../assets/MdiAccount.svg" alt="" />
              </div>
              {{ tempQuestion }}
            </div>
          </div>

          <div class="agentBubble">
            <div class="agentText">
              <div class="agentImg Image">
                <img src="../assets/MdiLinux.svg" alt="" />
              </div>
              <div class="agentTextContent">
                {{ tempAnswer }}
              </div>
              <div class="agentTextBottom"></div>
            </div>
          </div>
        </div>
        <div class="agentBubble" id="lastAgentBubble"></div>
      </div>
    </el-col>

    <el-col class="inputCol">
      <el-buttton @click="goto('top')" v-if="isGotoTop" class="gotoBtu">
        ↑
      </el-buttton>
      <el-buttton @click="goto('bottom')" v-else class="gotoBtu">
        ↓
      </el-buttton>

      <div class="BGfuzzyTop"></div>
      <div class="BGfuzzy"></div>
      <!-- 输入框部分 -->
      <div class="chatInput">
        <div class="inputTop">
          <el-button :class="[{ otherBtn: true, recording: microphoneStatus }]" :icon="Microphone"
            @click="adiuoRecognition" />
          <el-button class="otherBtn" :icon="Picture" @click="blurToBG" />
        </div>
        <div class="textInput">
          <textarea name="" id="" cols="" rows="5" placeholder="请输入您要提问的问题" v-model="usersInput"
            @keydown.enter="postUsersText" class="userInput" style="width: 100%"></textarea>
        </div>
        <div class="inputBottom">
          <el-button :icon="Search" @click="loadingNewDialog" class="SearchBtn" :loading="isUpload" />
        </div>
      </div>
      <div class="bottomFlat">
        {{ webVersion }}
      </div>
    </el-col>
  </div>
</template>

<script setup>
// 导入axios库
import axios from "axios";
// 导入marked库，可以将markdown格式的字符串转为markdown样式
import { marked } from "marked";
// 导入element-plus库的内置图标
import {
  Search,
  Microphone,
  Picture,
  GobletSquareFull,
  CopyDocument,
  Refresh,
  ArrowDownBold,
  ArrowUpBold,
} from "@element-plus/icons-vue";

// 导入vue3自带的函数
import {
  ref,
  onMounted,
  onBeforeMount,
  onBeforeUpdate,
  reactive,
  watch,
} from "vue";

// 导入vue-router库，以及相关配置
import router from "../router/index.js";
import { useRoute } from "vue-router";
const route = useRoute();

// 导入pinia库，以及相关配置
import { storeToRefs } from "pinia";
import useShop from "../store/index.js";
const store = useShop();
const {
  isbgBlur,
  chatId,
  isUpload,
  isReUpload,
  historyList,
  webVersion,
  uname,
  email,
  phone,
} = storeToRefs(store);

//导入@vueuse/core库以及相关函数
import { useClipboard } from "@vueuse/core";
//  text 复制的内容、 isSupported 浏览器是否支持复制、copy 复制函数
const { text, isSupported, copy } = useClipboard();

/**
 * 下面是初始化本页面需要的响应式数据
 */
const usersInput = ref(""); // usersInput是用户输入框的双向绑定字符串数据，与发送问题系统相关
const microphoneStatus = ref(false); // microphoneStatus是麦克风是否开启的状态数据，与音转文系统相关
const isGotoTop = ref(false); // isGotoTop是判断用户想要去 顶部 还是 底部 的状态数据，与移动系统相关
const topicIndex = ref(0); // topicIndex是用于回去当前topicList在historyList的索引，与切换对话系统相关
const topicList = reactive([]); // topicList是用于存储当前对话的List，与切换对话系统、数据加载系统等相关
const tempQuestion = ref(""); // 临时的question存放变量
const tempAnswer = ref("正在为您生成答案中.");
/**
 * 下面是初始化本页面需要的常量或变量
 */
// 后端地址，前端向大模型提问的接口地址，与发送问题系统相关
const AGENT_URL = "http://10.8.7.12:86";
// 让对话保持在底部的计时器，与发送问题系统相关
let chatWindowScroll = null;

// 获取历史数据列表

/**
 * 前端
 *
 * 数据加载系统
 *
 * @param uid 用户id，用于让后端定位用户信息
 *
 * 功能：
 *      1、获取历史数据列表，用于显示当前对话的历史记录，以及同步用户信息
 *      2、同时会给新建用户创建第一个对话
 *
 * 注意：与chatHistoryWindow.vue的getHistoryList功能类似，但是比它的复杂
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
        // 将退出登录前的最后一次对话同步到chatId
        chatId.value = res.data.lastChat;
        // 同步用户信息
        uname.value = res.data.uname;
        email.value = res.data.email;
        phone.value = res.data.phone;
        // console.log(chatId.value);
        // 获取历史列表
        if (res.data.historyList.length !== 0) {
          for (let i = 0; i < res.data.historyList.length; ++i) {
            historyList.value[i] = res.data.historyList[i];
          }
          // console.log(historyList.value);
          /**
           * 前端
           *
           * 切换对话系统
           *
           * 功能：
           *      1、这里判断topicList必须为空才能将响应的history追加到topicList中
           *         否则容易在路由切换时重复的追加history导致历史记录切换失败
           */
          if (topicList.length == 0) {
            topicList.push(historyList.value[topicIndex.value].history);
            topicList[0].forEach((element) => {
              element.answer = marked(element.answer);
            });
          }
          // console.log(topicList);
        } else {
          /**
           * 前端
           *
           * 注册系统
           *
           * 功能：
           *     当检测到账号没有历史对话会创建第一个对话
           */
          historyList.value[0] = {
            topicId: "0",
            topic: "新对话",
            history: [],
          };
          topicList.push(historyList.value[topicIndex.value].history);
          topicList[0].forEach((element) => {
            element.answer = marked(element.answer);
          });
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
      }
    });
};

// loadingNewDialog是上传文本按钮的绑定函数
// 主要是为了实时加载答案这段时间的中间态
const loadingNewDialog = () => {
  let tempAnswerInterval = null;
  isUpload.value = true;
  tempQuestion.value = usersInput.value;
  tempAnswerInterval = setInterval(() => {
    tempAnswer.value += ".";
  }, 500);

  postUsersText(tempAnswerInterval);
};

// 向服务端发送问题（文本）
const postUsersText = (tempAnswerInterval) => {
  if (usersInput.value == "") {
    isUpload.value = false;
    return;
  }
  let dialog = { question: "", answer: "" };

  dialog.question = usersInput.value;
  let chatWindow = document.querySelector(".chatWindow");

  chatWindowScroll = setInterval(() => {
    // chatWindow.scrollTop = chatWindow.scrollHeight - chatWindow.clientHeight;
    chatWindow.scrollTo({
      top: chatWindow.scrollHeight - chatWindow.clientHeight,
      behavior: "smooth",
    });
  }, 100);
  axios
    .post(AGENT_URL, { user_input: usersInput.value })
    .then((response) => {
      dialog.answer = response.data.response;
      dialog.answer = marked(dialog.answer);
      topicList[0].push(dialog);
      historyList.value[topicIndex.value].history.push(dialog);
      isUpload.value = false;
      clearInterval(tempAnswerInterval);
      tempAnswer.value = "正在为您生成答案中.";
      const routeParams = route.params;
      store.postDataTOServer(
        routeParams.uid.split(":")[1],
        chatId.value,
        uname.value,
        email.value,
        phone.value,
        historyList.value
      );
    })
    .catch((error) => {
      dialog.answer = "#### 抱歉，网络发生错误，无法获取回答";
      dialog.answer = marked(dialog.answer);
      topicList[0].push(dialog);
      historyList.value[topicIndex.value].history.push(dialog);
      console.error("Error sending user input:", error);
      isUpload.value = false;
      clearInterval(tempAnswerInterval);
      tempAnswer.value = "正在为您生成答案中.";
      const routeParams = route.params;
      store.postDataTOServer(
        routeParams.uid.split(":")[1],
        chatId.value,
        uname.value,
        email.value,
        phone.value,
        historyList.value
      );
    });

  usersInput.value = "";
  // 使用表单发送数据
  // ,
  //     {
  //       headers: {
  //         'Content-Type': 'multipart/form-data'
  //       }
  //     }
  // 使用json发送数据
  //   // headers: {
  //   //   "Content-Type": "application/json",
  //   // },
};

// 重新生成答案
const Reanswer = (index, dialogList) => {
  isReUpload.value = !isReUpload.value;
  let tempAnswerInterval = null;
  dialogList[index].answer = "正在为您生成答案中.";
  tempAnswerInterval = setInterval(() => {
    dialogList[index].answer += ".";
  }, 500);
  axios
    .post(AGENT_URL, {
      user_input: dialogList[index].question,
    })
    .then((response) => {
      clearInterval(tempAnswerInterval);
      isReUpload.value = !isReUpload.value;
      dialogList[index].answer = response.data.response;
      // const routeParams = route.params;
      // store.postDataTOServer(routeParams.uid.split(":")[1], chatId.value, uname.value, email.value, phone.value, historyList.value)
    })
    .catch((error) => {
      clearInterval(tempAnswerInterval);
      isReUpload.value = !isReUpload.value;
      dialogList[index].answer = "#### 抱歉，网络发生错误，无法获取回答";
      dialogList[index].answer = marked(dialogList[index].answer);
      console.error("Error sending user input:", error);
      // const routeParams = route.params;
      // store.postDataTOServer(routeParams.uid.split(":")[1], chatId.value, uname.value, email.value, phone.value, historyList.value)
    });
};

// 滚动到最上或者最下
const goto = (where) => {
  let chatWindow = document.querySelector(".chatWindow");
  switch (where) {
    case "top":
      // chatWindow.scrollTop = 0;
      chatWindow.scrollTo({ top: 0, behavior: "smooth" });
      break;
    case "bottom":
      // chatWindow.scrollTop = chatWindow.scrollHeight - chatWindow.clientHeight;
      chatWindow.scrollTo({
        top: chatWindow.scrollHeight - chatWindow.clientHeight,
        behavior: "smooth",
      });
      break;
    default:
      break;
  }
};

// 停止窗口自动向下的计时器
const stopChatWindowAutoDown = (chatWindowScroll) => {
  if (chatWindowScroll == null) {
    return;
  }
  clearInterval(chatWindowScroll);
};

// 滚动鼠标滚轮停止窗口自动向下
window.onwheel = function (ev) {
  stopChatWindowAutoDown(chatWindowScroll);
  // console.log(ev);
};

// 语音识别
let recognition;
const adiuoRecognition = () => {
  if (!recognition) {
    recognition = new webkitSpeechRecognition();
    recognition.lang = "zh-CN";
    recognition.interimResults = false; // 设置为 false 以仅获取最终结果

    recognition.onresult = (event) => {
      const result = event.results[0][0].transcript;
      usersInput.value += result;
    };

    recognition.onend = () => {
      if (microphoneStatus.value) {
        // 如果还在录音状态，重新开始识别
        recognition.start();
      } else {
        recognition.stop();
      }
    };
  }

  if (microphoneStatus.value) {
    // 如果当前是录音状态，则停止录音
    recognition.stop();
    microphoneStatus.value = false; // 更新状态
  } else {
    // 否则开始录音
    microphoneStatus.value = true; // 更新状态
    recognition.start();
  }
};

// 向服务端发送问题（图片）(舍弃在本页实现)（移动至App.vue）
const postImage = () => {
  console.log("发送图像");
};

// 背景失焦
const blurToBG = () => {
  isbgBlur.value = !isbgBlur.value;
  console.log(isbgBlur.value);
};

// 这是为了防止别人直接输账号可以进入
// 同时在用户未退出登录时可以在同一个浏览器直接登录到主页，无需再次登录
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

// 页面渲染之前的回调函数
onBeforeMount(() => {
  keepRegister();

  // console.log(111);
});
// 页面渲染之后的回调函数
onMounted(() => {
  let chatWindow = document.querySelector(".chatWindow");
  let chatWindowNow = 0;

  setTimeout(() => {
    // chatWindow.scrollTop = chatWindow.scrollHeight - chatWindow.clientHeight;
    chatWindow.scrollTo({
      top: chatWindow.scrollHeight - chatWindow.clientHeight,
      behavior: "smooth",
    });
  }, 1000);
  // 滚动滚动条停止窗口自动向下
  chatWindow.addEventListener("scroll", () => {
    if (chatWindowScroll == null) {
      return;
    }
    clearInterval(chatWindowScroll);
  });

  /**
   * 前端
   *
   * 切换对话系统
   *
   * 功能：
   *      1、使用vue项目自带的watch，监测piaio中的chatId
   *      2、当chatId发生改变后，通过修改topicList从而实现对话修改
   *
   * 注意：
   *      1、topicList的数据结构是:[[{question:...,answer:...},{question:...,answer:...},......]]
   *
   * 更多在chatHistoryWindow.vue查找:切换对话系统
   */
  watch(
    chatId,
    (newData, oldData) => {
      let chatWindow = document.querySelector(".chatWindow");
      setTimeout(() => {
        chatWindow.scrollTop =
          chatWindow.scrollHeight - chatWindow.clientHeight;
      }, 100);
      historyList.value.find((value, index, obj) => {
        if (value.topicId == chatId.value) {
          topicIndex.value = index;
          topicList.shift();
          topicList.push(historyList.value[topicIndex.value].history);
        }
      });
    },
    { deep: true, immediate: true }
  );

  setInterval(() => {
    chatWindowNow = chatWindow.scrollTop;
  }, 100);

  // 判断页面上滑还是下滑，以修改goto按钮的向下或向上
  chatWindow.onscroll = function (ev) {
    if (chatWindow.scrollTop >= chatWindowNow) {
      isGotoTop.value = false;
    } else {
      isGotoTop.value = true;
    }
  };
});

onBeforeUpdate(() => {
  keepRegister();
});
</script>

<style scoped>
.el-button {
  background-color: #2f2f2f;
  border: none;
  color: #f0f8ff;
}

.el-button:hover {
  color: #ffd04b;
}

.BGfuzzyTop {
  width: 90%;
  flex-direction: column;
  position: absolute;
  bottom: 100%;
  background: linear-gradient(0deg, rgba(44, 44, 44, 1), rgba(44, 44, 44, 0));
  pointer-events: none;
  user-select: none;
  height: 20px;
  z-index: 3;
}

.BGfuzzy {
  width: 90%;
  flex-direction: column;
  position: absolute;
  top: 0%;
  background-color: #2c2c2c;
  /* background-color: rgba(44, 44, 44, 0.9); */
  /* background: linear-gradient(0deg, rgba(44, 44, 44, 1), rgba(44, 44, 44, 0.9)); */
  /* backdrop-filter: saturate(50%) blur(10px); */
  /* background-image: radial-gradient(
    transparent 1px,
    rgba(44, 44, 44, 0.9),
    1px
  ); */
  pointer-events: none;
  user-select: none;
  height: 50vh;
  z-index: 3;
}

.inputCol {
  /* justify-content: flex-end; */
  align-items: center;
  width: 90%;
  display: flex;
  /* height: 25vh; */
  flex-direction: column;
  position: absolute;
  bottom: 0%;
  left: 50%;
  /* top: 100%; */
  transform: translateX(-50%);
}

.chatInput {
  /* margin-top: 50px; */
  width: 60%;
  display: flex;
  flex-direction: column;
  background-color: #444444;
  border-radius: 10px;
  padding: 10px;
  z-index: 4;
  /* height: 25vh; */
  /* justify-content: space-around; */
  /* align-items: center; */
}

.textInput {
  height: 60%;
}

.userInput {
  outline-style: none;
  /* border: 1px solid #ccc; */
  border: none;
  /* border-radius: 50px; */
  /* height: 100; */
  padding: 10px;
  width: 93%;
  font-size: 18px;
  font-weight: 500;
  font-family: "Microsoft soft";
  background-color: #444444;
  color: #c0c0c0;
  flex-wrap: nowrap;
  resize: none;
}

.userInput::-webkit-scrollbar {
  display: none;
}

.inputBottom {
  padding: 5px 10px;
  display: flex;
  flex-direction: row;
  justify-content: end;
  height: 10%;
}

.bottomFlat {
  color: #f0f8ff;
  padding: 10px 0;
  z-index: 4;
}

.SearchBtn {
  height: 40px;
  width: 60px;
  background-color: #212121;
  right: 0;
  color: #c0c0c0;
  border-radius: 50px;
  transition: 0.5s;
}

.SearchBtn:hover {
  background-color: #2f2f2f;
  /* border: #2f2f2f 1px solid; */
  color: #ffd04b;
}

.inputTop {
  /* margin: 5px 0; */
  height: 20%;
  padding: 5px 0;
  border-bottom: 2px solid #212121;
}

.otherBtn {
  margin-left: 10px;
  height: 30px;
  width: 60px;
  background-color: #212121;
  border-radius: 50px;
  padding: 10px;
  border: #2f2f2f 1px solid;
  color: #8d8d8d;
  transition: 0.5s;
}

.otherBtn:hover {
  background-color: #2f2f2f;
  border: #2f2f2f 1px solid;
  color: #ffd04b;
}

.recording {
  color: #c23737;
  background-color: #fff;
  border: #2f2f2f 1px solid;
}

.recording:hover {
  color: #c23737;
  background-color: #fff;
  border: #2f2f2f 1px solid;
}

#firstAgentBubble {
  margin-top: 200px;
  /* margin-bottom: 500px; */
}

#lastAgentBubble {
  margin-top: 20%;
}

.chatWindow {
  width: 100%;
  height: 100vh;
  padding: 0 17% 0 23%;
  /* align-items: center; */
  /* height: auto; */
  /* border: 1px red solid; */
  display: flex;
  flex-direction: column;
  overflow: auto;
  /* 隐藏超出范围的内容 */
  transition: 0.5s;
}

.item {
  flex: 1;
}

.chatWindow::-webkit-scrollbar {
  width: 10px;
  background-color: #2b2b2b;
  /* border-radius: 10px; */
}

/*定义滚动条轨道 内阴影+圆角*/
.chatWindow::-webkit-scrollbar-track {
  border-radius: 10px;
  background-color: #585858;
}

/*定义滑块 内阴影+圆角*/
.chatWindow::-webkit-scrollbar-thumb {
  border-radius: 10px;

  background-color: #dfdfdf;
}

.chatWindow::-webkit-scrollbar-thumb:hover {
  background-color: #ffffff;
}

/* 滚动条箭头样式 */
/* .chatWindow::-webkit-scrollbar-button {
  display: block;
  background-color: #fff;
  display: block;
  border: solid;
  border-width: 0 8px 8px 8px;
  border-color: transparent transparent #555555 transparent;
  height: 13px;
  width: 16px;
} */

/* .chatWindow::-webkit-scrollbar-button:single-button:vertical:decrement {
  border-width: 0 8px 8px 8px;
  border-color: transparent transparent #555555 transparent;
}

.chatWindow::-webkit-scrollbar-button:single-button:vertical:decrement:hover {
  border-color: transparent transparent #777777 transparent;
}

.chatWindow::-webkit-scrollbar-button:single-button:vertical:increment {
  border-width: 8px 8px 0 8px;
  border-color: #555555 transparent transparent transparent;
}

.chatWindow::-webkit-scrollbar-button:vertical:single-button:increment:hover {
  border-color: #777777 transparent transparent transparent;
} */

.userText {
  position: relative;
  max-width: 90%;
  /* background-color: #2f2f2f; */
  color: #f0f8ff;
  padding: 10px 10px;
  border-radius: 5px;
  /* height: 100px; */
  /* text-align: end; */
  /* margin: 5px 0; */
  display: flex;
  justify-content: start;
  align-items: center;
}

.agentTextBottom .el-button {
  background-color: #2c2c2c;
  border-radius: 10px;
  width: 10px;
  height: 10px;
  transition: 0.5s;
}

.agentTextContent {
  margin: 0 0 10px 0;
  background-color: #6b6c6d;
  color: #f0f8ff;
  padding: 10px 10px;
  border-radius: 5px;
  /* padding: 5px; */
}

.agentText {
  /* border: 1px solid greenyellow; */

  max-width: 90%;
  text-align: start;
  /* margin: 10px 0 50px 0; */
  display: flex;
  line-height: 24px;
  /* align-items: center; */
  flex-direction: column;
  position: relative;
}

.userBubble {
  position: relative;
  display: flex;
  flex-direction: row;
  margin: 100px 0 50px 0;
  transition: 0.5s;
}

.agentBubble {
  display: flex;
  flex-direction: row;
  margin: 50px 0 100px 0;
  transition: 0.5s;
}

.Image {
  width: 50px;
  height: 50px;
  justify-content: center;
  align-items: center;
  display: flex;
  background-color: #f7f7f7;
  border-radius: 100px;
  /* position: relative; */
  /* right: 10%; */
  /* left: -0%; */
}

.Image img {
  width: 90%;
}

.agentImg {
  margin: 0px 10px 0 0;
  width: 50px;
  height: 50px;
  right: 100%;
  position: absolute;
}

.agentImg img {
  width: 70%;
}

.userImg {
  margin: 0px 10px 0 0;
  position: absolute;
  right: 100%;
}

.chatWindowTitle {
  height: 10vh;
}

.gotoBtu {
  height: 50px;
  width: 50px;
  background-color: #d1d1d1;
  border-radius: 50px;
  padding: 10px;
  /* border: #2f2f2f 1px solid; */
  color: #1d1d1d;
  position: absolute;
  bottom: 90%;
  left: 50%;
  transition: 0.5s;
  transform: translateX(-50%);
  z-index: 1000000;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30px;
  user-select: none;
  cursor: pointer;
}

.gotoBtu:hover {
  /* background-color: #2c2c2c; */
  background-color: #000;
  color: #ffd04b;
}
</style>