# 源代码 使用手册



## 注意

- 如果是__github__下载的要在客户端或者服务端的__项目目录下__执行命令：

  npm i 

  以下载相关依赖



## 客服端

- 位置：./client
- 开启命令：npm run dev



## 服务端（模拟后端）

#### 注意：服务端仅为调试网络传输代码时使用

- 位置：./server
- 开启命令:node index.js

## 版本

### 0.1.2

#### 更新

- 完成了服务器的跨区请求问题。
- 但是仍然有后端无法获取前端信息的问题





### 0.1.3

#### 更新

- 实现了语音录制
- 语音下载到本地
- 语音以Bolb、formData等格式发送给后端，但是还需要与后端对接（未完成）

#### 问题

- 传输格式还需要与后端对接





### 0.1.4

#### 更新

- 新增了文件上传窗口，及图片上传能力
- 实现了聊天历史记录切换
- 将数据从pinia移动至后端

#### 问题

- 发送消息忘记改了





### 0.1.5

#### 更新

- 重新进行了布局
- 添加了隐藏历史记录的按钮

#### 问题

- 发送消息又忘记该了
- 隐藏后仍然有问题





### 0.1.6

#### 更新

- 无

#### 修复

- 隐藏问题修复

#### 问题

- 发送消息又忘记该了





### 0.1.7

#### 更新

- 新增了新建对话功能
- 新增了文本复制按钮
- 新增了出现生成按钮

#### 修复

- 问题输出修复





### 0.1.8

#### 更新

- 新增登录页面
- 重新做了路由

#### 问题

- 登录系统未完善
- 路由系统需要配合登录系统做用户个人信息

#### 后续更新

- 需要一个删除对话的功能
- 需要mysql数据库
- 完善登录系统
- 设计好数据库



### 0.1.9

#### 更新

- 新增登录注册系统
- 再次重做了路由

#### 问题

- 注册系统未完善

#### 后续更新

- 需要一个删除对话的功能
- 需要mysql数据库
- 完善登录注册系统
- 完善用户系统
