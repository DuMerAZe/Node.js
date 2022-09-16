var fs = require('fs')
// 1.安装art-template
// npm install art-template

// 2.在需要使用的文件模板中加载art-template

// 3.查文档，使用模板引擎的API
// var template = require('art-template')

// 4.template.render('模板字符串',替换对象)

var template = require('art-template')
 
// tem_str = `
// <!DOCTYPE html>
// <html lang="en">
// <head>
//   <meta charset="UTF-8">
//   <meta http-equiv="X-UA-Compatible" content="IE=edge">
//   <meta name="viewport" content="width=device-width, initial-scale=1.0">
//   <title>Document</title>
// </head>
// <body>
//   <p>我叫{{name}}</p>
//   <p>我{{age}}了</p>
//   <p>我住在{{province}}</p>
//   <p>我喜欢:{{each hobbies}}{{$value}}{{/each}}</p>
// </body>
// </html>
// `

fs.readFile('./tem.html', function (err, data) {
  if (err) {
   return console.log('文件读取失败');
  }
  // data默认读取到的是二进制数据
  // 而render方法接收的是字符串
  // 所以需要将data二进制数据转为字符串
  var tem = template.render(data.toString(), {
    name: '张三',
    age: 16,
    province: '北京',
    hobbies: [
      '写代码',
      '看书',
      '听歌'
    ],
    title: '个人信息'
  })
  console.log(tem);
})

