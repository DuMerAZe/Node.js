var foo = '猴子'
exports.foo = foo;

exports.readFile = function (path, callback) {
  console.log('文件路径：' , path);
}