module.exports = {
	port: 4000,  // 程序启动要监听的端口号
	// express-session 的配置信息
	session: {
		secret: 'myblog',
		key: 'myblog',
		maxAge: 2592000000
	},
	// mongodb 的地址，myblog 为 db 名
	mongodb: 'mongodb://localhost:27017/myblog'
}