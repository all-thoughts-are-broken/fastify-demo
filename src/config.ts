import { AppConfig } from '@/types'

const devConfig: AppConfig = {
	env: 'development',
	domain: '',
	port: 3000
}
devConfig.domain = `http://localhost:${devConfig.port}`

const prodConfig: AppConfig = {
	env: 'production',
	port: 3000,
	domain: 'https://api.x-mirai.com'
}

const env = process.env.NODE_ENV || 'development'

const configMap: Record<string, AppConfig> = {
	development: devConfig,
	production: prodConfig
}

const config: AppConfig = configMap[env]

export default config
