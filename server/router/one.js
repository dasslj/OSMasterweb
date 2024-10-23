let express = require("express")
let multiparty = require('multiparty');
let router = express.Router()


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
let historyList = [
    {
        topicId: "0",
        topic: "怎么证明1+1=2请详细说明",
        history: [
            {
                question: "怎么证明1+1=2请详细说明",
                answer: "不告诉你",
            },
            {
                question: "Linux系统的cd命令有什么用,Linux系统的cd命令有什么用,Linux系统的cd命令有什么用,Linux系统的cd命令有什么用,Linux系统的cd命令有什么用,Linux系统的cd命令有什么用",
                answer:
                    "在Linux系统中，cd（change directory）命令用于更改当前工作目录。它允许用户导航到文件系统中的其他位置.在Linux系统中，cd（change directory）命令用于更改当前工作目录。它允许用户导航到文件系统中的其他位置.在Linux系统中，cd（change directory）命令用于更改当前工作目录。它允许用户导航到文件系统中的其他位置.在Linux系统中，cd（change directory）命令用于更改当前工作目录。它允许用户导航到文件系统中的其他位置.在Linux系统中，cd（change directory）命令用于更改当前工作目录。它允许用户导航到文件系统中的其他位置.在Linux系统中，cd（change directory）命令用于更改当前工作目录。它允许用户导航到文件系统中的其他位置",
            },
            {
                question: "Linux系统的cd命令有什么用",
                answer:
                    "在Linux系统中，cd（change directory）命令用于更改当前工作目录。它允许用户导航到文件系统中的其他位置",
            },
            {
                question: "Linux系统的cd命令有什么用",
                answer:
                    "在Linux系统中，cd（change directory）命令用于更改当前工作目录。它允许用户导航到文件系统中的其他位置",
            },
            {
                question: "Linux系统的cd命令有什么用",
                answer:
                    "在Linux系统中，cd（change directory）命令用于更改当前工作目录。它允许用户导航到文件系统中的其他位置",
            },
            {
                question: "Linux系统的cd命令有什么用",
                answer:
                    "在Linux系统中，cd（change directory）命令用于更改当前工作目录。它允许用户导航到文件系统中的其他位置",
            },
            {
                question: "Linux系统的cd命令有什么用",
                answer:
                    "在Linux系统中，cd（change directory）命令用于更改当前工作目录。它允许用户导航到文件系统中的其他位置",
            },
            {
                question: "Linux系统的cd命令有什么用",
                answer:
                    "在Linux系统中，cd（change directory）命令用于更改当前工作目录。它允许用户导航到文件系统中的其他位置",
            },
            {
                question: "Linux系统的cd命令有什么用",
                answer:
                    "在Linux系统中，cd（change directory）命令用于更改当前工作目录。它允许用户导航到文件系统中的其他位置",
            },
            {
                question: "Linux系统的cd命令有什么用",
                answer:
                    "在Linux系统中，cd（change directory）命令用于更改当前工作目录。它允许用户导航到文件系统中的其他位置",
            },
            {
                question: "怎么证明1+1=2请详细说明",
                answer: "不告诉你",
            },
            {
                question: "Linux系统的cd命令有什么用,Linux系统的cd命令有什么用,Linux系统的cd命令有什么用,Linux系统的cd命令有什么用,Linux系统的cd命令有什么用,Linux系统的cd命令有什么用",
                answer:
                    "在Linux系统中，cd（change directory）命令用于更改当前工作目录。它允许用户导航到文件系统中的其他位置.在Linux系统中，cd（change directory）命令用于更改当前工作目录。它允许用户导航到文件系统中的其他位置.在Linux系统中，cd（change directory）命令用于更改当前工作目录。它允许用户导航到文件系统中的其他位置.在Linux系统中，cd（change directory）命令用于更改当前工作目录。它允许用户导航到文件系统中的其他位置.在Linux系统中，cd（change directory）命令用于更改当前工作目录。它允许用户导航到文件系统中的其他位置.在Linux系统中，cd（change directory）命令用于更改当前工作目录。它允许用户导航到文件系统中的其他位置",
            },
            {
                question: "Linux系统的cd命令有什么用",
                answer:
                    "在Linux系统中，cd（change directory）命令用于更改当前工作目录。它允许用户导航到文件系统中的其他位置",
            },
            {
                question: "Linux系统的cd命令有什么用",
                answer:
                    "在Linux系统中，cd（change directory）命令用于更改当前工作目录。它允许用户导航到文件系统中的其他位置",
            },
            {
                question: "Linux系统的cd命令有什么用",
                answer:
                    "在Linux系统中，cd（change directory）命令用于更改当前工作目录。它允许用户导航到文件系统中的其他位置",
            },
            {
                question: "Linux系统的cd命令有什么用",
                answer:
                    "在Linux系统中，cd（change directory）命令用于更改当前工作目录。它允许用户导航到文件系统中的其他位置",
            },
            {
                question: "Linux系统的cd命令有什么用",
                answer:
                    "在Linux系统中，cd（change directory）命令用于更改当前工作目录。它允许用户导航到文件系统中的其他位置",
            },
            {
                question: "Linux系统的cd命令有什么用",
                answer:
                    "在Linux系统中，cd（change directory）命令用于更改当前工作目录。它允许用户导航到文件系统中的其他位置",
            },
            {
                question: "Linux系统的cd命令有什么用",
                answer:
                    "在Linux系统中，cd（change directory）命令用于更改当前工作目录。它允许用户导航到文件系统中的其他位置",
            },
            {
                question: "Linux系统的cd命令有什么用",
                answer:
                    "在Linux系统中，cd（change directory）命令用于更改当前工作目录。它允许用户导航到文件系统中的其他位置",
            },
            {
                question: "怎么证明1+1=2请详细说明",
                answer: "不告诉你",
            },
            {
                question: "Linux系统的cd命令有什么用,Linux系统的cd命令有什么用,Linux系统的cd命令有什么用,Linux系统的cd命令有什么用,Linux系统的cd命令有什么用,Linux系统的cd命令有什么用",
                answer:
                    "在Linux系统中，cd（change directory）命令用于更改当前工作目录。它允许用户导航到文件系统中的其他位置.在Linux系统中，cd（change directory）命令用于更改当前工作目录。它允许用户导航到文件系统中的其他位置.在Linux系统中，cd（change directory）命令用于更改当前工作目录。它允许用户导航到文件系统中的其他位置.在Linux系统中，cd（change directory）命令用于更改当前工作目录。它允许用户导航到文件系统中的其他位置.在Linux系统中，cd（change directory）命令用于更改当前工作目录。它允许用户导航到文件系统中的其他位置.在Linux系统中，cd（change directory）命令用于更改当前工作目录。它允许用户导航到文件系统中的其他位置",
            },
            {
                question: "Linux系统的cd命令有什么用",
                answer:
                    "在Linux系统中，cd（change directory）命令用于更改当前工作目录。它允许用户导航到文件系统中的其他位置",
            },
            {
                question: "Linux系统的cd命令有什么用",
                answer:
                    "在Linux系统中，cd（change directory）命令用于更改当前工作目录。它允许用户导航到文件系统中的其他位置",
            },
            {
                question: "Linux系统的cd命令有什么用",
                answer:
                    "在Linux系统中，cd（change directory）命令用于更改当前工作目录。它允许用户导航到文件系统中的其他位置",
            },
            {
                question: "Linux系统的cd命令有什么用",
                answer:
                    "在Linux系统中，cd（change directory）命令用于更改当前工作目录。它允许用户导航到文件系统中的其他位置",
            },
            {
                question: "Linux系统的cd命令有什么用",
                answer:
                    "在Linux系统中，cd（change directory）命令用于更改当前工作目录。它允许用户导航到文件系统中的其他位置",
            },
            {
                question: "Linux系统的cd命令有什么用",
                answer:
                    "在Linux系统中，cd（change directory）命令用于更改当前工作目录。它允许用户导航到文件系统中的其他位置",
            },
            {
                question: "Linux系统的cd命令有什么用",
                answer:
                    "在Linux系统中，cd（change directory）命令用于更改当前工作目录。它允许用户导航到文件系统中的其他位置",
            },
            {
                question: "Linux系统的cd命令有什么用",
                answer:
                    "在Linux系统中，cd（change directory）命令用于更改当前工作目录。它允许用户导航到文件系统中的其他位置",
            },
            {
                question: "怎么证明1+1=2请详细说明",
                answer: "不告诉你",
            },
            {
                question: "Linux系统的cd命令有什么用,Linux系统的cd命令有什么用,Linux系统的cd命令有什么用,Linux系统的cd命令有什么用,Linux系统的cd命令有什么用,Linux系统的cd命令有什么用",
                answer:
                    "在Linux系统中，cd（change directory）命令用于更改当前工作目录。它允许用户导航到文件系统中的其他位置.在Linux系统中，cd（change directory）命令用于更改当前工作目录。它允许用户导航到文件系统中的其他位置.在Linux系统中，cd（change directory）命令用于更改当前工作目录。它允许用户导航到文件系统中的其他位置.在Linux系统中，cd（change directory）命令用于更改当前工作目录。它允许用户导航到文件系统中的其他位置.在Linux系统中，cd（change directory）命令用于更改当前工作目录。它允许用户导航到文件系统中的其他位置.在Linux系统中，cd（change directory）命令用于更改当前工作目录。它允许用户导航到文件系统中的其他位置",
            },
            {
                question: "Linux系统的cd命令有什么用",
                answer:
                    "在Linux系统中，cd（change directory）命令用于更改当前工作目录。它允许用户导航到文件系统中的其他位置",
            },
            {
                question: "Linux系统的cd命令有什么用",
                answer:
                    "在Linux系统中，cd（change directory）命令用于更改当前工作目录。它允许用户导航到文件系统中的其他位置",
            },
            {
                question: "Linux系统的cd命令有什么用",
                answer:
                    "在Linux系统中，cd（change directory）命令用于更改当前工作目录。它允许用户导航到文件系统中的其他位置",
            },
            {
                question: "Linux系统的cd命令有什么用",
                answer:
                    "在Linux系统中，cd（change directory）命令用于更改当前工作目录。它允许用户导航到文件系统中的其他位置",
            },
            {
                question: "Linux系统的cd命令有什么用",
                answer:
                    "在Linux系统中，cd（change directory）命令用于更改当前工作目录。它允许用户导航到文件系统中的其他位置",
            },
            {
                question: "Linux系统的cd命令有什么用",
                answer:
                    "在Linux系统中，cd（change directory）命令用于更改当前工作目录。它允许用户导航到文件系统中的其他位置",
            },
            {
                question: "Linux系统的cd命令有什么用",
                answer:
                    "在Linux系统中，cd（change directory）命令用于更改当前工作目录。它允许用户导航到文件系统中的其他位置",
            },
            {
                question: "Linux系统的cd命令有什么用",
                answer:
                    "在Linux系统中，cd（change directory）命令用于更改当前工作目录。它允许用户导航到文件系统中的其他位置",
            },
            {
                question: "怎么证明1+1=2请详细说明",
                answer: "不告诉你",
            },
            {
                question: "Linux系统的cd命令有什么用,Linux系统的cd命令有什么用,Linux系统的cd命令有什么用,Linux系统的cd命令有什么用,Linux系统的cd命令有什么用,Linux系统的cd命令有什么用",
                answer:
                    "在Linux系统中，cd（change directory）命令用于更改当前工作目录。它允许用户导航到文件系统中的其他位置.在Linux系统中，cd（change directory）命令用于更改当前工作目录。它允许用户导航到文件系统中的其他位置.在Linux系统中，cd（change directory）命令用于更改当前工作目录。它允许用户导航到文件系统中的其他位置.在Linux系统中，cd（change directory）命令用于更改当前工作目录。它允许用户导航到文件系统中的其他位置.在Linux系统中，cd（change directory）命令用于更改当前工作目录。它允许用户导航到文件系统中的其他位置.在Linux系统中，cd（change directory）命令用于更改当前工作目录。它允许用户导航到文件系统中的其他位置",
            },
            {
                question: "Linux系统的cd命令有什么用",
                answer:
                    "在Linux系统中，cd（change directory）命令用于更改当前工作目录。它允许用户导航到文件系统中的其他位置",
            },
            {
                question: "Linux系统的cd命令有什么用",
                answer:
                    "在Linux系统中，cd（change directory）命令用于更改当前工作目录。它允许用户导航到文件系统中的其他位置",
            },
            {
                question: "Linux系统的cd命令有什么用",
                answer:
                    "在Linux系统中，cd（change directory）命令用于更改当前工作目录。它允许用户导航到文件系统中的其他位置",
            },
            {
                question: "Linux系统的cd命令有什么用",
                answer:
                    "在Linux系统中，cd（change directory）命令用于更改当前工作目录。它允许用户导航到文件系统中的其他位置",
            },
            {
                question: "Linux系统的cd命令有什么用",
                answer:
                    "在Linux系统中，cd（change directory）命令用于更改当前工作目录。它允许用户导航到文件系统中的其他位置",
            },
            {
                question: "Linux系统的cd命令有什么用",
                answer:
                    "在Linux系统中，cd（change directory）命令用于更改当前工作目录。它允许用户导航到文件系统中的其他位置",
            },
            {
                question: "Linux系统的cd命令有什么用",
                answer:
                    "在Linux系统中，cd（change directory）命令用于更改当前工作目录。它允许用户导航到文件系统中的其他位置",
            },
            {
                question: "Linux系统的cd命令有什么用",
                answer:
                    "在Linux系统中，cd（change directory）命令用于更改当前工作目录。它允许用户导航到文件系统中的其他位置",
            },
            {
                question: "怎么证明1+1=2请详细说明",
                answer: "不告诉你",
            },
            {
                question: "Linux系统的cd命令有什么用,Linux系统的cd命令有什么用,Linux系统的cd命令有什么用,Linux系统的cd命令有什么用,Linux系统的cd命令有什么用,Linux系统的cd命令有什么用",
                answer:
                    "在Linux系统中，cd（change directory）命令用于更改当前工作目录。它允许用户导航到文件系统中的其他位置.在Linux系统中，cd（change directory）命令用于更改当前工作目录。它允许用户导航到文件系统中的其他位置.在Linux系统中，cd（change directory）命令用于更改当前工作目录。它允许用户导航到文件系统中的其他位置.在Linux系统中，cd（change directory）命令用于更改当前工作目录。它允许用户导航到文件系统中的其他位置.在Linux系统中，cd（change directory）命令用于更改当前工作目录。它允许用户导航到文件系统中的其他位置.在Linux系统中，cd（change directory）命令用于更改当前工作目录。它允许用户导航到文件系统中的其他位置",
            },
            {
                question: "Linux系统的cd命令有什么用",
                answer:
                    "在Linux系统中，cd（change directory）命令用于更改当前工作目录。它允许用户导航到文件系统中的其他位置",
            },
            {
                question: "Linux系统的cd命令有什么用",
                answer:
                    "在Linux系统中，cd（change directory）命令用于更改当前工作目录。它允许用户导航到文件系统中的其他位置",
            },
            {
                question: "Linux系统的cd命令有什么用",
                answer:
                    "在Linux系统中，cd（change directory）命令用于更改当前工作目录。它允许用户导航到文件系统中的其他位置",
            },
            {
                question: "Linux系统的cd命令有什么用",
                answer:
                    "在Linux系统中，cd（change directory）命令用于更改当前工作目录。它允许用户导航到文件系统中的其他位置",
            },
            {
                question: "Linux系统的cd命令有什么用",
                answer:
                    "在Linux系统中，cd（change directory）命令用于更改当前工作目录。它允许用户导航到文件系统中的其他位置",
            },
            {
                question: "Linux系统的cd命令有什么用",
                answer:
                    "在Linux系统中，cd（change directory）命令用于更改当前工作目录。它允许用户导航到文件系统中的其他位置",
            },
            {
                question: "Linux系统的cd命令有什么用",
                answer:
                    "在Linux系统中，cd（change directory）命令用于更改当前工作目录。它允许用户导航到文件系统中的其他位置",
            },
            {
                question: "Linux系统的cd命令有什么用",
                answer:
                    "在Linux系统中，cd（change directory）命令用于更改当前工作目录。它允许用户导航到文件系统中的其他位置",
            },
            {
                question: "怎么证明1+1=2请详细说明",
                answer: "不告诉你",
            },
            {
                question: "Linux系统的cd命令有什么用,Linux系统的cd命令有什么用,Linux系统的cd命令有什么用,Linux系统的cd命令有什么用,Linux系统的cd命令有什么用,Linux系统的cd命令有什么用",
                answer:
                    "在Linux系统中，cd（change directory）命令用于更改当前工作目录。它允许用户导航到文件系统中的其他位置.在Linux系统中，cd（change directory）命令用于更改当前工作目录。它允许用户导航到文件系统中的其他位置.在Linux系统中，cd（change directory）命令用于更改当前工作目录。它允许用户导航到文件系统中的其他位置.在Linux系统中，cd（change directory）命令用于更改当前工作目录。它允许用户导航到文件系统中的其他位置.在Linux系统中，cd（change directory）命令用于更改当前工作目录。它允许用户导航到文件系统中的其他位置.在Linux系统中，cd（change directory）命令用于更改当前工作目录。它允许用户导航到文件系统中的其他位置",
            },
            {
                question: "Linux系统的cd命令有什么用",
                answer:
                    "在Linux系统中，cd（change directory）命令用于更改当前工作目录。它允许用户导航到文件系统中的其他位置",
            },
            {
                question: "Linux系统的cd命令有什么用",
                answer:
                    "在Linux系统中，cd（change directory）命令用于更改当前工作目录。它允许用户导航到文件系统中的其他位置",
            },
            {
                question: "Linux系统的cd命令有什么用",
                answer:
                    "在Linux系统中，cd（change directory）命令用于更改当前工作目录。它允许用户导航到文件系统中的其他位置",
            },
            {
                question: "Linux系统的cd命令有什么用",
                answer:
                    "在Linux系统中，cd（change directory）命令用于更改当前工作目录。它允许用户导航到文件系统中的其他位置",
            },
            {
                question: "Linux系统的cd命令有什么用",
                answer:
                    "在Linux系统中，cd（change directory）命令用于更改当前工作目录。它允许用户导航到文件系统中的其他位置",
            },
            {
                question: "Linux系统的cd命令有什么用",
                answer:
                    "在Linux系统中，cd（change directory）命令用于更改当前工作目录。它允许用户导航到文件系统中的其他位置",
            },
            {
                question: "Linux系统的cd命令有什么用",
                answer:
                    "在Linux系统中，cd（change directory）命令用于更改当前工作目录。它允许用户导航到文件系统中的其他位置",
            },
            {
                question: "Linux系统的cd命令有什么用",
                answer:
                    "在Linux系统中，cd（change directory）命令用于更改当前工作目录。它允许用户导航到文件系统中的其他位置",
            },
        ],
    },
    {
        topicId: "1",
        topic: "请证明10-100≠100",
        history: [
            {
                question: "请证明10-100≠100",
                answer: "不告诉你",
            },

        ],
    },
    {
        topicId: "2",
        topic: "Linux的cd命令有什么用",
        history: [
            {
                question: "Linux的cd命令有什么用",
                answer: "在Linux系统中，cd（change directory）命令用于更改当前工作目录。它允许用户导航到文件系统中的其他位置",
            },

        ],
    },
    {
        topicId: "3",
        topic: "无历史测试",
        history: [
        ],
    },
    {
        topicId: "4",
        topic: "超出选项卡测试",
        history: [
            {
                question: "Linux的cd命令有什么用",
                answer: "在Linux系统中，cd（change directory）命令用于更改当前工作目录。它允许用户导航到文件系统中的其他位置",
            },

        ],
    }, {
        topicId: "5",
        topic: "超出选项卡测试",
        history: [
            {
                question: "Linux的cd命令有什么用",
                answer: "在Linux系统中，cd（change directory）命令用于更改当前工作目录。它允许用户导航到文件系统中的其他位置",
            },

        ],
    }, {
        topicId: "6",
        topic: "超出选项卡测试",
        history: [
            {
                question: "Linux的cd命令有什么用",
                answer: "在Linux系统中，cd（change directory）命令用于更改当前工作目录。它允许用户导航到文件系统中的其他位置",
            },

        ],
    }, {
        topicId: "7",
        topic: "超出选项卡测试",
        history: [
            {
                question: "Linux的cd命令有什么用",
                answer: "在Linux系统中，cd（change directory）命令用于更改当前工作目录。它允许用户导航到文件系统中的其他位置",
            },

        ],
    }, {
        topicId: "8",
        topic: "超出选项卡测试",
        history: [
            {
                question: "Linux的cd命令有什么用",
                answer: "在Linux系统中，cd（change directory）命令用于更改当前工作目录。它允许用户导航到文件系统中的其他位置",
            },

        ],
    }, {
        topicId: "9",
        topic: "超出选项卡测试",
        history: [
            {
                question: "Linux的cd命令有什么用",
                answer: "在Linux系统中，cd（change directory）命令用于更改当前工作目录。它允许用户导航到文件系统中的其他位置",
            },

        ],
    }, {
        topicId: "10",
        topic: "超出选项卡测试",
        history: [
            {
                question: "Linux的cd命令有什么用",
                answer: "在Linux系统中，cd（change directory）命令用于更改当前工作目录。它允许用户导航到文件系统中的其他位置",
            },

        ],
    }, {
        topicId: "11",
        topic: "超出选项卡测试",
        history: [
            {
                question: "Linux的cd命令有什么用",
                answer: "在Linux系统中，cd（change directory）命令用于更改当前工作目录。它允许用户导航到文件系统中的其他位置",
            },

        ],
    }, {
        topicId: "12",
        topic: "超出选项卡测试",
        history: [
            {
                question: "Linux的cd命令有什么用",
                answer: "在Linux系统中，cd（change directory）命令用于更改当前工作目录。它允许用户导航到文件系统中的其他位置",
            },

        ],
    }, {
        topicId: "13",
        topic: "超出选项卡测试",
        history: [
            {
                question: "Linux的cd命令有什么用",
                answer: "在Linux系统中，cd（change directory）命令用于更改当前工作目录。它允许用户导航到文件系统中的其他位置",
            },

        ],
    }
]

router.get("/data", (req, res) => {
    res.send({
        historyList

    })
})


router.post('/data', (req, res) => {
    res.send({
        status: 0,			//状态，0表示成功，1表示失败
        msg: 'POST请求成功(text)', //状态描述
        data: req.body		  // 需要响应给客户端的具体数据
    })

})





module.exports = router;
