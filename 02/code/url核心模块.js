var url = require('url')
var urlStr = url.parse('/pinglun?name=三番四复&message=大富大贵的', true)
// 方法说明：
// 使用 url.parse() 方法将路径解析为一个方便操作的对象。
// 第二个参数为 true 表示直接将查询字符串转为一个对象（ 通过query属性来访问）， 默认第二个参数为false。


console.log(urlStr);
/* Url {
  protocol: null,
  slashes: null,
  auth: null,
  host: null,
  port: null,
  hostname: null,
  hash: null,
  search: '?name=三番四复&message=大富大贵的',
  query: 'name=三番四复&message=大富大贵的',
  pathname: '/pinglun',
  path: '/pinglun?name=三番四复&message=大富大贵的',
  href: '/pinglun?name=三番四复&message=大富大贵的'
} */

/* Url {
  protocol: null,
  slashes: null,
  auth: null,
  host: null,
  port: null,
  hostname: null,
  hash: null,
  search: '?name=三番四复&message=大富大贵的',
  query: [Object: null prototype] { name: '三番四复', message: '大富大贵的' },
  pathname: '/pinglun',
  path: '/pinglun?name=三番四复&message=大富大贵的',
  href: '/pinglun?name=三番四复&message=大富大贵的'
} */