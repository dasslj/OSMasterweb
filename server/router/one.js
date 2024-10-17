let express = require("express")
let router=express.Router()

let question = ""
let answer = ""
router.get("/data", (req, res)=>{
    // console.log(req.data)
    question = req.body.question
    res.send({
        question:question,
        answer:""+answer
        
    })
})

router.post('/data',(req,res)=>{
    question = req.body.question
    // console.log(body)
    if (question == ""){
        return;
    }
    res.send({
        status:0,			//状态，0表示成功，1表示失败
        msg:'POST请求成功', //状态描述
        data:req.body		  // 需要响应给客户端的具体数据
    })
    // 这里要获取回答
    
    answer = "sdsadjaslkj apodasjdoasjdj asdoas;ldkldksdsadjaslkj apodasjdoasjdj asdoas;ldkldksdsadjaslkj apodasjdoasjdj asdoas;ldkldksdsadjaslkj apodasjdoasjdj asdoas;ldkldksdsadjaslkj apodasjdoasjdj asdoas;ldkldksdsadjaslkj apodasjdoasjdj asdoas;ldkldksdsadjaslkj apodasjdoasjdj asdoas;ldkldksdsadjaslkj apodasjdoasjdj asdoas;ldkldksdsadjaslkj apodasjdoasjdj asdoas;ldkldk"
})

module.exports = router;
