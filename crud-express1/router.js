/**
  router.js路由模块
  职责：
      处理路由
      根据不同的请求方法+请求路径设置具体的请求函数
*/

var fs = require('fs')
var Student = require('./student')

//Express 提供了一种更好的方式，专门用来包装路由的
var express = require('express')
// 1.创建一个路由容器
var router = express.Router()
// 2. 把路由都挂载到router路由容器中
router.get('/students',function(req,res){
 	

	Student.find(function(err,students){
		if (err) {
			return res.status(500).send('Server error.')
		}
	res.render('index.html',{
		fruits:[
			'西瓜',
			'橙子',
			'苹果',
			'柚子'
		],
		
		students: students
	})
  })
})

router.get('/students/new',function(req,res){
	res.render('new.html')

})

//处理添加学生
router.post('/students/new',function(req,res){
	// 1.获取表单数据
	// 2.处理(将数据保存到db.json文件中用以持久化)
	// 3.发送响应（1@先读取出来，转成对象2@然后往对象中push数据3@然后往对象中push数据4@再把对象转为字符串，写入文件）
	console.log(req.body)
	Student.save(req.body,function(err){
		if (err) {
			return res.status(500).send('Server error')
		}
		res.redirect('/students')
	})
 
})

/*
 * 渲染编辑学生页面
 */
router.get('/students/edit',function(req,res){
	//1.在客户端的列表页中处理链接问题（需要有id参数）
	//2.获取要编辑的学生id
	//3.渲染编辑页面(根据id把学生信息查出来，使用模板引擎渲染页面)
	Student.findById(parseInt(req.query.id),function(err,student){
		if (err) {
		  return res.status(500).send('Server error.')
		}
		res.render('edit.html',{
			student:student
		})
	})


})

//处理编辑学生
router.post('/students/edit',function(req,res){
	//1.获取表单数据
	// req.body
	//2.更新
	// Student.update()
	//3.发送响应
	Student.updateById(req.body,function(err){
		if (err) {
			return res.status(500).send('Server error.')
		}
		res.redirect('/students')
	})
 
})

//处理删除学生
router.get('/students/delete',function(req,res){
	//1.获取要删除的id
	//2.根据id执行删除操作
	//3.根据操作结果发送响应数据
	 
	Student.deleteById(req.query.id,function(err){
		if (err) {
			return res.status(500).send('Server error.')
		}
		res.redirect('/students')
	})

})

 

// 3.把router导出
module.exports = router