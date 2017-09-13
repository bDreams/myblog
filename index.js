var path = require('path')
var express = require('express')
var session = require('express-session')
var MongoStore = require('connect-mongo')(session)
var flash = require('connect-flash')
var config = require('config-lite')(__dirname)
var routes = require('./routes')
var pkg = require('./package')

var app = express()




// 设置目录模板
app.set('views', path.join(__dirname, 'views'))

// 设置模板引擎为ejs
app.set('view engine', 'ejs')

// 设置静态文件目录
app.use(express.static(path.join(__dirname, 'public')))

// session 中间件
app.use(session({
  name: config.session.key, // 设置cookie中保存的 session id的字段名称
  secret: config.session.secret, // 通过设置 secret 来计算 hash 值并放在 cookie 中，使产生的 signedCookie 防篡改
  resave: true, // 强制更新 session
  saveUnintialized: false, // 设置为false，强制创建一个session， 即使用户未登录
  cookie: {
    maxAge: config.session.maxAge // 过期时间，过期后cookie的session id 自动删除
  },
  store: new MongoStore({ // 将session存储到mongodb
    url: config.mongodb
  })
}))

// flash中间件，用来显示通知
app.use(flash())

// 路由
routes(app)

// 监听端口，启动程序
app.listen(config.port, function() {
  console.log(`${pkg.name} listening on port ${config.port}`)
})