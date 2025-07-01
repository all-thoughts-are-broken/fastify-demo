import fp from 'fastify-plugin'
import cors from '@fastify/cors'
import staticPlugin from '@fastify/static'
import path from 'path'

export default fp(async (fastify) => {
	// 注册cors插件
	await fastify.register(cors, {
		origin: '*', // 允许所有域名访问
		methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH', 'HEAD'], // 允许所有常用方法
		allowedHeaders: [
			'Content-Type',
			'Authorization',
			'X-Requested-With',
			'Accept',
			'Origin'
		], // 常见头 + 按需添加
		exposedHeaders: [], // 通常公开API不需要暴露特殊头，除非有特定需求
		credentials: false, // 重要！公开API通常不需要携带Cookie等凭证
		maxAge: 86400, // 预检请求缓存24小时 (86400秒)，提升性能
		preflightContinue: false, // 保持默认，让插件处理OPTIONS请求
		optionsSuccessStatus: 204 // 保持默认的204状态码
	})
	// 注册static插件
	await fastify.register(staticPlugin, {
		root: path.join(__dirname, '../public'), // 静态文件根目录
		redirect: true // 目录结尾斜杠自动重定向
	})
})
