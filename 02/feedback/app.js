var http = require('http')
var fs = require('fs')
var url = require('url')
var template = require('art-template')

var comments = [
  {
    name: '张三',
    message: '今天天气真不错！',
    dateTime: '2021-11-1'
  },
  {
    name: '张三2',
    message: '今天天气真不错！',
    dateTime: '2021-11-1'
  },
  {
    name: '张三3',
    message: '今天天气真不错！',
    dateTime: '2021-11-1'
  },
  {
    name: '张三4',
    message: '今天天气真不错！',
    dateTime: '2021-11-1'
  },
  {
    name: '张三5',
    message: '今天天气真不错！',
    dateTime: '2021-11-1'
  }
]

    // /pinglun?name=三番四复&message=大富大贵的
    // 对于这种表单提交的请求路径，由于具有用户动态填写的内容
    // 所以不能通过判断完整的 url 路径来处理这个请求
    // 结论：对于我们来讲，只需判定如果你的请求路径是 /pinglun  的时候，那就认为是发送评论 

http
  .createServer(function (req, res) {
    // 使用 url.parse 方法将路径解析为一个方便操作的对象，第二个参数为 true 表示直接将查询字符串转为一个对象（ 通过query属性来访问）
    var parseObj = url.parse(req.url, true)

    // 单独获取不包含查询字符串的路径部分 （该路径不包含 ？ 之后的内容）
    var parseName = parseObj.pathname

    if (parseName === '/') {
      fs.readFile('./views/index1.html', function (err, data) {
        if (err) {
          return res.end('404 Not Found');
        }
        var htmlStr = template.render(data.toString(), {
          comments: comments
        })
        res.end(htmlStr);
      })
    } else if (parseName.indexOf('/public/') === 0) {
      // 统一处理：
      //    如果请求路径是以 /public/ 开头的，则我认为你要获取 public 中的某个资源
      //    所以就可以直接将请求路径当作文件路径来直接进行读取
      //将 pubilc目录下的所有资源开放出去
      fs.readFile('.' + parseName, function (err, data) {
        if (err) {
          return res.end('404 Not Found');
        }
        res.end(data)
      })
    } else if (parseName === '/post') {
      fs.readFile('./views/post.html', function (err, data) {
        if (err) {
          return res.end('404 Not Found');
        }
        res.end(data)
      })
    } else if (parseName === '/pinglun') {
      // 注意：这个时候无论 /pinglun?xxx  之后是什么，都不必担心，因为 parseName不包含？后面的内容
      // 一次请求对应一次响应，响应结束这次请求也就结束了
      // res.end(JSON.stringify(parseObj.query))

      //这里我们已经使用  url 模块的  parse方法把请求路径中的查询字符串解析成了一个对象
      // 接下来要做的是：
      //    1.获取表单提交的数据  parseObj.query
      //    2.将当前时间日期添加到数据对象中，然后存储到数组中
      //    3.让用户重定向跳转到首页  /
      //      当用户重新访问  / 时，数组中的数据已经发生变化,所以用户看到的页面也就变了
      var comment = parseObj.query
      console.log(comment);
      comment.dateTime = '2021-11-01 12:34:26'
      comments.unshift(comment)

      // 服务器这个时候已经把数据存储好了，接下来就是让用户重新请求 / 首页，就可以看到最新的内容
      // 如何通过服务器让客户端重定向？
      //    1.状态码设置成  302   --临时重定向
      //        statusCode
      //    2.在响应头中通过 location 告诉客户端往哪重定向
      //        setHeader
      // 如果客户端发现服务器的状态码为 302 就会自动去响应头中找  location，重新发起请求
      // 所以你就能看到客户端自动跳转了
      res.statusCode = 302
      res.setHeader('location', '/')
      res.end()

    } else {
      //其他都处理成404
      fs.readFile('./views/404.html', function (err, data) {
        if (err) {
          return res.end('404 Not Found')
        }
        res.end(data)
      })
    }
  }).listen(3000, function () {
    console.log('server is running');
  })


// 1.  / index.html
// 2. 开放 public 目录中的静态资源
//    当请求  /public/xxx 的时候，读取响应 public 目录中的静态资源
// 3. /post post.html
// 4. /pinglun
//    4.1 接收表单提交数据
//    4.2 存储表单提交的数据
//    4.3 让表单重定向到  /
//        statusCode
//        setHeader