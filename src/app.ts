import buildServer from '@/server'
import config from '@/config'

const start = async () => {
	const app = buildServer()
	try {
		await app.listen({
			port: config.port,
			host: '0.0.0.0'
		})
		console.log(`Server running at ${config.port}`)
	} catch (err) {
		console.error(err)
		process.exit(1)
	}
}

void start()
