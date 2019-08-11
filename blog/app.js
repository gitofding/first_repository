var express = require('express')
var path = require('path')
var bodyParser = require('body-parser')
var session = require('express-session')
var router = require('./router.js')

var app = express()

app.use('/public/', express.static(path.join(__dirname, './public/')))
app.use('/node_modules/', express.static(path.join(__dirname, './node_modules')))






//在Node中，有很多第三方模板引擎都可以使用，不是只有art-template
//如 ejs,jade(pug),handlebars
app.engine('html', require('express-art-template'))
app.set('views', path.join(__dirname, './views/')) //默认就是 ./views目录


// 配置解析表单POST请求体插件（注意：一定要在app.use(router)之前）
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())



//使用第三方插件express-session来支持Session 和 Cookie（注意：一定要在app.use(router)之前）
app.use(session({
	//配置加密字符串，它会在原有加密基础之上和这个字符串拼起来去加密
	//（增加安全性，防止客户端恶意伪造）
	secret:'itcast', 
	resave: false,
	//无论是否使用Session，服务器都默认分配一把钥匙
	saveUninitialized: false
}))


//把路由挂载到app中
app.use(router)

//配置一个处理404的中间件
app.use(function(req,res){
	res.render('404.html')
})

//配置一个全局错误处理中间件
app.use(function(err,req,res,next){
	res.status(500).json({
		err_code:500,
		message:err.message
	})
})
app.listen(3000, function() {
    console.log('3000 running...........')
})

 