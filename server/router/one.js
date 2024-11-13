let express = require("express")
let multiparty = require('multiparty');
const multer = require("multer")
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

// 设置存储配置
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'router/image') // 确保这个文件夹已经存在
    },
    filename: function (req, file, cb) {
        let ext = file.originalname.substring(file.originalname.lastIndexOf('.'));
        cb(null, file.fieldname + '-' + Date.now() + ext) // 自定义文件名
        console.log();
    }
})

const upload = multer({ dest: "router/image", storage: storage })




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

    answer = "# sdsadjaslkj \n - apodasjdoasjdj \n - asdoas;ldkldksdsadjaslkj \n - apodasjdoasjdj \n - asdoas;ldkldksdsadjaslkj"
})

// 音频接收及发送模拟

router.post("/audio", upload.single("image"), (req, res) => {

    const file = req.file


    if (!file) {
        return res.status(400).send("上传失败")
    }
    // console.log(req.);
    res.send({
        status: 1,
        msg: "上传成功"
    })

})



/**
 * 模拟后端
 * 
 * 数据存储系统
 * 
 * 功能：
 *      get
 *          1、只是方便我调试代码时，用来看数据结构的，前端代码中没有使用到get请求
 *      post
 *          1、这里因为开了全端口响应，所有用了一个postCode作为是否产生响应的标识
 *          2、这里通过请求发送的uid判断前端请求的是哪一个用户的信息，因为这里只会返回对于用户的数据，不会将所有用户的数据返回（这里的get是返回所有数据的，只是想说一下以免误解返回的数据）
 *          
 */

router.get("/data", (req, res) => {
    res.send({
        userInfoList
    })
})


router.post('/data', (req, res) => {
    // 登录后进入chatWeb界面需要的数据
    if (req.body.postCode === "gdcpRegisterWebData") {
        let registerUserInfo = null
        userInfoList.find((item) => {
            if (item.uid === req.body.uid) {
                registerUserInfo = item
            }
        })
        if (registerUserInfo === null) {
            return;
        } else {
            res.send({
                uname: registerUserInfo.uname,
                email: registerUserInfo.email,
                phone: registerUserInfo.phone,
                historyList: registerUserInfo.userSetting.historyList,
                lastChat: registerUserInfo.userSetting.lastChat

            })
        }
    } else if (req.body.postCode === "gdcpDataPost") {

        // let isUserExists = false // 判断用户是否存在
        let msg = req.body
        console.log(msg);
        // 将用户新信息更新到数据库

        userInfoList.find((item, index) => {
            if (msg.uid === item.uid) {
                // isUserExists = true
                let newData = {
                    uid: item.uid,
                    uname: msg.uname,
                    email: msg.email,
                    phone: msg.phone,
                    password: item.password,
                    userSetting: {
                        lastChat: msg.lastChat,
                        historyList: msg.historyList
                    }
                }

                // userInfoList[index] = 
                jsonObj.userInfoList[index] = newData
                console.log("jsonObj", jsonObj.userInfoList);
                // 将对象转换为JSON字符串
                const data = JSON.stringify(jsonObj);

                // 同步写入文件
                fs.writeFileSync('./router/data/data.json', data);
                console.log('数据已写入文件')

                readJsonData()
                res.send("更新成功")
            }
        })



    }

})

/**
 * 模拟后端
 * 
 * 登录系统
 * 
 * 客户端登录端口
 * 
 * 功能：
 * 1、接收前端发送的post请求
 * 2、首先判断手机号或者邮箱和密码是否同时正确
 * 3、
 *  （1）如果都正确则返回登录成功的标识，和有需要的用户信息
 *  （2）如果有部分不正确或完全不正确则发送登录失败的标识
 *       
 * 
 */


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

/**
 * 模拟后端
 * 
 * 注册系统
 * 
 * 客户端注册端口
 * 
 * 功能：
 * 1、接收前端发送的post请求
 * 2、首先判断手机号或者邮箱是否已经被注册
 * 3、
 *  （1）如果已经注册isLogined变量为true
 *       将已被注册的信息返回给前端
 *  （2）如果没有被注册则将用户对象newUserInfo
 *       追加到userInfoList，并且写入到data.json中
 * 
 */
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
                lastChat: "0",
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
