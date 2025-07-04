import { FastifyInstance } from 'fastify'
import { getRandomAnime, getRandomImage } from '@/controllers'
import {
	animeClipsQuerySchema,
	animeClipsResponseSchema,
	animeImagesQuerySchema,
	animeImagesResponseSchema
} from '@/schemas'

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
	app.get(
		'/anime-images/random',
		{
			schema: {
				querystring: animeImagesQuerySchema,
				response: {
					200: animeImagesResponseSchema
				}
			}
		},
		getRandomImage
	)
}
