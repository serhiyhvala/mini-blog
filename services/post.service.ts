import * as z from 'zod'

import { postSchema } from '@/components/NewPostForm'

import { supabase } from '@/config/supabase.config'

interface ICreateNewPost {
	values: z.infer<typeof postSchema>
	userId: string
}

export const PostService = {
	createNewPost: async ({ values, userId }: ICreateNewPost) => {
		return await supabase.from('post').insert({
			title: values.title,
			image: values.image.info.secure_url,
			description: values.description,
			userId
		})
	}
}
