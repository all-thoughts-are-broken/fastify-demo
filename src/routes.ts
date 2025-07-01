import { FastifyInstance } from 'fastify'
import { getRandomAnime } from '@/controllers'
import { animeClipsQuerySchema, animeClipsResponseSchema } from '@/schemas'

export default async (app: FastifyInstance): Promise<void> => {
	app.get(
		'/anime-clips/random',
		{
			schema: {
				querystring: animeClipsQuerySchema,
				response: {
					200: animeClipsResponseSchema
				}
			}
		},
		getRandomAnime
	)
}
