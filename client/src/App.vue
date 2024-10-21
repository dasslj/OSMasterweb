<template>
  <div :class="{ main: true }">
    <el-col :span="30" :class="{ bgBlur: isbgBlur, mainCol: true }">
      <el-row :gutter="20" class="mainRow">
        <!-- 左侧的导航 -->
        <el-col :span="4">
          <h3 class="routerTitle">OS 大师</h3>
          <el-menu
            :default-active="routerStatus"
            class="mainMenu"
            active-text-color="#ffd04b"
            background-color="none"
            text-color="#fff"
            router="true"
            mode="vertical"
          >
            <el-menu-item index="/chat" class="mainMenuItem">
              <el-icon><ChatSquare /></el-icon>
              <span>会话</span>
            </el-menu-item>

            <el-menu-item index="/other" class="mainMenuItem">
              <el-icon><Search /></el-icon>
              <span>查询</span>
            </el-menu-item>
            <el-menu-item index="/other" class="mainMenuItem">
              <el-icon><Help /></el-icon>
              <span>介绍</span>
            </el-menu-item>
            <el-menu-item index="/other" class="mainMenuItem">
              <el-icon><Setting /></el-icon>
              <span>设置</span>
            </el-menu-item>
          </el-menu>
        </el-col>
        <el-col :span="19">
          <router-view></router-view>
        </el-col>
      </el-row>
    </el-col>
    <div :class="[{ subWindow: true, active: isbgBlur }]">
      <a href="#"
        ><el-icon @click="blurToBG"><Close /></el-icon
      ></a>
      <!-- <el-button @click="blurToBG"> 主界面失焦测试 </el-button> -->
      <div class="uploadWindow">
        <el-upload
          ref="uploadRef"
          class="upload-demo uploadArea"
          drag
          multiple
          action="http://127.0.0.1:8888/one/audio"
          accept="image"
          list-type="text"
          limit="5"
          :on-success="imgSuccessUpload"
          :on-exceed="imgExceedUpload"
        >
          <el-icon class="el-icon--upload"><upload-filled /></el-icon>
          <div class="el-upload__text">
            <div>将文件拖拽至此区域</div>
            或者 <em>点击上传</em>
          </div>
          <template #tip>
            <div class="el-upload__tip">最多同时上传5张图片</div>
          </template>
        </el-upload>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  ChatSquare,
  Search,
  Help,
  Setting,
  Microphone,
  UploadFilled,
  Close,
} from "@element-plus/icons-vue";
import chatPage from "./page/chatPage.vue";
import { ref } from "vue";
import { storeToRefs } from "pinia";
import useShop from "./store/index.js";
const store = useShop();
const { isbgBlur } = storeToRefs(store);
// import router from "./router/index.js"
// const routerList = ["/chat","/other"]
const routerStatus = ref(window.location.pathname);
// const routerStatus = ref("/chat")

// 上传窗口的ref
const uploadRef = ref("");

// 控制背景失焦的函数
const blurToBG = () => {
  isbgBlur.value = !isbgBlur.value;
  console.log(isbgBlur.value);
};

// 图片上传成功后的回调函数
const imgSuccessUpload = (response, uploadFile, uploadFiles) => {
  // console.log(response);
  // console.log(uploadFile);
  // console.log(uploadFiles);
  setTimeout(() => {
    uploadRef.value.clearFiles();
    isbgBlur.value = !isbgBlur.value;
  }, 1000);
};

// 上传超过限制的回调函数
const imgExceedUpload = (response, uploadFiles) => {
  alert("最多同时上传五张照片");
};
</script>

<style scoped>
.routerTitle {
  color: #f0f8ff;
  margin-bottom: 15px;
  text-align: center;
}
.mainRow {
  height: 100%;
}

.main {
  margin: 50px 30px;
}
.mainMenuItem {
  border-radius: 50px;
}
.mainMenuItem:hover {
  background-color: #212121;
  border-radius: 50px;
}
.bgBlur {
  filter: blur(20px);
  pointer-events: none;
  user-select: none;
}
.mainCol {
  transition: 0.5s;
}
.subWindow {
  position: fixed;
  top: 40%;
  left: 50%;
  /* background-color: #212121; */
  background-color: #fff;
  width: 800px;
  height: 600px;
  /* border: 1px red solid; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
  transform: translate(-50%, -50%);
  box-shadow: 0 5px 30px rgba(0, 0, 0.3);
  transition: 0.5s;
  opacity: 0;
  visibility: hidden;
}
.subWindow.active {
  transition: 0.5s;
  opacity: 1;
  visibility: visible;
  top: 50%;
}
.subWindow a {
  position: absolute;
  display: inline-block;
  margin: 15px;
  text-decoration: none;
  color: #212121;
  right: 0%;
  top: 0%;
}

.subWindow .close {
  display: flex;
  flex-direction: row;
  align-items: end;
}
.uploadWindow {
  width: 90%;
  /* height: 300px; */
  /* background-color: #212121; */
  /* background-color: red; */
  /* border: #ffd04b 1px solid; */
}
.uploadArea {
  /* border: #ffd04b 1px solid; */
  /* background-color: #212121; */
}
</style>