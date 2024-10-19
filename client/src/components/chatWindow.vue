<template>
  <div>
    <el-col>
      <div class="chatWindow">
        <div class="agentBubble">
          <div class="agentImg Image">
            <img src="../assets/vite.svg" alt="" />
          </div>
          <div class="agentText">请问您要问什么关于Linux的问题呢？</div>
        </div>
        <div
          class="bubbleList"
          v-for="(item, index) in historyList[0].history"
          :key="index"
        >
          <div class="userBubble">
            <div class="userImg Image">
              <img src="../assets/vue.svg" alt="" />
            </div>
            <div class="userText">{{ item.question }}</div>
          </div>

          <div class="agentBubble">
            <div class="agentImg Image">
              <img src="../../public/vite.svg" alt="" />
            </div>
            <div class="agentText">{{ item.answer }}</div>
          </div>
        </div>
      </div>
    </el-col>
    <el-col>
      <el-row class="chatInput">
        <el-col :span="20">
          <div class="subChatInput">
            <input
              v-model="usersInput"
              placeholder="请输入您要提问的问题"
              class="input-with-select userInput"
            />
            <el-button
              :icon="Search"
              @click="postUsersText"
              class="SearchBtn"
            />
          </div>
        </el-col>
        <el-col :span="4">
          <el-button
            :class="[{ otherBtn: true, recording: microphoneStatus }]"
            :icon="Microphone"
            @click="startRecord"
          />
          <el-button class="otherBtn" :icon="Picture" @click="postImage" />
          <!-- <input type="file" id="imgInput" /> -->
        </el-col>
      </el-row>
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
import { ref, onMounted } from "vue";
import { storeToRefs } from "pinia";
import useShop from "../store/index.js";
import Recorder from "js-audio-recorder";

const store = useShop();
const { historyList } = storeToRefs(store);
const usersInput = ref("");
let chatWindowScroll = null;

const microphoneStatus = ref(false);
// console.log(historyList.value[0].history[1].question)
// 向服务端发送问题（文本）
const postUsersText = () => {
  if (usersInput.value == "") {
    return;
  }
  if (
    historyList.value &&
    historyList.value[0] &&
    historyList.value[0].history
  ) {
    let dialog = { question: "", answer: "" };
    dialog.question = usersInput.value;
    // console.log(usersInput.value);
    let chatWindow = document.querySelector(".chatWindow");

    // 发送数据给服务端
    axios({
      method: "post",
      // url:"http://10.8.7.12:86/chat",
      url: "http://127.0.0.1:8888/one/data",
      data: {
        question: usersInput.value,
      },
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      console.log(res.data);
    });

    // 添加对话到页面中

    // 可以获取服务端数据,要先等待后端答案生成完毕
    axios({
      method: "get",
      // url:"http://10.8.7.12:86/chat",
      data: {
        question: usersInput.value,
      },
      url: "http://127.0.0.1:8888/one/data",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      // console.log(res.data)
      dialog.answer = res.data.answer;
      // console.log(dialog.answer)
      // console.dir(dialog)
      historyList.value[0].history.push(dialog);
    });
    chatWindowScroll = setInterval(() => {
      chatWindow.scrollTop = chatWindow.scrollHeight - chatWindow.clientHeight;
      // console.dir(chatWindowScroll)
    }, 100);

    // console.dir(document.querySelector(".chatWindow"))

    usersInput.value = "";

    //
    // axios.get('http://10.8.7.12:86/chat', { question: usersInput.value },
    //   {
    //     headers:{
    // 'Content-Type': 'application/json'
    //   }
    //   })
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
  } else {
    console.error("History list is not properly initialized.");
  }
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

// 向服务端发送问题（语音）
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

// 向服务端发送问题（图片）
const postImage = () => {
  console.log("发送图像");
};

// 接收服务器返回值
const getServerReturn = () => {
  console.log("获取服务器返回值");
};

onMounted(() => {
  let chatWindow = document.querySelector(".chatWindow");
  chatWindow.scrollTop = chatWindow.scrollHeight - chatWindow.clientHeight;
});
</script>

<style scoped>
.el-button {
  background-color: #2f2f2f;
  border: none;
  color: #f0f8ff;
}
.userInput {
  outline-style: none;
  /* border: 1px solid #ccc; */
  border: none;
  border-radius: 50px;
  padding: 10px;
  width: 93%;
  font-size: 14px;
  font-weight: 500;
  font-family: "Microsoft soft";
  background-color: #212121;
  color: #f0f8ff;
}
.subChatInput {
  border: #2f2f2f 1px solid;
  border-radius: 50px;
  background-color: #212121;
  padding: 5px;

  display: flex;
  justify-content: space-around;
}
.SearchBtn {
  height: 60px;
  width: 60px;
  background-color: #212121;
  right: 0;
  color: #8d8d8d;
  border-radius: 50px;
}
.SearchBtn:hover {
  background-color: #2f2f2f;
  /* border: #2f2f2f 1px solid; */
  color: #f0f8ff;
}
.otherBtn {
  margin-left: 10px;
  height: 60px;
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

.chatWindow {
  width: 100%;
  height: 50em;
  /* height: auto; */
  /* border: 1px red solid; */
  display: flex;
  flex-direction: column;
  overflow: auto; /* 隐藏超出范围的内容 */
}
.item {
  flex: 1;
}
.chatWindow::-webkit-scrollbar {
  display: none;
}

.chatInput {
  margin-top: 10px;
  width: 100%;
  justify-items: center;
  align-items: center;
}
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
  /* background-color: #6b6c6d; */
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
  /* color: red; */
}
.agentBubble {
  display: flex;
  flex-direction: row;
}
.Image {
  width: 50px;
  height: 50px;
  justify-content: center;
  align-items: center;
  display: flex;
}
</style>