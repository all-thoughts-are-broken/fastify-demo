import config from '@/config'
import { FastifyRequest, FastifyReply, FastifyError } from 'fastify'
/**
 * 生成指定范围随机整数
 * @param min 最小数
 * @param max 最大数
 */
export function generateRandomInteger(min: number, max: number): number {
	return Math.floor(Math.random() * (max - min + 1)) + min
}

export function getStaticFileUrl(path: string): string {
	const baseUrl = config.domain
	return `${baseUrl}${path}`
}

export function errorHandler(
	error: FastifyError,
	request: FastifyRequest,
	reply: FastifyReply
) {
	const statusCode = error.statusCode || 500

	const response = {
		code: statusCode,
		message: '请求失败',
		error: error.name
	}

	request.log.error(error)
	reply.status(statusCode).send(response)
}
