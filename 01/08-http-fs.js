// 1.http结合fs发送文件中的数据
// 2.Content-type
//    http:/tools.oschina.net/commons   不同的资源对应的Content-Type是不一样的
//    图片不需要指定编码。一般只为字符数据指定编码
var http = require('http')
var fs = require('fs')

var server = http.createServer()

server.on('request', function (req, res) {
  var url = req.url

  // 文件是不能发给客户端的，只能发字符串，可通过fs.readFile()读文件
  if (url === '/') {
    fs.readFile('./resources/index.html', function (err, data) {
      if (err) {
        res.setHeader('Content-Type','text/plain; charset=utf-8')
        res.end('文件访问失败，请稍后重试')
      } else {
        // data默认是二进制数据，可以通过 .toString转为咱们能识别的字符串
        // res.end()支持两种数据类型，一种是二进制，一种是字符串
        // 图片不需要指定编码，因为编码一般是字符编码，所以如果服务器响应的是图片时就不需要chartset=utf-8
        res.getHeader('Content-Type', 'text-html;charset=utf-8')
        res.end(data)
      }
    })
  } else if (url === '/image') {
    fs.readFile('./resources/wx.jpg', function (err, data) {
      if (err) {
        res.setHeader('Content-Type', 'text/plain; charset=utf-8')
        res.end('文件访问失败，请稍后重试')
      } else {
        res.getHeader('Content-Type', 'image')
        res.end(data)
      }
    })
  }
})

server.listen(3000, function () {
  console.log('Server is running...');
})