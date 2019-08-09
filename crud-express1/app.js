/**
  app.js入门模块
  职责：
      创建服务
      做一些服务相关的配置
        模板引擎
        body-parser解析表单post请求体
        提供静态资源服务
      挂载路由
      监听端口启动服务
*/

var express = require('express')
var router = require('./router')
var bodyParser = require('body-parser')

var app = express()

app.use('/node_modules/',express.static('./node_modules/'))
app.use('/public/',express.static('./public/'))

app.engine('html',require('express-art-template'))

//配置模板引擎和body-parser 一定要在app.use(router)挂载路由之前
app.use(bodyParser.urlencoded({ extended:false }))
app.use(bodyParser.json())



//把路由容器挂载到app服务中
app.use(router)

app.listen(5000,function(){
	console.log('running 5000')
})


