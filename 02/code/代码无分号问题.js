function foo () {
  console.log('hello world');
}

// TypeError: foo(...) is not a function
foo()

;(function () {
  console.log('hello');
})()

// 当采用了无分号代码风格的时候，只需要注意一下三种情况就不会出现以上问题
//  当一行代码以() [] ``开头的时候，则在前面补上一个分号，可避免一些语法解析错误
//  同时有时也可使用！ &等