var fs = require('fs');

// wirteFile方法有三个参数：
// 第一个参数：文件路径
// 第二个参数：文件内容
// 第三个参数：回调函数：
//            -成功：
//                文件写入成功
//                error null
//            -失败：
//                文件写入失败 
//                error 错误对象
fs.writeFile('./data/你好.txt', '大家好，我是NodeJs', function (data) {
  // console.log('文件写入成功');
  if (data) {
    console.log('写入失败');
  } else {
    console.log('写入成功');
  }
} );
