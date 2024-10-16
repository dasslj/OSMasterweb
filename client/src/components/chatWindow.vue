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
        <div class="bubbleList" v-for="(item, index) in historyList[0].history" :key="index">
          
          
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
            <input v-model="usersInput" placeholder="请输入您要提问的问题" class="input-with-select userInput" />
            <el-button :icon="Search" @click="postUsersText" class="SearchBtn"/>
          </div>
        </el-col>
        <el-col :span="4">
          <el-button class="otherBtn" :icon="Microphone" @click="postAdiuo"/>
          <el-button class="otherBtn" :icon="Picture" @click="postImage"/>
        </el-col>
        
      </el-row>
    </el-col>
  </div>
</template>

<script setup>
import axios from 'axios';
import querystring from "querystring"
import { Search, Microphone,Picture } from "@element-plus/icons-vue";
import { ref } from "vue";
import { storeToRefs } from "pinia";
import useShop from "../store/index.js";


const store = useShop();
const { historyList } = storeToRefs(store);
const usersInput = ref("");
// console.log(historyList.value[0].history[1].question)
// 向服务端发送问题（文本）
const postUsersText = () => {
  if (usersInput.value == ""){
    return;
  }
  if (historyList.value && historyList.value[0] && historyList.value[0].history) {
    let dialog = { question: "", answer: "" };
    dialog.question = usersInput.value;
    // console.log(usersInput.value);
    

    // 发送数据给服务端
    axios({
      method:"post",
      url:"http://127.0.0.1:8888/one/data",
      data:{
        question:usersInput.value
      }
    })
    // .then(res=>{
    //   console.log(res.data)
    // })
    usersInput.value = ""

    // 可以获取服务端数据,要先等待后端答案生成完毕
    setTimeout(()=>{
      axios({
      method:"get",
      url:"http://127.0.0.1:8888/one/data"
    }).then(res=>{
      console.log(res.data)
      dialog.answer = res.data.answer
      console.log("一次对话：")
      console.dir(dialog)
    })
    }, 1000)

    

    // 
  //   axios.post('http://127.0.0.1:8888', { user_input: usersInput.value })
  //     .then(response => {
  //       dialog.answer = response.data.response;
  //       // 下面是将历史对话传到数据库的代码
  //       // historyList.value[0].history.push(dialog);
  //       console.log(dialog)
  //       usersInput.value = "";
  //     })
  //     .catch(error => {
  //       console.error('Error sending user input:', error);
  //     });
  // } else {
  //   console.error("History list is not properly initialized.");
  }
  // usersInput.value = ""
};

// 向服务端发送问题（语音）
const postAdiuo = () =>{
  console.log("发送语音");
}

// 向服务端发送问题（图片）
const postImage = () =>{
  console.log("发送图像");
}

// 接收服务器返回值
const getServerReturn = () =>{
  console.log("获取服务器返回值");
}

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
.SearchBtn{
  height: 60px;
  width: 60px;
  background-color: #212121;
  right: 0;
  color: #8d8d8d;
  border-radius: 50px;
  
}
.SearchBtn:hover{
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

.chatWindow {
  width: 100%;
  height: 50em;
  /* height: auto; */
  /* border: 1px red solid; */
  display: flex;
  flex-direction: column;
  overflow: auto; /* 隐藏超出范围的内容 */
  
}
.item{
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