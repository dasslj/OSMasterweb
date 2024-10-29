import axios from "axios";
export default {
    // 更新数据
    postDataTOServer(uid, chatId, uname, email, phone, historyList) {

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