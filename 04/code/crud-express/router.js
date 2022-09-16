/**
 * router.js 路由模块
 * 职责：
 *    处理路由
 *    根据不同的请求方法+请求路径设置具体的请求处理函数
 * 模块职责要单一，不要乱写
 * 我们划分模块的目的就是增加项目代码的可维护性
 * 提升开发效率
 */

var fs = require('fs')

var Students = require('./student')


// 通过自己封装函数的方式加载并导出路由，在app.js中var router = require('./router')导入，
// 并router(app)调用，即可连接router.js和app.js
// 这种方式需要自己封装函数所以不建议，
// 所以建议使用上面使用 Express 的方式
// module.exports = function (app) {
//   app.get('/students', function (req, res) {
//     fs.readFile('./db.json', 'utf8', function (err, data) {
//       if (err) {
//         return res.status(500).send('Server err.')
//       }
//       // 因为读取到的 data 是 string 类型，而 stu 要接收的是一个数组，所以先用 JSON.parse(data) 将 data 转换成对象，
//       // 再将 data 这个对象中的 students 属性保存到 stu 中
//       var students = JSON.parse(data).students
//       res.render('index.html', {
//         fruits: ['苹果', '香蕉', '鸭梨'],
//         stu: students
//       })
//     })
//   })

//   app.get('/students/new', function (req, res) {

//   })

//   app.get('/students/new', function (req, res) {

//   })

//   app.get('/students/new', function (req, res) {

//   })

//   app.get('/students/new', function (req, res) {

//   })

//   app.get('/students/new', function (req, res) {

//   })
// }



// Express 提供了一种加载路由的方式
// 0.首先导入express
var express = require('express')

// 1.创建一个路由容器
var router = express.Router()

// 2.把路由都挂载到 router 路由容器中
// 渲染首页
router.get('/students', function (req, res) {

  // fs.readFile('./db.json', 'utf8', function (err, data) {
  //   if (err) {
  //     return res.status(500).send('Server err.')
  //   }
  //   // 因为读取到的 data 是 string 类型，而 stu 要接收的是一个数组，所以先用 JSON.parse(data) 将 data 转换成对象，
  //   // 再将 data 这个对象中的 students 属性保存到 stu 中
  //   var students = JSON.parse(data).students
  //   res.render('index.html', {
  //     fruits: ['苹果', '香蕉', '鸭梨'],
  //     stu: students
  //   })
  // })

  Students.find(function (err, students) {
    if (err) {
      return res.status(500).send('Server err.')
    }
    res.render('index.html', { 
      fruits: ['苹果', '香蕉', '鸭梨'],
      stu: students
    })
  })

})


// 渲染添加学生页面
router.get('/students/new', function (req, res) {
  res.render('new.html')
})

// 处理添加学生请求
router.post('/students/new', function (req, res) {
  // 1.获取表单数据
  //    console.log(req.body)
  // 2.处理
  //      将数据保存到db.json文件中用以持久化
  // 3.发送响应
  //      先读取出来，转成对象
  //      然后往对象中 push 数据
  //      再把对象转成字符串
  //      再把字符串写入文件
  Students.save(req.body, function (err) {
    if (err) {
      return res.status(500).send('Server err.')
    }
    res.redirect('/students')
  })
})

// 渲染编辑页面
router.get('/students/edit', function (req, res) {
  // 1.在客户端的列表页中处理链接问题（需要有id参数）
  // 2.获取要编辑的学生id
  // 3.渲染编辑页面
  //   根据 id 将学生信息查出来
  //   使用模板引擎渲染页面
  Students.findById(parseInt(req.query.id), function (err, student) {
    if (err) {
      return res.status(500).send('Server err.')
    }
    // console.log(student);
    res.render('edit.html', {
      student: student
    })
  })
})

// 处理编辑请求
router.post('/students/edit', function (req, res) {
  // 1.获取表单数据
  //    req.body
  // 2.更新
  //    Student.updateById
  // 3.发送响应
  Students.updateById(req.body, function (err) {
    if (err) {
      return res.status(500).send('Server err.')
    }
    res.redirect('/students')
  })
})

// 处理删除请求
router.get('/students/delete', function (req, res) {
  // 1.获取要删除的id
  // 2.根据id执行删除操作
  // 3.根据操作结果发送响应数据
  // console.log(req.query.id);
  Students.delete(req.query.id, function (err) {
    if (err) {
      return res.status(500).send('Server err.')
    }
    res.redirect('/students')
  })
})

// 3.把 router 导出
module.exports = router





