import * as z from 'zod'

import { postSchema } from '@/components/NewPostForm'

import { supabase } from '@/config/supabase.config'

interface ICreateNewPost {
	values: z.infer<typeof postSchema>
	userId: string
}

export const PostService = {
	getAllPosts: async () => {
		const { data } = await supabase.from('post').select()
		return data
	},
	getPostById: async (postId: string) => {
		const { data } = await supabase
			.from('post')
			.select()
			.eq('id', postId)
			.single()
		return data
	},
	getUserPosts: async (userId: string) => {
		const { data } = await supabase.from('post').select().eq('userId', userId)
		return data
	},
	createNewPost: async ({ values, userId }: ICreateNewPost) => {
		return await supabase.from('post').insert({
			title: values.title,
			image: values.image.info.secure_url,
			description: values.description,
			userId
		})
	}
}
