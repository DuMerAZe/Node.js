// 如果要获取一个函数中异步操作的结果，则必须通过回调函数来获取
// 回调函数：获取异步操作的结果


// 提出需求：调用fn，得到内部的data
function fn(callback) {

  // 这种方式最外层函数无法获得异步操作里面的数据 
  // setTimeout(function () {
  //   var data = 'hello'
  //   return data
  // }, 1000)     
  // --输出undefined
  
  setTimeout(function () {
    var data = 'hello'
    callback(data)
  })

}

fn(function (data) {
  console.log(data)
})
