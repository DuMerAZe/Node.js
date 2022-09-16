// 引入文件操作模块
var fs = require('fs')

// 获取当前机器的信息
console.log(os.cpus());

// memory 内存
console.log(os.totalmem());

// 用来获取机器信息
var path = require('path')

// 获取一个路径的拓展名部分
// extname  (extention name)
console.log(path.extname('c:/a/b/c/d/hello.txt'));