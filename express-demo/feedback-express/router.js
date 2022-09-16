// 公开public目录
app.use('/public/', express.static('./public/'))


app.get('/', function (req, res) {
  // var parseObj = url.parse(req.url, true)
  // var parseName = parseObj.parseName
  fs.readFile('./views/index1.html', function (err, data) {
    if (err) {
      return res.end('404 Not Found');
    }
    var htmlStr = template.render(data, {
      comments: comments
    })
    res.end(htmlStr)
  })
})


app.get('/post', function (req, res) {
  fs.readFile('./views/post.html', function (err, data) {
    if (err) {
      return res.end('404 Not Found')
    }
    res.end(data)
  })
})
