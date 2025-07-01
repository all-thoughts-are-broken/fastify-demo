import { FastifyRequest, FastifyReply } from 'fastify'
import { getAnime } from '@/services'
import { AnimeClipsQuery } from '@/types'

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
