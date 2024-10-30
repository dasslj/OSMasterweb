<template>
  <div class="registerMain">
    <div class="flowrBox">
      <div :class="{ threeBox: true, isLoginClass: isLogin }">
        <!-- 左侧注册也 -->
        <el-col :span="windowSpan.register">
          <div class="Window">
            <div class="Window">
              <div class="Register">
                <h1>登录您的账户</h1>
                <!-- <div class="thirdParty">
            
          </div> -->
                <p>请使用手机号或者邮箱登录</p>
                <div class="inputList">
                  <input placeholder="手机号/邮箱" v-model="registerForm.account" @keydown.enter="userRegister" />
                  <input placeholder="密码" type="password" v-model="registerForm.password"
                    @keydown.enter="userRegister" />
                </div>
                <el-button @click="userRegister">登 录</el-button>
              </div>
            </div>
          </div>
        </el-col>
        <!-- 中间滑动块 -->
        <el-col :span="windowSpan.slide">
          <div :class="{ Window: true, Silde: true, isLoginClass: isLogin }">
            <div v-if="isLogin" class="sildeShow">
              <div style="text-align: center">
                <h1>OS大师</h1>
                <h3>为你的Linux学习不再烦恼</h3>
              </div>
              <p>快来加入我们吧</p>
              <el-button @click="changeMode">前 往 注 册</el-button>
            </div>
            <div v-else class="sildeShow">
              <h1>OS大师</h1>
              <h3>为你的Linux学习不再烦恼</h3>
              <p>让我们开启学习吧</p>
              <el-button @click="changeMode">前 往 登 录</el-button>
            </div>
          </div>
        </el-col>
        <!-- 右侧注册块 -->
        <el-col :span="windowSpan.login">
          <div class="Window">
            <div class="Login">
              <h1>创建您的账户</h1>
              <!-- <div class="thirdParty">
            
          </div> -->
              <p>请使用手机号或者邮箱登录</p>
              <div class="inputList">
                <input placeholder="用户名" v-model="loginForm.uname" @keydown.enter="userLogin" />
                <input placeholder="手机号/邮箱" v-model="emailOrPhone" @keydown.enter="userLogin" />
                <input placeholder="密码" type="password" v-model="loginForm.password" @keydown.enter="userLogin" />
                <input placeholder="确认密码" type="password" v-model="loginForm.passwordAgain"
                  @keydown.enter="userLogin" />
              </div>
              <el-button @click="userLogin">注 册</el-button>
            </div>
          </div>
        </el-col>
      </div>
    </div>
    <div style="color: #fff">{{ webVersion }}</div>
  </div>
</template>

<script setup>
import axios from "axios";
import { onMounted, reactive, ref } from "vue";

// 导入pinia仓库
import { storeToRefs } from "pinia";
import useShop from "../store/index.js";
const store = useShop();
const { webVersion, registerSucceedUid } = storeToRefs(store);

// 导入vue-router
import router from "../router/index.js";

const REGISTER_URL = "http://127.0.0.1:8888/one/register";
const LOGIN_URL = "http://127.0.0.1:8888/one/login";

const isLogin = ref(true);

const registerForm = reactive({
  account: "",
  password: "",
});

const emailOrPhone = ref("");
const loginForm = reactive({
  uname: "",
  email: "",
  phone: "",
  password: "",
  passwordAgain: "",
});

// 0 9 16
const windowSpan = reactive({
  register: 15,
  slide: 10,
  login: 15,
});

// 修改当前模式（登录模式 或 注册模式）
const changeMode = () => {
  isLogin.value = !isLogin.value;
};

// 向服务端发送用户账号密码
const postUserInfo = () => {
  axios
    .post(REGISTER_URL, {
      account: registerForm.account,
      password: registerForm.password,
    })
    .then((res) => {
      if (res.data.registerStatus) {
        // registerSucceedUid.value = res.data.uid;
        localStorage.clear();
        localStorage.setItem("registerSucceedUid", res.data.uid);
        router.push(`/chatWeb:${res.data.uid}&:${res.data.uname}/chat`);
      }
    })
    .catch((error) => {
      console.log("网络连接错误", error);
      alert("网络连接错误");
    });
};

// 登录绑定函数
const userRegister = () => {
  // 防止空输入
  if (!(registerForm.account && registerForm.password)) {
    alert("账号或密码不能为空");
    return;
  }
  // 向服务端发送用户账号密码
  postUserInfo();
};

// 判断输入的是邮箱还是手机号
const isEmailOrPhone = (isFormatCorrect) => {
  const emailPattern =
    /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
  const phonePattern = /^1[3-9]\d{9}$/;
  if (emailPattern.test(emailOrPhone.value)) {
    loginForm.email = emailOrPhone.value;
    isFormatCorrect = true;
    // console.log(loginForm.phone, loginForm.email, 111);
    return isFormatCorrect;
  }
  // console.log(phonePattern.test(emailOrPhone.value), emailOrPhone.value);

  if (phonePattern.test(emailOrPhone.value)) {
    loginForm.phone = emailOrPhone.value;
    isFormatCorrect = true;
    // console.log(loginForm.phone, loginForm.email, 111);
    return isFormatCorrect;
  }
  // console.log(loginForm.phone, loginForm.email, 111);
  return isFormatCorrect;
};

// 注册绑定函数
const userLogin = () => {
  let isFormatCorrect = false;
  isEmailOrPhone(isFormatCorrect);
  if (isFormatCorrect) {
    alert("手机号或邮箱格式错误，请重试");
  }
  if (
    loginForm.uname &&
    (loginForm.email || loginForm.phone) &&
    loginForm.password === loginForm.passwordAgain
  ) {
    axios
      .post(LOGIN_URL, {
        uname: loginForm.uname,
        email: loginForm.email,
        phone: loginForm.phone,
        password: loginForm.password,
      })
      .then((res) => {
        if (res.status) {
          if (res.data.loginStatus) {
            alert("注册成功，回去登录吧");
            loginForm.uname = "";
            emailOrPhone.value = "";
            loginForm.email = "";
            loginForm.phone = "";
            loginForm.password = "";
            loginForm.passwordAgain = "";
            changeMode();
          } else {
            alert("邮箱或手机号已被注册");
          }
        }
      })
      .catch((error) => {
        console.log("网络连接错误", error);
        alert("网络连接错误");
      });
  } else {
    alert("不能有空哦,而且两次密码要相同");
  }
};

onMounted(() => { });
</script>

<style scoped>
h1 {
  color: #fff;
}

.registerMain {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: end;
  height: 100vh;
  width: 100%;
}

.flowrBox {
  position: fixed;
  top: 50%;
  left: 50%;

  width: 1000px;
  height: 600px;
  min-width: 1000px;
  min-height: 600px;
  /* border: 1px red solid; */
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
  transform: translate(-50%, -50%);
  transition: 0.5s;
  box-shadow: 0 5px 30px rgba(0, 0, 0.3);
  flex-direction: row;
  padding: 5px;
  background-color: #4b4b4b;
  border-radius: 20px;
  overflow: hidden;
  transition: 0.5s;
}

.threeBox {
  display: flex;
  flex-direction: row;
  width: 1600px;
  height: 600px;
  justify-content: center;
  transition: 0.5s;
  transform: translateX(-30%);
}

.threeBox.isLoginClass {
  transform: translateX(30%);
}

.flowrBox .el-col {
  transition: 0.5s;
}

.Window {
  width: 100%;
  height: 600px;
  /* border-radius: 30px; */
  /* border: 5px blue solid; */
  z-index: 1;
}

.Register {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 600px;
  color: #ffffff;
}

.Register p {
  color: #969696;
  margin: 10px 0;
}

.Silde {
  color: #fff;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #181818;
  box-shadow: 0px 5px 30px rgba(0, 0, 0.3);
  z-index: 2;
  height: 600px;
  background-image: url("../assets/MdiLinux.svg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 70px 0;

  transition: 0.5s;
}

.Silde.isLoginClass {
  box-shadow: 0px 5px -30px rgba(0, 0, 0.3);
  background-position: -240px 90px;
}

.sildeShow {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 400px;
}

.sildeShow p {
  color: #969696;
  margin: 80px 0 20px;
}

.Login {
  /* background-color: #636363; */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 600px;
  color: #ffffff;
}

.Login p {
  color: #969696;
  margin: 10px 0;
}

.inputList {
  display: flex;
  flex-direction: column;
  width: 70%;
  margin: 0 0 50px 0;
}

.inputList input {
  outline-style: none;
  border: none;

  padding: 15px 30px;
  width: 100%;
  font-size: 18px;
  font-weight: 500;
  font-family: "Microsoft soft";
  background-color: #4b4b4b;
  color: #ffffff;
  flex-wrap: nowrap;
  resize: none;
  margin: 6px 0;
  border-radius: 10px;

  box-shadow: inset 3px 3px 10px #242424, inset -3px -3px 5px #9b9b9b;
}

.el-button {
  border-radius: 100px;
  height: 40px;
  width: 200px;
  box-shadow: 3px 3px 10px #333333;
}

.el-button:hover {
  background-color: #333333;
  border: none;
  color: #ffd04b;
}
</style>