// 在 Node 中，每个模块内部都有一个 module 对象
// 该 module 对象中，有一个成员叫：exports 也是一个空对象
// 也就是说如果你需要对外导出成员，只需要把导出的成员挂载到 module.exports中

// var module = {
//   exports: {

//   }
// }

// module.exports.foo = 'bar'
// module.exports.add = function () {
//   return x + y
// }

// 我们发现每次导出接口成员的时候都是module.exports.xxx = xxx的方式很麻烦
// 为了简化操作，专门提供一个变量：exports 等于  module.exports
// 也就是在模块中console.log(exports === module.exports)   --true
// 说明了两个成员指向同一个对象，而操作的也是同一个对象
// 那么，我们也可以是用任何一方导出内部成员 

// 当一个模块需要导出单个模块的时候
// 直接给 exports 赋值是不管用的
// exports.a = 123
// exports = {}
// exports.foo = 'bar'
// module.exports.b = 456
// --{ a: 123, b: 456 }


// 给 exports 赋值会断开和 module.exports 之间的引用
// module.exports = 'hello'
// exports.foo = 'world'    --hello
// 同理，给 module.exports 重新赋值也会丢失与 exports 之间的引用


// 这里给module.exports重新赋值，导致 exports !== module.exports
// module.exports = {
//   foo: 'bar'
// }

// 而这里又重新建立两者的引用关系
// exports = module.exports
// exports.foo = 'hello'   --hello


// 谁来 require ，谁就得到 module.exports
// 默认在代码的最后有一句：
// 一定要记住，最后 return 的是 mdule.exports,而不是exports
// 所以你给exports重新赋值不管用
return module.exports