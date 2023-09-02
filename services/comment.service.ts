import * as z from 'zod'

import { commentSchema } from '@/components/CommentForm'

import { supabase } from '@/config/supabase.config'

interface IWriteComment {
	values: z.infer<typeof commentSchema>
	userId: string
	postId: string
}

export const CommentService = {
	writeComment: async ({ values, userId, postId }: IWriteComment) => {
		return await supabase.from('comment').insert({
			comment: values.comment,
			userId,
			postId
		})
	},
	getCommentsForPost: async (postId: string) => {
		const { data } = await supabase
			.from('comment')
			.select()
			.eq('postId', postId)
		return data
	}
}
