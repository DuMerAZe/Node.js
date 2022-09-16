var http = require('http')
var fs = require('fs')

// 创建服务器
var server = http.createServer()

var wwwDir = 'E:/CODE/NodeJs/02/www'



// 监听server的request请求事件，设置请求处理函数
// server.on('request', function (req, res) {
//   var url = req.url
//   if (url === '/') {
//     fs.readFile(wwwDir + '\index.html', function (err, data) {
//       if (err) {
//         return res.end('404 Not Found');
//       }
//       res.end(data) 
//     })
//   } else if (url === '/a.txt') {
//     fs.readFile(wwwDir + '\a.txt', function (err, data) {
//       if (err) {
//         return res.end('404 Not Found');
//       }
//       res.end(data)
//     })
//   } else if (url === '/index.html') {
//     fs.readFile(wwwDir + '\index.html', function (err, data) {
//       if (err) {
//         return console.log('404 Not Found');
//       }
//       res.end(data)
//     })
//   } else if (url === '/apple/login.html') {
//     fs.readFile(wwwDir + '\apple\login.html', function (err, data) {
//       if (err) {
//         return console.log('404 Not Found');
//       }
//       res.end(data)
//     })
//   }
// })

server.on('request', function (req, res) {
  var url = req.url

  var filePath = '/index.html'
  if (url !== '/') {
    filePath = url
  }
  
  fs.readFile(wwwDir + filePath, function (err, data) {
    if (err) {
      return res.end('404 Not Found')
    }
    res.end(data)
  })
})


server.listen(3000, function () {
  console.log('server is running');
})