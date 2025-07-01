import fs from 'fs'
import path from 'path'
import { generateRandomInteger, getStaticFileUrl } from '@/utils'

let animeClipsFileList: string[] = []
let imageClipsFileList: string[] = []
const animeClipsFilePath = path.join(__dirname, '../public/anime')
const imageClipsFilePath = path.join(__dirname, '../public/image')
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
	// 数组随机排序尽可能减少获取到重复文件的可能
	const shuffled = [...animeClipsFileList].sort(() => Math.random() - 0.5)
	return shuffled.slice(0, count).map((file) => getStaticFileUrl(`/anime/${file}`))
}

// todo
// export async function getImage(count: number, type: string) {
// 	if (imageClipsFileList.length === 0) {
// 		animeClipsFileList = await fs.promises.readdir(imageClipsFilePath)
// 	}
// 	// 处理一下count
// 	count = Math.max(1, Math.min(count, MAX_COUNT, imageClipsFileList.length))
// 	if (type === 'stream') {
// 		const randomFile =
// 			animeClipsFileList[generateRandomInteger(0, animeClipsFileList.length - 1)]
// 		return fs.createReadStream(path.join(animeClipsFilePath, randomFile))
// 	}
// 	// 数组随机排序尽可能减少获取到重复文件的可能
// 	const shuffled = [...animeClipsFileList].sort(() => Math.random() - 0.5)
// 	return shuffled.slice(0, count).map((file) => getStaticFileUrl(`/image/${file}`))
// }
