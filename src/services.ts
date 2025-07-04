import fs from 'fs'
import path from 'path'
import { generateRandomInteger, getStaticFileUrl, processImage } from '@/utils'

let animeClipsFileList: string[] = []
let animeImageFileList: string[] = []
const animeClipsFilePath = path.join(__dirname, '../public/anime')
const animeImageFilePath = path.join(__dirname, '../public/image')
const MAX_COUNT = 10

export async function getAnime(count: number, type: string) {
	if (animeClipsFileList.length === 0) {
		animeClipsFileList = await fs.promises.readdir(animeClipsFilePath)
	}
	// 处理一下count
	count = Math.max(1, Math.min(count, MAX_COUNT, animeClipsFileList.length))
	if (type === 'stream') {
		const randomFile =
			animeClipsFileList[generateRandomInteger(0, animeClipsFileList.length - 1)]
		return fs.createReadStream(path.join(animeClipsFilePath, randomFile))
	}
	// 随机获取不重复的文件
	const shuffled = [...animeClipsFileList].sort(() => Math.random() - 0.5)
	return shuffled.slice(0, count).map((file) => getStaticFileUrl(`/anime/${file}`))
}

export async function getImage(count: number, type: string, quality?: number) {
	if (animeImageFileList.length === 0) {
		animeImageFileList = await fs.promises.readdir(animeImageFilePath)
	}
	// 处理一下count
	count = Math.max(1, Math.min(count, MAX_COUNT, animeImageFileList.length))
	if (type === 'stream') {
		const randomFile =
			animeClipsFileList[generateRandomInteger(0, animeImageFileList.length - 1)]
		return fs.createReadStream(path.join(animeImageFilePath, randomFile))
	}
	// 随机获取不重复的文件
	const shuffled = [...animeImageFileList].sort(() => Math.random() - 0.5)
	return shuffled.slice(0, count).map((file) => getStaticFileUrl(`/image/${file}`))
}
