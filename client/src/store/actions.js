import axios from "axios";
export default {
    /** 
     * 前端
     * 
     * 数据上传系统
     * 
     * 功能：将所有的用户数据上传给后端
     * 
     * 注意：目前这个函数没有完善，有很严重的性能问题，需要优化，所有在这条注意没有修改前，请不要使用它（除了我）
     *      
     * 
    */
    postDataTOServer(uid = "", chatId = "", uname = "", email = "", phone = "", historyList = []) {

        axios
            .post("http://localhost:8888/one/data", {
                uid,
                postCode: "gdcpDataPost",
                lastChat: chatId,
                uname: uname,
                email: email,
                phone: phone,
                historyList: historyList
            })
            .then((res) => {
                if (res.status == 200) {
                    console.log(res.data);

                }
            })
            .catch((e) => {
                console.log("发生了一些错误：", e);
            })
    }
}