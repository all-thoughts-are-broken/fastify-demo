import config from '@/config'
import { FastifyRequest, FastifyReply, FastifyError } from 'fastify'
import sharp from 'sharp'
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

/**
 * 压缩图片
 * @param image 图片Buffer
 * @param quality 压缩质量
 */
export async function processImage(image: Buffer, quality: number) {
	try {
		return await sharp(image)
			.resize(800, null, {
				withoutEnlargement: true
			})
			.jpeg({
				quality: quality,
				progressive: true,
				force: false
			})
			.toBuffer()
	} catch (error) {
		console.error(error)
		throw new Error('图片压缩失败')
	}
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
