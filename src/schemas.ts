import { Type } from '@sinclair/typebox'
import { Readable } from 'stream'

// 定义通用JSON Schema
export const baseJsonResponseSchema = Type.Object({
	// 响应状态码
	code: Type.Number(),
	// 相应的消息
	msg: Type.String(),
	// 相应的数据
	data: Type.Any(),
	// 错误信息（如果有）
	error: Type.Optional(Type.String())
})

// 定义二进制流的自定义 Schema
export const binaryStreamSchema = Type.Unsafe<Readable>({
	type: 'object',
	description: 'Node.js Readable Stream'
})

export const baseResponseSchema = Type.Union([baseJsonResponseSchema, binaryStreamSchema])

// 随机漫剪schema
export const animeClipsResponseSchema = Type.Intersect([
	baseResponseSchema,
	Type.Object({
		data: Type.Array(Type.String())
	})
])

// 随机漫剪的参数schema
export const animeClipsQuerySchema = Type.Object({
	// 漫剪的数量
	count: Type.Optional(Type.Number()),
	// 相应的类型
	response_type: Type.Optional(Type.String())
})
