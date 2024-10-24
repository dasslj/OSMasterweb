<template>
  <div>
    <!-- <div class="chatWindowTitle"></div> -->
    <el-col>
      <div class="chatWindow">
        <div class="placehoderBox"></div>
        <div class="agentBubble firstAgentBubble">
          <div class="agentImg Image">
            <img src="../assets/MdiLinux.svg" alt="" />
          </div>
          <div class="agentText">请问您要问什么关于Linux的问题呢？</div>
        </div>
        <div v-for="(item, index) in topicList[0]" :key="index">
          <!-- {{ item }} -->
          <div class="bubbleList">
            <div class="userBubble">
              <div class="userImg Image">
                <img src="../assets/MdiAccount.svg" alt="" />
              </div>
              <div class="userText">{{ item.question }}</div>
            </div>

            <div class="agentBubble">
              <div class="agentImg Image">
                <img src="../assets/MdiLinux.svg" alt="" />
              </div>
              <div class="agentText">{{ item.answer }}</div>
            </div>
          </div>
        </div>
        <div class="agentBubble firstAgentBubble">

        </div>
      </div>
    </el-col>
    <el-col class="inputCol">
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
          <el-button :icon="Search" @click="postUsersText" class="SearchBtn" />
        </div>

      </div>
      <div class="bottomFlat">
        版本：0.1.6
      </div>
    </el-col>
  </div>
</template>

<script setup>
import axios from "axios";
import querystring from "querystring";
import {
  Search,
  Microphone,
  Picture,
  GobletSquareFull,
} from "@element-plus/icons-vue";
import {
  ref,
  onMounted,
  onBeforeMount,
  onBeforeUpdate,
  reactive,
  watch,
  getCurrentInstance,
} from "vue";
import { storeToRefs } from "pinia";
import useShop from "../store/index.js";
import Recorder from "js-audio-recorder";
// import router from "../router/index.js";
// import {useRouter} from "vue-router"

const store = useShop();
const { isbgBlur, chatId, historyList } = storeToRefs(store);
const usersInput = ref("");
let chatWindowScroll = null;
const instance = getCurrentInstance();
const microphoneStatus = ref(false);
// const historyList = reactive({
//   content: [],
// }); // 历史数据列表
const topicIndex = ref(0);
const topicList = reactive([]);
// 获取历史数据列表
const getHistoryList = () => {
  axios.get("http://localhost:8888/one/data").then((res) => {
    if (res.status === 200) {
      // console.log(res.data.historyList);
      for (let i = 0; i < res.data.historyList.length; ++i) {
        historyList.value[i] = res.data.historyList[i];
      }
      console.log(historyList.value);
      topicList.push(historyList.value[topicIndex.value].history);
    }
  });
};

// 获取当前对话的id
const getTopicId = () => {
  // console.log(chatId.value);
  return chatId.value;
};

watch(
  chatId,
  (newData, oldData) => {
    historyList.value.find((value, index, obj) => {
      // console.log(value);
      // console.log(index);
      if (value.topicId == getTopicId()) {
        topicIndex.value = index;
        // instance.proxy.$forceUpdate();
        topicList.shift();
        topicList.push(historyList.value[topicIndex.value].history);
      }
    });
  },
  { deep: true, immediate: true }
);

// console.log(historyList.value[0].history[1].question)
// 向服务端发送问题（文本）
const postUsersText = () => {
  if (usersInput.value == "") {
    return;
  }

  let dialog = { question: "", answer: "" };
  dialog.question = usersInput.value;
  // console.log(usersInput.value);
  let chatWindow = document.querySelector(".chatWindow");

  // 发送数据给服务端
  // axios({
  //   method: "post",
  //   // url:"http://10.8.7.12:86/chat",
  //   url: "http://127.0.0.1:5000/chat",
  //   data: {
  //     user_input: usersInput.value,
  //   },
  //   // headers: {
  //   //   "Content-Type": "application/json",
  //   // },
  // }).then((res) => {
  //   console.log(res.data);
  // });

  // // 添加对话到页面中

  // // 可以获取服务端数据,要先等待后端答案生成完毕
  // axios({
  //   method: "get",
  //   // url:"http://10.8.7.12:86/chat",
  //   data: {
  //     user_input: usersInput.value,
  //   },
  //   url: "http://127.0.0.1:5000/chat",
  //   // headers: {
  //   //   "Content-Type": "application/json",
  //   // },
  // }).then((res) => {
  //   // console.log(res.data)
  //   dialog.answer = res.data.answer;
  //   // console.log(dialog.answer)
  //   // console.dir(dialog)
  //   historyList.value[0].history.push(dialog);
  // });
  // chatWindowScroll = setInterval(() => {
  //   chatWindow.scrollTop = chatWindow.scrollHeight - chatWindow.clientHeight;
  //   // console.dir(chatWindowScroll)
  // }, 100);


  // usersInput.value = "";

  axios.post('http://localhost:5000/chat',
    { user_input: usersInput.value })
    .then(response => {
      dialog.answer = response.data.response;
      historyList.value[0].history.push(dialog);

    })
    .catch(error => {
      console.error('Error sending user input:', error);
    });
  usersInput.value = "";

  // axios.post('http://127.0.0.1:5000/chat', { user_input: usersInput.value },
  //   {
  //     headers: {
  //       'Content-Type': 'application/json'
  //     }
  //   }
  // )
  //   .then(response => {
  //     dialog.answer = response.data.response;
  //     // 下面是将历史对话传到数据库的代码
  //     // historyList.value[0].history.push(dialog);
  //     console.log(dialog)
  //     usersInput.value = "";
  //   })
  //   .catch(error => {
  //     console.error('Error sending user input:', error);
  //   });

  // usersInput.value = ""
};

// 停止窗口自动向下
window.onwheel = function (ev) {
  if (chatWindowScroll == null) {
    return;
  }
  clearInterval(chatWindowScroll);
};

// 开启录音
const startRecord = () => {
  const recorder = new Recorder();
  Recorder.getPermission().then(() => {
    if (microphoneStatus.value) {
      console.log("录音停止");
      recorder.stop();
      // recorder.play(); // 播放录音
      microphoneStatus.value = !microphoneStatus.value;

      // 保存录音到本地
      // 是否下载录音
      const isSaveAudio = window.confirm("是否保存录音");
      if (isSaveAudio) {
        saveAudioToLocal(recorder);
      }
      // 发送录音到服务器
      const isPostAudio = window.confirm("是否上传录音");
      if (isPostAudio) {
        postAdiuo(recorder);
      }
    } else {
      console.log("开始录音");
      recorder.start();
      microphoneStatus.value = !microphoneStatus.value;
    }
  });
};

// 将录音上传到本地
const saveAudioToLocal = (recorder) => {
  recorder.downloadWAV(new Date().getTime() + "录音");
};

// 向服务端发送问题（语音）（未完成）
const postAdiuo = (recorder) => {
  console.log("发送语音");
  const formData = new FormData();
  const blob = recorder.getWAVBlob(); // 获取wav格式音频数据
  const audioBlob = new Blob([blob], { type: "audio/wav" });
  const fileOfBlob = new File([audioBlob], new Date().getTime() + ".wav");
  formData.append("file", audioBlob);
  formData.append("id", 1);
  formData.append("name", "Audio");
  // axios.post(url, formData).then((res) => {
  //   console.log(res.data.data[0].url);
  // });
  console.log(blob);
  console.log(audioBlob);
  console.log(fileOfBlob);

  console.dir(formData.get("file"));

  axios({
    method: "post",
    // url:"http://10.8.7.12:86/chat",
    url: "http://127.0.0.1:8888/one/audio",
    data: audioBlob,

    // headers: {
    //   "Content-Type": "multipart/form-data",
    // },
    // headers: {
    //     "Content-Type": "application/json",
    //   },
  }).then((res) => {
    console.log(res.data);
  });
};

// 语音识别
let recognition
const adiuoRecognition = () => {
  if (!recognition) {
    recognition = new webkitSpeechRecognition();
    recognition.lang = "zh-CN";
    recognition.interimResults = true; // 设置为 false 以仅获取最终结果

    recognition.onresult = (event) => {
      const result = event.results[0][0].transcript;
      usersInput.value += result;
    };

    recognition.onend = () => {
      if (microphoneStatus.value) {
        // 如果还在录音状态，重新开始识别
        recognition.start();
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



// 页面渲染之前
onBeforeMount(() => {
  getHistoryList();
  // console.log(111);
});
// 页面渲染之后
onMounted(() => {
  // getHistoryList();
  let chatWindow = document.querySelector(".chatWindow");
  setTimeout(() => {
    chatWindow.scrollTop = chatWindow.scrollHeight - chatWindow.clientHeight;
  }, 1000)

  watch(chatId, (newData, oldData) => {
    setTimeout(() => {
      chatWindow.scrollTop = chatWindow.scrollHeight - chatWindow.clientHeight;
    }, 100)
  }, { deep: true, immediate: true })

});

onBeforeUpdate(() => {
  getHistoryList();
});
</script>

<style scoped>
.el-button {
  background-color: #2f2f2f;
  border: none;
  color: #f0f8ff;
}

.inputCol {
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  display: flex;
  height: 25vh;
  flex-direction: column;
}

.chatInput {
  /* margin-top: 50px; */
  width: 60%;
  display: flex;
  flex-direction: column;
  background-color: #444444;
  border-radius: 10px;
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
  color: #C0C0C0;
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
}

.SearchBtn {
  height: 40px;
  width: 60px;
  background-color: #212121;
  right: 0;
  color: #C0C0C0;
  border-radius: 50px;
}

.SearchBtn:hover {
  background-color: #2f2f2f;
  /* border: #2f2f2f 1px solid; */
  color: #f0f8ff;
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
}

.otherBtn:hover {
  background-color: #2f2f2f;
  border: #2f2f2f 1px solid;
  color: #f0f8ff;
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

.firstAgentBubble {
  margin-top: 200px;
}

.chatWindow {
  width: 100%;
  height: 75vh;
  padding: 0 20% 0 20%;
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
  width: 7px;
  background-color: #2b2b2b;
  /* border-radius: 10px; */


}

/*定义滚动条轨道 内阴影+圆角*/
.chatWindow::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  background-color: #585858;

}

/*定义滑块 内阴影+圆角*/
.chatWindow::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
  background-color: #ffffff;

}

.chatWindow::-webkit-scrollbar-thumb:hover {
  -webkit-box-shadow: none;
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
  max-width: 70%;
  /* background-color: #2f2f2f; */
  color: #f0f8ff;
  padding: 10px 10px;
  border-radius: 5px;
  /* height: 100px; */
  text-align: end;
  /* margin: 5px 0; */
  display: flex;
  justify-content: end;
  align-items: center;
}

.agentText {
  /* border: 1px solid greenyellow; */
  max-width: 70%;
  background-color: #6b6c6d;
  color: #f0f8ff;
  padding: 10px 5px;
  border-radius: 5px;
  text-align: start;
  /* margin: 10px 0 50px 0; */
  display: flex;

  align-items: center;
}

.userBubble {
  display: flex;
  flex-direction: row-reverse;
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

}

.Image img {
  width: 90%;

}

.agentImg {
  margin: 0 20px 0 0;
}

.agentImg img {
  width: 70%;

}

.userImg {
  margin: 0 0 0 20px;
}


.chatWindowTitle {
  height: 10vh;
}
</style>