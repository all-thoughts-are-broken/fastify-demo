import { FastifyRequest, FastifyReply } from 'fastify'
import { getAnime, getImage } from '@/services'
import { AnimeClipsQuery, AnimeImagesQuery } from '@/types'

export async function getRandomAnime(
	req: FastifyRequest<{ Querystring: AnimeClipsQuery }>,
	reply: FastifyReply
) {
	const { count = 1, response_type = 'stream' } = req.query
	const result = await getAnime(count, response_type)
	if (response_type === 'json') {
		reply.type('application/json')
		return {
			code: 200,
			msg: '请求成功',
			data: result
		}
	} else {
		reply.type('video/mp4')
		return result
	}
}

export async function getRandomImage(
	req: FastifyRequest<{ Querystring: AnimeImagesQuery }>,
	reply: FastifyReply
) {
	const { count = 1, response_type = 'stream' } = req.query
	const result = await getImage(count, response_type)
	if (response_type === 'json') {
		reply.type('application/json')
		return {
			code: 200,
			msg: '请求成功',
			data: result
		}
	} else {
		reply.type('image/png')
		return result
	}
}
