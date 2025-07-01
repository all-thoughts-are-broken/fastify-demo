import { Static } from '@sinclair/typebox'
import { animeClipsQuerySchema } from '@/schemas'

export interface AppConfig {
	env: 'development' | 'production'
	domain: string
	port: number
}

export type AnimeClipsQuery = Static<typeof animeClipsQuerySchema>
