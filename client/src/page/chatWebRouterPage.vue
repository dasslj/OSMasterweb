<template>
  <div :class="{ main: true }">
    <div :class="{ bgBlur: isbgBlur, mainCol: true }">
      <div class="mainRow">
        <!-- 左侧的导航 -->
        <div :class="[{ leftRouter: true, activate: isHide.bool }]">
          <el-menu :default-active="routerStatus" class="mainMenu" active-text-color="#ffd04b" background-color="none"
            text-color="#fff" router="true" mode="vertical" collapse="true">
            <div class="commonMenuItem">
              <div class="logo">
                <img src="../assets/MdiLinux.svg" alt="" />
                <h1>OS 大师</h1>
              </div>
              <el-menu-item :index="routePath.chat" class="mainMenuItem">
                <template #title><span>会话</span></template>
                <el-icon>
                  <ChatSquare />
                </el-icon>
              </el-menu-item>

              <el-menu-item :index="routePath.other" class="mainMenuItem">
                <template #title><span>学习推荐</span></template>
                <el-icon>
                  <Search />
                </el-icon>
              </el-menu-item>
              <el-menu-item :index="routePath.other" class="mainMenuItem">
                <template #title><span>介绍</span></template>
                <el-icon>
                  <Help />
                </el-icon>
              </el-menu-item>
            </div>
            <div class="userMenuItem">
              <el-menu-item :index="routePath.user" class="mainMenuItem">
                <template #title><span>我的</span></template>
                <el-icon>
                  <User />
                </el-icon>
              </el-menu-item>
              <el-menu-item :index="routePath.setting" class="mainMenuItem">
                <template #title><span>设置</span></template>
                <el-icon>
                  <Setting />
                </el-icon>
              </el-menu-item>
              <el-menu-item :index="routerStatus" class="mainMenuItem LogoutClass" @click="Logout(uid)">
                <template #title><span>退出登录</span></template>
                <el-icon>
                  <Back />
                </el-icon>
              </el-menu-item>
            </div>
          </el-menu>
        </div>

        <!-- 右侧的路由展示 -->
        <div class="routerView">
          <router-view></router-view>
        </div>
      </div>
    </div>
    <!-- 图片上传窗口 -->
    <div :class="[{ subWindow: true, active: isbgBlur }]">
      <a href="#"><el-icon @click="blurToBG">
          <Close />
        </el-icon></a>

      <div class="uploadWindow">
        <el-upload ref="uploadRef" class="upload-demo uploadArea" drag multiple action="http://127.0.0.1:8888/one/audio"
          accept="image" list-type="text" limit="5" :on-success="imgSuccessUpload" :on-exceed="imgExceedUpload">
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
import axios from "axios";
import {
  ChatSquare,
  Search,
  Help,
  Setting,
  Microphone,
  UploadFilled,
  Close,
  User,
  Back,
} from "@element-plus/icons-vue";
import { onMounted, ref, onBeforeMount, reactive } from "vue";
import { storeToRefs } from "pinia";
import useShop from "../store/index.js";
const store = useShop();
const { isbgBlur, isHide, chatId, historyList, webVersion, uname, email, phone } =
  storeToRefs(store);


// 关于路由
import { useRoute, onBeforeRouteUpdate } from "vue-router";
import router from "../router/index.js";
// 第一次的时候执行这个函数获取路由参数
const route = useRoute();
const routerStatus = ref(window.location.pathname);

let routeParams = route.params;
const uid = routeParams.uid.split(":")[1]
const routePath = reactive({
  chat: `/chatWeb${routeParams.uid}&${routeParams.uname}/chat`,
  user: `/chatWeb${routeParams.uid}&${routeParams.uname}/user`,
  setting: `/chatWeb${routeParams.uid}&${routeParams.uname}/setting`,
  other: `/chatWeb${routeParams.uid}&${routeParams.uname}/other`,
});

// 上传窗口的ref
const uploadRef = ref("");

// 控制背景失焦的函数
const blurToBG = () => {
  isbgBlur.value = !isbgBlur.value;
  console.log(isbgBlur.value);
};

// 图片上传成功后的回调函数 (未完成还需要与后端对接)
const imgSuccessUpload = (response, uploadFile, uploadFiles) => {
  setTimeout(() => {
    uploadRef.value.clearFiles();
    isbgBlur.value = !isbgBlur.value;
  }, 1000);
};

// 上传超过限制的回调函数
const imgExceedUpload = (response, uploadFiles) => {
  alert("最多同时上传五张照片");
};

/**
 * 前端
 * 
 * 退出登录系统
 * 
 * @param uid 用于让后端定位用户信息
 * 
 * 功能：
 * 1、退出登录
 * 2、同时上传用户更改过的数据
 */
const Logout = (uid) => {
  localStorage.clear();
  router.push("/")
  axios
    .post("http://localhost:8888/one/data", {
      uid,
      postCode: "gdcpDataPost",
      lastChat: chatId.value,
      uname: uname.value,
      email: email.value,
      phone: phone.value,
      historyList: historyList.value
    })
    .then((res) => {
      if (res.status == 200) {
        console.log(res.data);

      }
    })
    .catch((e) => {
      console.log("发生了一些错误：", e);
    })

};



onBeforeMount(() => { });

onMounted(() => {
});
</script>

<style scoped>
/* .el-menu--horizontal {
  --el-menu-horizontal-height: 100px;
} */
.leftRouter {
  border-right: #c0c0c0 3px solid;
  z-index: 1000;
  background-color: #2c2c2c;
  transition: 0.5s;
}

.leftRouter.activate {
  background-color: #0e0e0e;
}



.logo {
  width: 64px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100px;
  margin-bottom: 40px;
  /* border-bottom: 10px #e7e7e7 solid; */
}

.logo h1 {
  font-size: 15px;
  color: #f0f8ff;
}

.logo img {
  width: 50px;
  background-color: #fff;
  padding: 5px;
  border-radius: 50%;
}

.routerView {
  width: 99%;
}

.mainRow {
  height: 100vh;
  /* justify-content: space-between; */
  flex-direction: row;
  display: flex;
}

.main {
  /* padding: 50px 0 0 0; */
  height: 100vh;
  align-items: center;
}

.mainMenu {
  display: flex;
  height: 100vh;
  /* width: 100%; */
  flex-direction: column;
  justify-content: space-between;
  padding-bottom: 70px;
}

.mainMenuItem {
  margin: 5px 0;
}

.leftRouter.activate .mainMenuItem:hover {
  background-color: #2c2c2c;
}

.mainMenuItem:hover {
  color: #ffd04b;
}

.LogoutClass {
  color: #ffffff;
}

/* .LogoutClass:hover {
  color: #ffd04b;
} */

.userMenuItem {
  bottom: 0;
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
</style>