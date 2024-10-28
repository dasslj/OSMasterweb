let express = require("express")
let multiparty = require('multiparty');
let router = express.Router()
const fs = require("fs")


// 读取data文件获取数据
// 同步读取文件
let userInfoList = []
let jsonObj = {}
const readJsonData = () => {
    const data = fs.readFileSync('./router/data/data.json', 'utf8');

    // 将JSON字符串转换为对象
    jsonObj = JSON.parse(data);

    console.log('从文件读取的数据:', jsonObj);

    userInfoList = jsonObj.userInfoList
}
readJsonData()


// 问题接收及回答发送模拟

let question = ""
let answer = ""
router.get("/chat", (req, res) => {
    // console.log(req.data)
    question = req.body.question
    res.send({
        question: question,
        answer: "" + answer

    })
})

router.post('/chat', (req, res) => {
    question = req.body.question
    // console.log(body)
    if (question == "") {
        return;
    }
    res.send({
        status: 0,			//状态，0表示成功，1表示失败
        msg: 'POST请求成功(text)', //状态描述
        data: req.body		  // 需要响应给客户端的具体数据
    })
    // 这里要获取回答

    answer = "sdsadjaslkj apodasjdoasjdj asdoas;ldkldksdsadjaslkj apodasjdoasjdj asdoas;ldkldksdsadjaslkj apodasjdoasjdj asdoas;ldkldksdsadjaslkj apodasjdoasjdj asdoas;ldkldksdsadjaslkj apodasjdoasjdj asdoas;ldkldksdsadjaslkj apodasjdoasjdj asdoas;ldkldksdsadjaslkj apodasjdoasjdj asdoas;ldkldksdsadjaslkj apodasjdoasjdj asdoas;ldkldksdsadjaslkj apodasjdoasjdj asdoas;ldkldk"
})

// 音频接收及发送模拟

router.post("/audio", (req, res) => {
    // formData = req.body
    let form = new multiparty.Form()
    form.parse(req, function (err, fields, file) {
        console.log(fields);
        res.send({
            status: 0,			//状态，0表示成功，1表示失败
            msg: 'POST请求成功(audio)', //状态描述
            data: fields		  // 需要响应给客户端的具体数据
        })

    })

})

// router.get("/audio", (req, res) => {
//     formData = req.body
//     console.log(formData);

//     res.send({
//         formData: formData		  // 需要响应给客户端的具体数据
//     })
// })

// 数据库模拟

// let userInfoList = [
//     {
//         uid: "01093002",
//         uname: "admin",
//         email: "dasslj@163.com",
//         phone: "13316050448",
//         password: "123456",
//         userSetting: {
//             historyList: [
//                 {
//                     topicId: "0",
//                     topic: "怎么证明1+1=2请详细说明",
//                     history: [




//                         {
//                             question: "Linux系统的cd命令有什么用,Linux系统的cd命令有什么用,Linux系统的cd命令有什么用,Linux系统的cd命令有什么用,Linux系统的cd命令有什么用,Linux系统的cd命令有什么用",
//                             answer:
//                                 "在Linux系统中，cd（change directory）命令用于更改当前工作目录。它允许用户导航到文件系统中的其他位置.在Linux系统中，cd（change directory）命令用于更改当前工作目录。它允许用户导航到文件系统中的其他位置.在Linux系统中，cd（change directory）命令用于更改当前工作目录。它允许用户导航到文件系统中的其他位置.在Linux系统中，cd（change directory）命令用于更改当前工作目录。它允许用户导航到文件系统中的其他位置.在Linux系统中，cd（change directory）命令用于更改当前工作目录。它允许用户导航到文件系统中的其他位置.在Linux系统中，cd（change directory）命令用于更改当前工作目录。它允许用户导航到文件系统中的其他位置",
//                         },
//                         {
//                             question: "Linux系统的cd命令有什么用",
//                             answer:
//                                 "在Linux系统中，cd（change directory）命令用于更改当前工作目录。它允许用户导航到文件系统中的其他位置",
//                         },
//                         {
//                             question: "Linux系统的cd命令有什么用",
//                             answer:
//                                 "在Linux系统中，cd（change directory）命令用于更改当前工作目录。它允许用户导航到文件系统中的其他位置",
//                         },
//                         {
//                             question: "Linux系统的cd命令有什么用",
//                             answer:
//                                 "在Linux系统中，cd（change directory）命令用于更改当前工作目录。它允许用户导航到文件系统中的其他位置",
//                         },
//                         {
//                             question: "Linux系统的cd命令有什么用",
//                             answer:
//                                 "在Linux系统中，cd（change directory）命令用于更改当前工作目录。它允许用户导航到文件系统中的其他位置",
//                         },
//                         {
//                             question: "Linux系统的cd命令有什么用",
//                             answer:
//                                 "在Linux系统中，cd（change directory）命令用于更改当前工作目录。它允许用户导航到文件系统中的其他位置",
//                         },
//                         {
//                             question: "Linux系统的cd命令有什么用",
//                             answer:
//                                 "在Linux系统中，cd（change directory）命令用于更改当前工作目录。它允许用户导航到文件系统中的其他位置",
//                         },
//                         {
//                             question: "Linux系统的cd命令有什么用",
//                             answer:
//                                 "在Linux系统中，cd（change directory）命令用于更改当前工作目录。它允许用户导航到文件系统中的其他位置",
//                         },
//                         {
//                             question: "Linux系统的cd命令有什么用",
//                             answer:
//                                 "在Linux系统中，cd（change directory）命令用于更改当前工作目录。它允许用户导航到文件系统中的其他位置",
//                         },
//                         {
//                             question: "怎么证明1+1=2请详细说明",
//                             answer: "不告诉你",
//                         },
//                         {
//                             question: "Linux系统的cd命令有什么用,Linux系统的cd命令有什么用,Linux系统的cd命令有什么用,Linux系统的cd命令有什么用,Linux系统的cd命令有什么用,Linux系统的cd命令有什么用",
//                             answer:
//                                 "在Linux系统中，cd（change directory）命令用于更改当前工作目录。它允许用户导航到文件系统中的其他位置.在Linux系统中，cd（change directory）命令用于更改当前工作目录。它允许用户导航到文件系统中的其他位置.在Linux系统中，cd（change directory）命令用于更改当前工作目录。它允许用户导航到文件系统中的其他位置.在Linux系统中，cd（change directory）命令用于更改当前工作目录。它允许用户导航到文件系统中的其他位置.在Linux系统中，cd（change directory）命令用于更改当前工作目录。它允许用户导航到文件系统中的其他位置.在Linux系统中，cd（change directory）命令用于更改当前工作目录。它允许用户导航到文件系统中的其他位置",
//                         },
//                         {
//                             question: "Linux系统的cd命令有什么用",
//                             answer:
//                                 "在Linux系统中，cd（change directory）命令用于更改当前工作目录。它允许用户导航到文件系统中的其他位置",
//                         },
//                         {
//                             question: "Linux系统的cd命令有什么用",
//                             answer:
//                                 "在Linux系统中，cd（change directory）命令用于更改当前工作目录。它允许用户导航到文件系统中的其他位置",
//                         },
//                         {
//                             question: "Linux系统的cd命令有什么用",
//                             answer:
//                                 "在Linux系统中，cd（change directory）命令用于更改当前工作目录。它允许用户导航到文件系统中的其他位置",
//                         },
//                         {
//                             question: "Linux系统的cd命令有什么用",
//                             answer:
//                                 "在Linux系统中，cd（change directory）命令用于更改当前工作目录。它允许用户导航到文件系统中的其他位置",
//                         },
//                         {
//                             question: "Linux系统的cd命令有什么用",
//                             answer:
//                                 "在Linux系统中，cd（change directory）命令用于更改当前工作目录。它允许用户导航到文件系统中的其他位置",
//                         },
//                         {
//                             question: "Linux系统的cd命令有什么用",
//                             answer:
//                                 "在Linux系统中，cd（change directory）命令用于更改当前工作目录。它允许用户导航到文件系统中的其他位置",
//                         },
//                         {
//                             question: "Linux系统的cd命令有什么用",
//                             answer:
//                                 "在Linux系统中，cd（change directory）命令用于更改当前工作目录。它允许用户导航到文件系统中的其他位置",
//                         },
//                         {
//                             question: "Linux系统的cd命令有什么用",
//                             answer:
//                                 "在Linux系统中，cd（change directory）命令用于更改当前工作目录。它允许用户导航到文件系统中的其他位置",
//                         },
//                         {
//                             question: "怎么证明1+1=2请详细说明",
//                             answer: "不告诉你",
//                         },
//                         {
//                             question: "Linux系统的cd命令有什么用,Linux系统的cd命令有什么用,Linux系统的cd命令有什么用,Linux系统的cd命令有什么用,Linux系统的cd命令有什么用,Linux系统的cd命令有什么用",
//                             answer:
//                                 "在Linux系统中，cd（change directory）命令用于更改当前工作目录。它允许用户导航到文件系统中的其他位置.在Linux系统中，cd（change directory）命令用于更改当前工作目录。它允许用户导航到文件系统中的其他位置.在Linux系统中，cd（change directory）命令用于更改当前工作目录。它允许用户导航到文件系统中的其他位置.在Linux系统中，cd（change directory）命令用于更改当前工作目录。它允许用户导航到文件系统中的其他位置.在Linux系统中，cd（change directory）命令用于更改当前工作目录。它允许用户导航到文件系统中的其他位置.在Linux系统中，cd（change directory）命令用于更改当前工作目录。它允许用户导航到文件系统中的其他位置",
//                         },
//                         {
//                             question: "Linux系统的cd命令有什么用",
//                             answer:
//                                 "在Linux系统中，cd（change directory）命令用于更改当前工作目录。它允许用户导航到文件系统中的其他位置",
//                         },
//                         {
//                             question: "Linux系统的cd命令有什么用",
//                             answer:
//                                 "在Linux系统中，cd（change directory）命令用于更改当前工作目录。它允许用户导航到文件系统中的其他位置",
//                         },
//                         {
//                             question: "Linux系统的cd命令有什么用",
//                             answer:
//                                 "在Linux系统中，cd（change directory）命令用于更改当前工作目录。它允许用户导航到文件系统中的其他位置",
//                         },
//                         {
//                             question: "Linux系统的cd命令有什么用",
//                             answer:
//                                 "在Linux系统中，cd（change directory）命令用于更改当前工作目录。它允许用户导航到文件系统中的其他位置",
//                         },
//                         {
//                             question: "Linux系统的cd命令有什么用",
//                             answer:
//                                 "在Linux系统中，cd（change directory）命令用于更改当前工作目录。它允许用户导航到文件系统中的其他位置",
//                         },
//                         {
//                             question: "Linux系统的cd命令有什么用",
//                             answer:
//                                 "在Linux系统中，cd（change directory）命令用于更改当前工作目录。它允许用户导航到文件系统中的其他位置",
//                         },
//                         {
//                             question: "Linux系统的cd命令有什么用",
//                             answer:
//                                 "在Linux系统中，cd（change directory）命令用于更改当前工作目录。它允许用户导航到文件系统中的其他位置",
//                         },
//                         {
//                             question: "Linux系统的cd命令有什么用",
//                             answer:
//                                 "在Linux系统中，cd（change directory）命令用于更改当前工作目录。它允许用户导航到文件系统中的其他位置",
//                         },
//                         {
//                             question: "怎么证明1+1=2请详细说明",
//                             answer: "不告诉你",
//                         },
//                         {
//                             question: "Linux系统的cd命令有什么用,Linux系统的cd命令有什么用,Linux系统的cd命令有什么用,Linux系统的cd命令有什么用,Linux系统的cd命令有什么用,Linux系统的cd命令有什么用",
//                             answer:
//                                 "在Linux系统中，cd（change directory）命令用于更改当前工作目录。它允许用户导航到文件系统中的其他位置.在Linux系统中，cd（change directory）命令用于更改当前工作目录。它允许用户导航到文件系统中的其他位置.在Linux系统中，cd（change directory）命令用于更改当前工作目录。它允许用户导航到文件系统中的其他位置.在Linux系统中，cd（change directory）命令用于更改当前工作目录。它允许用户导航到文件系统中的其他位置.在Linux系统中，cd（change directory）命令用于更改当前工作目录。它允许用户导航到文件系统中的其他位置.在Linux系统中，cd（change directory）命令用于更改当前工作目录。它允许用户导航到文件系统中的其他位置",
//                         },
//                         {
//                             question: "Linux系统的cd命令有什么用",
//                             answer:
//                                 "在Linux系统中，cd（change directory）命令用于更改当前工作目录。它允许用户导航到文件系统中的其他位置",
//                         },
//                         {
//                             question: "Linux系统的cd命令有什么用",
//                             answer:
//                                 "在Linux系统中，cd（change directory）命令用于更改当前工作目录。它允许用户导航到文件系统中的其他位置",
//                         },
//                         {
//                             question: "Linux系统的cd命令有什么用",
//                             answer:
//                                 "在Linux系统中，cd（change directory）命令用于更改当前工作目录。它允许用户导航到文件系统中的其他位置",
//                         },
//                         {
//                             question: "Linux系统的cd命令有什么用",
//                             answer:
//                                 "在Linux系统中，cd（change directory）命令用于更改当前工作目录。它允许用户导航到文件系统中的其他位置",
//                         },
//                         {
//                             question: "Linux系统的cd命令有什么用",
//                             answer:
//                                 "在Linux系统中，cd（change directory）命令用于更改当前工作目录。它允许用户导航到文件系统中的其他位置",
//                         },
//                         {
//                             question: "Linux系统的cd命令有什么用",
//                             answer:
//                                 "在Linux系统中，cd（change directory）命令用于更改当前工作目录。它允许用户导航到文件系统中的其他位置",
//                         },
//                         {
//                             question: "Linux系统的cd命令有什么用",
//                             answer:
//                                 "在Linux系统中，cd（change directory）命令用于更改当前工作目录。它允许用户导航到文件系统中的其他位置",
//                         },
//                         {
//                             question: "Linux系统的cd命令有什么用",
//                             answer:
//                                 "在Linux系统中，cd（change directory）命令用于更改当前工作目录。它允许用户导航到文件系统中的其他位置",
//                         },
//                         {
//                             question: "怎么证明1+1=2请详细说明",
//                             answer: "不告诉你",
//                         },
//                         {
//                             question: "Linux系统的cd命令有什么用,Linux系统的cd命令有什么用,Linux系统的cd命令有什么用,Linux系统的cd命令有什么用,Linux系统的cd命令有什么用,Linux系统的cd命令有什么用",
//                             answer:
//                                 "在Linux系统中，cd（change directory）命令用于更改当前工作目录。它允许用户导航到文件系统中的其他位置.在Linux系统中，cd（change directory）命令用于更改当前工作目录。它允许用户导航到文件系统中的其他位置.在Linux系统中，cd（change directory）命令用于更改当前工作目录。它允许用户导航到文件系统中的其他位置.在Linux系统中，cd（change directory）命令用于更改当前工作目录。它允许用户导航到文件系统中的其他位置.在Linux系统中，cd（change directory）命令用于更改当前工作目录。它允许用户导航到文件系统中的其他位置.在Linux系统中，cd（change directory）命令用于更改当前工作目录。它允许用户导航到文件系统中的其他位置",
//                         },
//                         {
//                             question: "Linux系统的cd命令有什么用",
//                             answer:
//                                 "在Linux系统中，cd（change directory）命令用于更改当前工作目录。它允许用户导航到文件系统中的其他位置",
//                         },
//                         {
//                             question: "Linux系统的cd命令有什么用",
//                             answer:
//                                 "在Linux系统中，cd（change directory）命令用于更改当前工作目录。它允许用户导航到文件系统中的其他位置",
//                         },
//                         {
//                             question: "Linux系统的cd命令有什么用",
//                             answer:
//                                 "在Linux系统中，cd（change directory）命令用于更改当前工作目录。它允许用户导航到文件系统中的其他位置",
//                         },
//                         {
//                             question: "Linux系统的cd命令有什么用",
//                             answer:
//                                 "在Linux系统中，cd（change directory）命令用于更改当前工作目录。它允许用户导航到文件系统中的其他位置",
//                         },
//                         {
//                             question: "Linux系统的cd命令有什么用",
//                             answer:
//                                 "在Linux系统中，cd（change directory）命令用于更改当前工作目录。它允许用户导航到文件系统中的其他位置",
//                         },
//                         {
//                             question: "Linux系统的cd命令有什么用",
//                             answer:
//                                 "在Linux系统中，cd（change directory）命令用于更改当前工作目录。它允许用户导航到文件系统中的其他位置",
//                         },
//                         {
//                             question: "Linux系统的cd命令有什么用",
//                             answer:
//                                 "在Linux系统中，cd（change directory）命令用于更改当前工作目录。它允许用户导航到文件系统中的其他位置",
//                         },
//                         {
//                             question: "Linux系统的cd命令有什么用",
//                             answer:
//                                 "在Linux系统中，cd（change directory）命令用于更改当前工作目录。它允许用户导航到文件系统中的其他位置在Linux系统中，cd（change directory）命令用于更改当前工作目录。它允许用户导航到文件系统中的其他位置.在Linux系统中，cd（change directory）命令用于更改当前工作目录。它允许用户导航到文件系统中的其他位置.在Linux系统中，cd（change directory）命令用于更改当前工作目录。它允许用户导航到文件系统中的其他位置.在Linux系统中，cd（change directory）命令用于更改当前工作目录。它允许用户导航到文件系统中的其他位置.在Linux系统中，cd（change directory）命令用于更改当前工作目录。它允许用户导航到文件系统中的其他位置.在Linux系统中，cd（change directory）命令用于更改当前工作目录。它允许用户导航到文件系统中的其他位置",
//                         },
//                     ],
//                 },
//                 {
//                     topicId: "12",
//                     topic: "超出选项卡测试",
//                     history: [
//                         {
//                             question: "Linux的cd命令有什么用",
//                             answer: "在Linux系统中，cd（change directory）命令用于更改当前工作目录。它允许用户导航到文件系统中的其他位置",
//                         },

//                     ],
//                 }, {
//                     topicId: "13",
//                     topic: "超出选项卡测试",
//                     history: [
//                         {
//                             question: "Linux的cd命令有什么用",
//                             answer: "在Linux系统中，cd（change directory）命令用于更改当前工作目录。它允许用户导航到文件系统中的其他位置",
//                         },

//                     ],
//                 }
//             ]
//         }

//     }
// ]


router.get("/data", (req, res) => {
    res.send({
        userInfoList
    })
})


router.post('/data', (req, res) => {
    if (req.body.postCode === "gdcp") {
        let registerUserInfo = null
        userInfoList.find((item) => {
            if (item.uid === req.body.uid) {
                registerUserInfo = item
            }

        })
        if (registerUserInfo === null) {
            return;
        } else {
            // console.log("historyList:", { historyList: registerUserInfo.userSetting });

            res.send({ historyList: registerUserInfo.userSetting.historyList })
        }



    }

})

// 客户端登录端口
router.post("/register", (req, res) => {
    const registerInfo = req.body
    let registerUserInfo = null
    userInfoList.find((value, index, list) => {
        // console.log(value);
        if ((value.email === registerInfo.account ||
            value.phone === registerInfo.account) &&
            value.password === registerInfo.password) {
            registerUserInfo = value
        }

    });
    if (registerUserInfo === null) {
        console.log("登录失败");
        res.send({
            registerStatus: false

        })
        return;
    }


    // 登录成功后
    console.log(registerUserInfo.uname, "登录成功");
    res.send({
        uid: registerUserInfo.uid,
        uname: registerUserInfo.uname,
        registerStatus: true

    })
    return;



})

// 客户端注册端口
router.post("/login", (req, res) => {
    const loginInfo = req.body
    let isLogined = false
    userInfoList.find((item) => {
        if (item.email == loginInfo.email || item.phone == loginInfo.phone) {
            isLogined = true
        }
    })

    if (isLogined) {
        res.send({
            msg: "注册失败，因为有相同的邮箱或手机号被注册",
            loginStatus: !isLogined
        })
    } else {
        res.send({
            msg: "注册成功",
            loginStatus: !isLogined
        })
        // 可以加一个验证码

        // 将新用户信息进入数据库
        console.log(loginInfo);
        let newUserInfo = {
            uid: "" + Date.now(),
            uname: loginInfo.uname,
            email: loginInfo.email,
            phone: loginInfo.phone,
            password: loginInfo.password,
            userSetting: {
                historyList: []
            },
        }
        // 将对象转换为JSON字符串
        jsonObj.userInfoList.push(newUserInfo)
        console.log("jsonObj", jsonObj.userInfoList);

        const data = JSON.stringify(jsonObj);

        // 同步写入文件
        fs.writeFileSync('./router/data/data.json', data);
        console.log('数据已写入文件')

        readJsonData()
    }



})



module.exports = router;
