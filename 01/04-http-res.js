// 处理请求
var http = require('http')

var server = http.createServer()

// request请求处理函数，需要接受两个参数
//    Request 请求对象
//      请求对象可以用来获取客户端的一些请求信息，例如请求路径url
//    Response 响应对象
//      响应对象可以用来给客户端发送响应信息
server.on('request', function (request, response) {
  console.log('收到请求，请求路径是：' + request.url);
  // response对象有一个方法：write  可以用来给客户端发送响应数据
  // write可以多次使用但最后一定要是用end方法结束响应，否则客户端会一直等待
  response.write('hello')
  response.write(' nodejs')
  // 告诉客户端响应结束，可以呈递给客户
  response.end()
  /* 由于现在我们的服务器的能力还很弱，无论是什么请求，都只能响应hello js
     思考：
        当请求不同路径时响应不同的结果
        例如：
        /           index
        /login      登录
        /register   注册
        /haha       哈哈 */
})

server.listen(3000, function () {
  console.log('服务器启动成功，可以通过http://127.0.0.1:3000/ 来进行访问');
})