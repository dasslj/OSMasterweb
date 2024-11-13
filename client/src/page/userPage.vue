<template>
    <div :class="{ main: true }">

        <div :class="{ mainShow: true, blur: isPopUp }">
            <div class="userInfoShow">
                <div class="userAvatarBox">
                    <div class="userAvatar"><img src="../assets/MdiAccount.svg" alt="">
                        <div class="avataCover"></div>
                    </div>

                </div>
                <div class="userBasicInfo">
                    <div class="userBasicInfoItem" v-for="(itme, index) in userBasicInfoList" :key="index">
                        <div>{{ itme.name }}: {{ itme.valse }} </div>
                    </div>

                </div>
                <div class="changeUserInfoBox" title="修改信息">
                    <el-button @click="popUpSubWindow">
                        <div>
                            <CirclePlusFilled />
                        </div>
                    </el-button>
                </div>
            </div>

        </div>
        <div :class="{ popUpWindow: true, active: isPopUp }"></div>

    </div>
</template>

<script setup>
// 导入vue-router库，以及相关配置
import { useRoute } from "vue-router";
import router from "../router/index.js";
const route = useRoute();

// 导入axios库
import axios from "axios";

// 导入vue3自带的函数
import {
    ref,
    reactive,
    onMounted,
    onBeforeMount,
} from "vue";
// 导入pinia库，以及相关配置
import { storeToRefs } from "pinia";
import useShop from "../store/index.js";
const store = useShop();
const {
    uname,
    email,
    phone,
} = storeToRefs(store);

// 导入element-plus库的内置图标
import {
    CirclePlusFilled
} from "@element-plus/icons-vue";

const userBasicInfoList = reactive([
    {
        name: "用户名",
        valse: uname.value
    },
    {
        name: "邮箱",
        valse: email.value ? email.value : "空"
    },
    {
        name: "电话号码",
        valse: phone.value ? phone.value : "空"
    }
])

const isPopUp = ref(false)  // 弹窗是否出现flag


/**
 * 前端
 *
 * 数据加载系统
 *
 * @param uid 用户id，用于让后端定位用户信息
 *
 * 功能：
 *      获取用户信息，并同步到piaio中
 *
 */

const getUserInfo = (uid) => {
    axios
        .post("http://localhost:8888/one/data", {
            uid,
            postCode: "gdcpRegisterWebData",
        })
        .then((res) => {
            if (res.status === 200) {
                const infoNameList = [res.data.uname, res.data.email, res.data.phone]
                // console.log(res.data);
                uname.value = res.data.uname
                email.value = res.data.email
                phone.value = res.data.phone
                for (let i = 0; i < userBasicInfoList.length; i++) {
                    userBasicInfoList[i].valse = infoNameList[i]
                }

            }
        });

};

/**
 * 前端
 * 
 * 信息修改系统
 * 
 * 功能：
 *      弹出用户信息修改框
 */

const popUpSubWindow = () => {
    isPopUp.value = !isPopUp.value
}

/**
 * 前端
 * 
 * 信息修改系统
 * 
 * 功能：
 *      1、相关用户信息并更新到后端
 */
const changeUserBasicInfo = () => {

}
onBeforeMount(() => {

})

onMounted(() => {
    let routeParams = route.params;
    getUserInfo(routeParams.uid.split(":")[1]);

})



</script>

<style scoped>
.main {
    margin: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    /* justify-content: center; */
    color: aliceblue;
    width: 100%;
    height: 100vh;
}



.mainShow {
    width: 90%;
    /* height: 80vh; */
    /* border: 1px red solid; */
    overflow: auto;
    padding: 40px;
}

.mainShow.blur {
    filter: blur(20px);
    pointer-events: none;
    user-select: none;
}

.userInfoShow {
    width: 100%;
    height: 25vh;
    display: flex;
    flex-direction: row;
    margin-top: 75px;
    /* border: 1px blue solid; */
    align-items: center;
    position: relative;
    background-color: #4b4b4b;
    box-shadow: 0 5px 30px rgba(0, 0, 0.3);
    border-radius: 30px;
}

.userAvatarBox {
    width: 300px;
    display: flex;
    /* align-items: center; */
    justify-content: center;
    position: relative;
}

.userAvatar {
    background-color: #fff;
    width: 150px;
    height: 150px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;

}

.avataCover {
    width: 100%;
    height: 30px;
    position: absolute;
    /* background-color: #2C2C2C; */
    z-index: 1000;
    bottom: 0%;
}

.userBasicInfo {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 90px;
}

.userBasicInfoItem {
    display: flex;
    flex-direction: column;

}

.changeUserInfoBox {
    position: absolute;
    bottom: 10px;
    right: 10px;
}

.changeUserInfoBox .el-button {
    background-color: #4b4b4b;
    color: #fff;
    border: none;
    padding: 0;
    margin: 0;
    transition: 0.5s;
    height: auto;
}

.changeUserInfoBox .el-button:hover {
    color: #ffd04b;
}

.changeUserInfoBox .el-button div {
    width: 20px;
}

.popUpWindow {
    position: fixed;
    top: 40%;
    left: 50%;
    /* background-color: #212121; */
    background-color: #4b4b4b;
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

.popUpWindow.active {
    transition: 0.5s;
    opacity: 1;
    visibility: visible;
    top: 50%;
}
</style>