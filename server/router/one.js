let express = require("express")
let multiparty = require('multiparty');
let router = express.Router()

let question = ""
let answer = ""
router.get("/data", (req, res) => {
    // console.log(req.data)
    question = req.body.question
    res.send({
        question: question,
        answer: "" + answer

    })
})

router.post('/data', (req, res) => {
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

module.exports = router;
