/**
 * student.js
 * 数据操作文件模块
 *    在每次访问路由时，我们都得使用fs.readfile读一次文件，使得代码冗余，增大代码量，所以可将
 *    操作文件的代码部分封装在一个函数中，再将其导出
 * 职责：操作文件中的数据，不关心业务
 */
var fs = require('fs')

var dbPath = './db.json'

/**
 * 获取所有学生列表
 * callback中的参数
 *    第一个参数是 err
 *        成功是  null
 *        失败是  错误对象
 *    第二个参数是 结果
 *        成功是  数组
 *        失败是  undefined
 * return[]
 */
exports.find = function (callback) {
  fs.readFile(dbPath, function (err, data) {
    if (err) {
      return callback(err)
    }
    callback(null, JSON.parse(data).students)
  })
}




/**
 * 添加保存学生
 */
exports.save = function (student, callback) {
  fs.readFile(dbPath, function (err, data) {
    if (err) {
      return callback(err)
    }

    // 将students数据字符串转成对象
    var students = JSON.parse(data).students
    // 处理id，不重复
    student.id = students[students.length - 1].id + 1
    // 把用户传递的对象保存到数组中
    students.unshift(student)

    // 将对象数据转换为字符串
    var fileData = JSON.stringify({
      students: students
    })

    // 将最后得到的数据写进db.json文件中
    fs.writeFile(dbPath, fileData, function (err) {
      if (err) {
        return callback(err)
      }
      callback(null) 
    })
  })
}

/**
 * 根据 id 获取学生信息对象
 * @param {Number}}   id         学生id
 * @param {function}  callback   回调函数
 */
exports.findById = function (id, callback) {
  fs.readFile(dbPath, function (err, data) {
    if (err) {
      return callback(err)
    }
    var students = JSON.parse(data).students
    // 使用find方法对students进行遍历，当符合传入的 id=students.id 时返回遍历项保存在itemData
    var itemData = students.find(function (item) {
      return item.id === parseInt(id)
    })
    callback(null, itemData)
  })
}

/**
 * 更新学生
 */
exports.updateById = function (student, callback) {
  fs.readFile(dbPath, function (err, data) {
    if (err) {
      return callback(err)
    }

    // 将students数据字符串转成对象
    var students = JSON.parse(data).students

    // 注意：这里将 id 统一改成了数值类型
    student.id = parseInt(student.id)

    // console.log(students);
    // ES6中的数组方法find()也可进行遍历，需要接收一个函数作为参数
    // 当某个遍历项符合 item.id === student.id 条件时，find会终止遍历，同时返回遍历项
    var stus = students.find(function (item) {
      return item.id === student.id
    })
    
    // 遍历传进来的项，并将原数据覆盖
    for (var key in student) {
      stus[key] = student[key]
    }
    // 将对象数据转换为字符串
    var fileData = JSON.stringify({
      students: students
    })
    // 将最后得到的数据写进db.json文件中
    fs.writeFile(dbPath, fileData, function (err) {
      if (err) {
        return callback(err)
      }
      callback(null)
    })
  })
}




/**
 * 删除学生
 */
exports.delete = function (student, callback) {
  fs.readFile(dbPath, function (err, data) {
    if (err) {
      return callback(err)
    }
    var students = JSON.parse(data).students
    student = parseInt(student)

    // ES6中的数组方法find()也可进行遍历，需要接收一个函数作为参数
    // 当某个遍历项符合 item.id === student.id 条件时，find会终止遍历，同时返回遍历项
    // var stus = students.find(function (item) {
    //   return item.id === student
    // })
    var deleteId = students.findIndex(function(item) {
      return item.id === student
    })
    // console.log(deleteId);
    delete_data = students.splice(deleteId, 1)
    // del_students = students.splice(students.findIndex(e => e.id === student), student)

    // 将对象数据转换为字符串
    var fileData = JSON.stringify({
      students: students
    })
    // 将最后得到的数据写进db.json文件中
    fs.writeFile(dbPath, fileData, function (err) {
      if (err) {
        return callback(err)
      }
      callback(null)
    })
  })
}