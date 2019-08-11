var express = require ('express')
var User = require('./models/user')

//引入给密码加密的包
var md5 = require('blueimp-md5')


var router = express.Router()

router.get('/',function(req,res,next){
 
	res.render('index.html',{user: req.session.user})
})

router.get('/login',function(req,res,next){
	res.render('login.html')
})

router.post('/login',function(req,res,next){
	// 1 获取表单数据

	//2 查询数据库用户名密码是否正确

	//3 发送响应数据

    //在服务器端看看是否收到客户端提交的数据
	//console.log(req.body)
	var body = req.body

	User.findOne({
		email: body.email,
		password: md5(md5(body.password))
	},function(err,user){
		if (err) {
			return next(err)
		}

		if (!user) {
			return res.status(200).json({
				err_code: 1,
				message: 'Email or password is invalid.'
			})
		}
		// 用户存在，登录成功，通过Session 记录登录状态
		req.session.user =user

		res.status(200).json({
			err_code: 0,
			message:'OK'
		})
	})
})

router.get('/register',function(req,res,next){
	res.render('register.html')
})

router.post('/register',function(req,res,next){
	 // 1.获取表单提交的数据(req.body)
	 // 2.操作数据库(判断该用户是否存在，如果已存在，不允许注册，如果不存在，注册用户)
	 // 3.发送响应
	 var body = req.body
	 User.findOne({
	 	$or:[
          {
          	email: body.email
          },
          {
          	nickname: body.nickname
          }
	 	]
	 },function(err,data){
	 	if (err) {
	 		return next(err)
	 	}
	 	//console.log(data)
	 	if (data) {
	 		//邮箱或者昵称已存在
	 		return res.status(200).json({
	 			err_code: 1,
	 			message: 'Email or nickname aleady exists.'
	 		})
	 	}


        //对密码进行md5 重复加密
        body.password = md5(md5(body.password))


	 	new User(body).save(function(err,user){
	 		if (err) {
	 			return next(err)
	 		}

         // 注册成功，使用Session记录用户的登录状态
         req.session.user = user

	 		//Express 提供了一个响应方法：json
	 	//该方法接受一个对象作为参数，它会自动帮你把对象转为字符串再发送给浏览器
	 	res.status(200).json({
	 		err_code: 0,
	 		message: 'OK'
	 		 
	 	})
	 	})

	 	
	 })
})

//请求退出页面
router.get('/logout',function(req,res,next){
	//清除登录状态
	req.session.user = null
	//重定向到登录页面
	res.redirect('/login')
})

//请求设置页面
router.get('/settings/profile',function(req,res,next){
	
	res.render('settings/profile.html')
})
//请求个人主页
router.get('/settings/admin',function(req,res,next){
	res.render('settings/admin.html')
})

module.exports = router