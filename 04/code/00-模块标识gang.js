var fs = require('fs')

// 我们所使用的所有的文件操作的 API 都是异步的
// 就像 AJAX
// 文件操作中的相对路径可以省略  ./ ,但是模块不能
//  ./data/a.txt  相对于当前目录
//  data/a.txt    相对于当前目录
//  /data/a/txt   当前磁盘根目录
//  c:/xx/xx...   绝对路径
fs.readFire('data/a.txt', function (err, data) {
  if (err) {
    return console.log('读取失败');
  }
  console.log(data.toString());
})


// 在模块加载中，相对路径中的   ./不能省略
require('./data/foo.js')('hello')