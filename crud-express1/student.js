/**
   student.js
   数据操作文件模块
   职责：操作文件中的数据，只处理数据，不关心业务（怎么获取表单数据，怎么发送响应）
  
*/
var fs = require('fs')
var dbPath = './db.json'
//获取所有学生列表:return []
exports.find = function (callback){
	fs.readFile(dbPath,'utf8',function(err,data){
		if (err) {
			return callback(err)
		}
		callback(null,JSON.parse(data).students)
	})
 

}

/**
  *根据id获取学生信息对象
*/
exports.findById = function(id,callback){
	fs.readFile(dbPath,'utf8',function(err,data){
		if (err) {
			return callback(err)
		}
		var students = JSON.parse(data).students
		var ret = students.find(function(item){
			return item.id === parseInt(id)
		})
		callback(null,ret)
	})
}

//添加保存学生**********封装异步API(重点)
exports.save = function (student,callback){
	fs.readFile(dbPath,'utf8',function(err,data){
		if (err) {
			return callback(err)
		}
		var students = JSON.parse(data).students
		
		//处理 id 唯一
        student.id = students[students.length - 1].id + 1

        //把用户传递的对象保存到数组中
		students.push(student)

		//把对象数据的对象转换为字符串
		var fileData = JSON.stringify({
			students:students
		})

		//把字符串保存到文件中
		fs.writeFile(dbPath,fileData,function(err){
			if (err) {
				//错误就是把错误对象传递给它
				return callback(err)
			}
			//成功没错，所以错误对象是null
			callback(null)
		})
	})
	
}

//更新学生
exports.updateById = function (student,callback){
	fs.readFile(dbPath,'utf8',function(err,data){
		if (err) {
			return callback(err)
		}
		var students = JSON.parse(data).students
	
	//注意：这里记得把id统一转换为数字类型
	student.id = parseInt(student.id)
	//EcmaScript 6 中的一个数组方法：find，需要接收一个函数作为参数，当某个遍历项符合
	//item.id === student.id条件的时候，find会终止遍历，并返回遍历项
	var stu = students.find(function(item){
		return item.id === student.id
	})	
	for (var key in student){
		stu[key] = student[key]
	} 
	//把对象数据的对象转换为字符串
		var fileData = JSON.stringify({
			students:students
		})

		//把字符串保存到文件中
		fs.writeFile(dbPath,fileData,function(err){
			if (err) {
				//错误就是把错误对象传递给它
				return callback(err)
			}
			//成功没错，所以错误对象是null
			callback(null)
		})

})	
}

//删除学生
exports.deleteById = function (id,callback){
	fs.readFile(dbPath,'utf8',function(err,data){
		if (err) {
			return callback(err)
		}
		var students = JSON.parse(data).students
		
		//findIndex方法专门用来根据条件查找元素的下标
		var deleteId = students.findIndex(function(item){
			return item.id === parseInt(id)
		})
		//根据下标从数组中删除对应的学生对象
		students.splice(deleteId,1)

		//把对象数据的对象转换为字符串
		var fileData = JSON.stringify({
			students:students
		})

		//把字符串保存到文件中
		fs.writeFile(dbPath,fileData,function(err){
			if (err) {
				//错误就是把错误对象传递给它
				return callback(err)
			}
			//成功没错，所以错误对象是null
			callback(null)
		})
	
})
}