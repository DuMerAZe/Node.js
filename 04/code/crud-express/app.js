/*
  app.js 入门模块
  职责：
    创建服务
    做一些服务相关配置：
      模板引擎
      body-parser 解析表单 post 请求体数据
      提供静态资源
    挂载路由
    监听断口启动服务
*/

var express = require('express')
var router = require('./router')
var bodyParser = require('body-parser')

var app = express()

app.use('/node_modules', express.static('./node_modules/'))
app.use('/public/', express.static('./public/'))

app.engine('html', require('express-art-template'))

// 配置模板引擎和 body-parser 一个定要在 app.use(router) 挂载路由之前
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// 使用 Express 的方式把路由挂载到 app 服务
app.use(router)

// 不使用Express引入router.js的 router 函数，并启动
// router(app)


app.listen(3000, function () {
  console.log('Server is running');
})