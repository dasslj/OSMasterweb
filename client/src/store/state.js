import { version } from "vue"

export default () => {
  return {
    webVersion: "版本：0.2.0",
    chatId: "0",
    isbgBlur: false,
    isHide: { bool: false, iconOpen: ">", iconHide: "<" },
    isUpload: false,
    historyList: []
  }
} 