/* 
fs是file-system的缩写，就是文件系统的意思
在Node中如果想要进行文件操作，就必须引入fs这个核心模块
在fs这个核心模块中，就提供了所有的文件操作的相关的API 
例如：fs.readFile就是用来读取文件的
*/

// 1.使用require方法加载fs核心模块
var fs = require('fs');

// 2.读取文件
//  第一个参数是要读取的文件路径
//  第二个参数是一个回调函数，回调函数内有里有两个参数error，data
//      -成功：
//          data 数据
//          error null
//      -失败：
//          data undefined
//          error 错误对象
// 在这里通过error判断是否有错误发生
fs.readFile('./data/a.txt', function (error, data) {
  if (error) {
    console.log('文件读取失败');
  } else {
    console.log(data.toString());
  }
})