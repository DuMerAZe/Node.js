// 0. 安装
// 1. 引包
var express = require('express')

// 2. 创建你的服务器应用程序
//    也就是原来的 http.createServer
var app = express()

// 公开指定目录
// 如此便可直接 通过 /public/xx 的方式访问  public 目录中所有的资源
app.use('/public/', express.static('./public/'))


// 当服务器收到 get 请求 / 的时候，执行回调函数
app.get('/', function (req, res) {
  // 在 Express 中可以直接 req.query来查询字符串参数
  console.log(req.query);   
  res.send('hello express')
})

app.get('/about', function (req, res) {
  res.send('你好，我是express')
})


// 相当于 server.listen
app.listen(3000, function () {
  console.log('Server is running');
})