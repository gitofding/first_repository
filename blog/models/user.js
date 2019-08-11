var mongoose = require('mongoose')
var Schema = mongoose.Schema

//连接数据库
mongoose.connect('mongodb://localhost/test')

//new 出一个Schema
var userSchema = new Schema({
	//配置数据结构类型(就是在设计你的数据表)
	email: {
		type: String,
		required: true
	},
	nickname: {
		type: String,
		required:true
	},
	password: {
		type: String,
		required:true
	},
	created_time: {
		type: Date,
		//注意，这里不要写Date.now(),因为会即刻调用
		// 这里直接给了一个方法： Date.now
		//当你去new Model的时候，
		//如果你没有传递 created_time ,则mongoose就会调用default 指定的Date.now方法，使用其返回值作为默认值
	    default: Date.now
	},
	last_modified_time:{
         type:Date,
         default:Date.now

	},
	avatar:{
		type:String,
		default:'/public/img/avatar-default.png'
	},
	bio: {
		type: String,
		default: ''

	},
	gender: {
		type: Number,
		enum: [-1,0,1],
		default: -1
	},
	birthday: {
		type: Date
	},
	status:{
		type: Number,
		//0 表示没有权限限制
		// 1表示不可以评论
		// 2 不可以登录
		enum: [0,1,2],
		default:0

	}

})


//发布模型
module.exports = mongoose.model('User',userSchema)
