// 在每个文件模块中都提供了一个对象，exports
// exports默认是一个空对象
// 可以将所有需要被外部访问的成员通过exports导出
var res = require('./b')
console.log(res.foo);

res.readFile('./a')