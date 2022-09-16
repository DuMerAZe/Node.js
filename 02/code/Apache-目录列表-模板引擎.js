var http = require('http')
var fs = require('fs')
var template = require('art-template')
const { title } = require('process')

// 创建服务器
var server = http.createServer()

var wwwDir = 'E:/CODE/NodeJs/02/www'

server.on('request', function (req, res) {

  var url = req.url

  fs.readFile('./template-Apache.html', function (err, data) {
    if (err) {
      return res.end('404 Not Found')
    }
    // 1. 如何得到wwwDir目录列表中的目录名和文件名
    //  fs.readdir
    // 2. 如何将得到的目录名和文件名替换到template.html中
    //  2.1 在template.html中需要替换的位置预留一个特殊的标记
    //       就像使用模板引擎的标记一样
    //  2.2 根据files生成html
    fs.readdir(wwwDir, function (err, files) {
      // 这个files数组中装的是当前文件夹下所有的文件名(包括文件夹)
      if (err) {
        return res.end('Can not find www dir')
      }
      // 生成需要替换的内容
      var htmlstr = template.render(data.toString(), {
        title: title,
        files: files
      })
      // 3.发送解析替换过后的响应
      res.end(htmlstr)
    })

  })
})


server.listen(5000, function () {
  console.log('server is running');
})