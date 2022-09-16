var foo = 'bar'

function add(x, y) {
  return x + y
}


// 只能得到我想要给你的成员
// 这样做的目的是解决变量命名冲突的问题
// exports.add = add


// exports是一个对象
// 可以通过多次为这个对象添加成员实现
// exports.str = 'hello'

// 如果某个模块需要导出某个成员，而非挂载的方式
// 使用下面这种方式
module.exports = add