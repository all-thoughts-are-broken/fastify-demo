import { Static } from '@sinclair/typebox'
import { animeClipsQuerySchema, animeImagesQuerySchema } from '@/schemas'

export interface AppConfig {
	env: 'development' | 'production'
	domain: string
	port: number
}

export type AnimeClipsQuery = Static<typeof animeClipsQuerySchema>
export type AnimeImagesQuery = Static<typeof animeImagesQuerySchema>
