var http = require('http')

// 1.创建服务器
var server = http.createServer()

// 2.监听request请求事件，设置请求处理函数
server.on('request', function (req, res) {
  console.log('收到请求，请求路径是：' + req.url);
  console.log('请求我的客户端地址是：',req.socket.remoteAddress, req.socket.remotePort);  
  /* // res.write('hello')
  // res.write(' nodejs')
  // res.end()

  // 上面的方式比较麻烦，推荐使用更简单的方法，直接end的同时接响应结果
  res.end('hello world') */

  /* 
    根据不同的请求路径发送不同的响应结果
    1.获取请求路径
      req.url 获取到的是断口号后面的那一部分路径
    2.判断路径处理响应
  */
  var url = req.url
  if (url === '/') {
    res.end('index.page')
  } else if (url === '/login') {
    res.end('login page')
  } else if (url === '/products') {
    var products = [{
        name: '苹果X',
        price: 8899
      },
      {
        name: '华为P30',
        price: 4799
      },
      {
        name: '小米11',
        price: 4399
      }
    ]
    res.end(JSON.stringify(products))
  } else {
    res.end('404 Not Found')
  }

  
})

server.listen(3000, function () {
  console.log('服务器启动成功，可以通过http://127.0.0.1:3000/ 来进行访问');
})