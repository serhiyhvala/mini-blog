'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import * as z from 'zod'

import { CommentService } from '@/services/comment.service'

import { Button } from '../ui/button'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '../ui/form'
import { Textarea } from '../ui/textarea'

interface ICommentForm {
	postId: string
	userId: string
}

export const commentSchema = z.object({
	comment: z.string().min(5, {
		message: 'Comment should be at least 5 characters'
	})
})

export default function CommentForm({ postId, userId }: ICommentForm) {
	const queryClient = useQueryClient()
	const { mutate, isLoading } = useMutation({
		mutationFn: CommentService.writeComment,
		onSuccess: () => queryClient.invalidateQueries(['comments_post'])
	})
	const form = useForm<z.infer<typeof commentSchema>>({
		resolver: zodResolver(commentSchema),
		defaultValues: {
			comment: ''
		}
	})

	const handleSubmitForm = (values: z.infer<typeof commentSchema>) => {
		try {
			mutate({
				values,
				postId,
				userId
			})
			form.resetField('comment')
			toast.success('Comments successfully created')
		} catch (error) {
			toast.error('Something went wrong')
		}
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(handleSubmitForm)}
				className='flex flex-col gap-5 max-w-[300px] w-full'
			>
				<FormField
					control={form.control}
					name='comment'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Comment</FormLabel>
							<FormControl>
								<Textarea
									placeholder='Write your comment here'
									{...field}
									className='resize-none'
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type='submit' disabled={isLoading}>
					Comment!
				</Button>
			</form>
		</Form>
	)
}
