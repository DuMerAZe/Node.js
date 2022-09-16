var http = require('http')

var server = http.createServer()

server.on('request', function (req, res) {
  // 在服务端默认发送的数据`，其实是utf8编码的内容
  // 但是浏览器不知道utf8格式的编码内容
  // 浏览器在不知道服务器响应内容的编码的情况下会按照当前操作系统的默认编码去解析
  // 中文操作系统默认是gbk
  // 解决的方法就是正确的告诉浏览器是什么编码的
  // 在http协议中，Content-Type就是用来告知对方我发送的数据内容的类型是什么
  // res.setHeader('Content-Type','text/plain; charset=utf-8')
  // res.end('hello 世界')

  var url = req.url
  if (url === '/plain') {
    // 服务器发送的是普通文本 
    res.setHeader('Content-Type', 'text/plain; charset=utf-8')
    res.end('hello 世界')
  } else if (url === '/url') {
    // 如果服务器发送的是html格式的字符串，则也要告诉浏览器我给你发送的是html格式的文本,即：
    res.setHeader('Content-Type', 'text/html; charset=utf-8')
    res.end('<p>hello html<a href="">点我</a></p>')

  }
})

server.listen(3000, function () {
  console.log('Server is running...');
})