let express = require("express")
let router=express.Router()

router.get("/data", (req, res)=>{
    

    // console.log(req.data)
    res.send({
        Temperature:+(Math.random() * 150).toFixed(0),
        Humidity:+(Math.random() * 200).toFixed(0),
        lightIntensity:+(Math.random() * 2500).toFixed(0),
        soilMoisture:+(Math.random() * 4000).toFixed(0),
        CO2:+(Math.random() * 4000).toFixed(0),
        data:[]
        
    })
})

router.post('/data',(req,res)=>{
    // const body = req.body
    // console.log(body)
    res.send({
        status:0,			//状态，0表示成功，1表示失败
        msg:'POST请求成功', //状态描述
        data:req.body		  // 需要响应给客户端的具体数据
    })
})

module.exports = router;
