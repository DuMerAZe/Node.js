var express = require('express')
var bodyParser = require('body-parser')


var comments = [{
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

var app = express()

// 公开public目录
// 当以 /public/ 开头的时候，去 ./public/ 目录中找对应的资源
// 推荐使用，便于辨识
app.use('/public/', express.static('./public/'))

// 当省略第一个参数时，则可以通过 省略 /public 的方式来访问
// app.use(express.static('./public/'))

// 必须是 /a/public 目录中的资源具体路径
// app.use('/a/',express.static('./public/'))


// 配置使用 art-template 模板引擎
// 第一个参数：当渲染以 .html 结尾的文件时，使用 art-template 模板引擎
//  express-art-template 是专门用来在 Express 中把art-template 整合到 Express 中
// 虽然外面这里不需要加载 art-template 但也必须安装
// 原因在于 express-art-template 依赖了 art-template  
app.engine('html', require('express-art-template'))


// Express 为 response 响应对象提供了一个方法： render
// render方法默认不可以使用，但是配置了模板引擎就可以
// res.render('html模板引擎', {模板数据})
// 第一个参数不能写路径，默认会去项目中的 views 目录中查找该模板文件
// 也就是说 Express 有一个约定， 开发人员把所有的试图文件都放在 views 目录中
// 如果想要修改默认的 views 目录， 则可以
// app.set('views', render函数的默认路径) 

//配置 body-parser 中间件（插件，专门用来解析表单 POST 请求体）
app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(bodyParser.json())

app.get('/', function (req, res) {
  res.render('index1.html', {
    comments: comments
  })
})


app.get('/post', function (req, res) {
  res.render('post.html')
})

// 当以 Post 请求 /post 时，执行指定的处理函数
// 这样我们就可以使用不同的请求方法，让一个请求路径使用多次
app.post('/post', function (req, res) {
  // 1.获取表单 POST 请求体数据
  // 2.处理
  // 3.发送响应

  // req.query 只能拿到 get 请求参数
  // console.log(req.query);    --{}
  var comment = req.body
  var date = new Date();
  var mytime = date.toLocaleDateString()
  comment.dateTime = mytime
  comments.unshift(comment)
  res.redirect('/')

  // res.end()
})

// app.get('/pinglun', function (req, res) {
//   var comment = req.query
//   var date = new Date();
//   // comment.dateTime = '2021-12-12'
//   // comment.mytime = date.toLocaleDateString()
//   // 获取当前时间，并添加到查询字符串中
//   var mytime = date.toLocaleDateString()
//   comment.dateTime = mytime
//   // console.log(comment);  --{ name: 'sadad', message: 'sadasdaa1', dateTime: '2021/11/15' }
//   comments.unshift(comment)

//   // 常规方法设置重定向到对应页面
//   // res.statusCode = 302
//   // res.setHeader('Location', '/')
//   // 设置两秒后跳转的页面
//   // res.setHeader("refresh", "2; URL= /")

//   // 使用 Express 后设置重定向
//   res.redirect('/')

//   res.end()
// })

app.listen(5000, function () {
  console.log('Server is running');
})