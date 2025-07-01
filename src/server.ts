import fastify, { FastifyInstance } from 'fastify'
import plugins from '@/plugins'
import routes from '@/routes'
import { errorHandler } from '@/utils'

export default function buildServer(): FastifyInstance {
	const server = fastify({
		logger: true
	})
	// 注册插件
	server.register(plugins)
	// 注册路由
	server.register(routes, {
		prefix: '/api/v1'
	})
	// 错误处理
	server.setErrorHandler(errorHandler)
	return server
}
