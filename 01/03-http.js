// 使用Node构建一个Web服务器
// 在Node中专门提供了一个核心模块：http
// 这个http就是帮你创建编写1服务器的

//  1. 加载 http 核心模块
var http = require('http')

// 2.使用 http.createServer() 方法创建一个Web服务器
//  返回一个实例
var server = http.createServer()

// 3.服务器提供服务
//    注册request请求事件
//    当客户端请求过去，就会自动触发服务器的request请求事件，然后执行的二个参数：回调函数
server.on('request', function () {
   console.log('收到请求');
})

// 4.绑定端口号，启动服务器
server.listen(3000, function () {
  console.log('服务器启动成功，可以通过http://127.0.0.1:3000/ 来进行访问');
})