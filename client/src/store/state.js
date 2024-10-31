import { version } from "vue"

export default () => {
  return {
    webVersion: "版本：0.2.1.2",  // 网页最下方的显示内容
    chatId: "0",               // 当前显示的topic的id 
    isbgBlur: false,           // 图片发送子窗口是否出现（也是背景是否虚化的开关），显示是：true，不显示是：false
    isHide: false,             // 是否隐藏历史记录，隐藏为：true，显示为：false
    isUpload: false,           // 当前状态是否正在提交问题，提交问题中为：true，
    isReUpload: false,         // 当前状态是否正在重新提交问题，正在重新提交问题中为：true，
    uname: "",                 // 用户名
    email: "",                 // 用户的邮箱
    phone: "",                 // 用户的手机号
    historyList: []            // 用户的会话历史列表

  }
} 