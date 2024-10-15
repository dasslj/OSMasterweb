let express = require("express");
let app=express();
app.use(function(req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length,Authorization, Accept, X-Requested-With, yourHeaderFeild");
    res.header("Access-Control-Allow-Methods", "yourHeaderFeild");
    res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");
    next();
});


let chartOne=require("./router/one");
let chartTest=require("./router/test")

const bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({ extended: false }));
 
// 解析json格式的表单数据
app.use(bodyParser.json());

app.use("/one",chartOne)
app.use("/test", chartTest)

app.listen(8888)

