'use client'

import { useQuery } from '@tanstack/react-query'

import { CommentService } from '@/services/comment.service'

import { convertData } from '@/utils/convertData'
import { cropText } from '@/utils/cropText'

interface ICommentsProps {
	postId: string
}

export default function Comments({ postId }: ICommentsProps) {
	const { data } = useQuery(['comments_post'], () =>
		CommentService.getCommentsForPost(postId)
	)
	return (
		<div className='flex items-center justify-center flex-col gap-5'>
			{data && data.length === 0 ? (
				<span>This post don&apos;t have comments yet</span>
			) : (
				<div className='flex flex-col gap-5 w-full'>
					<span className='text-3xl font-bold'>Comments</span>
					<div className='flex flex-col gap-3'>
						{data?.map(item => (
							<div
								className='flex justify-between items-center gap-3 bg-gray-600 rounded-xl w-full p-4 text-gray-300'
								key={item.id}
							>
								<div className='flex flex-col gap-3'>
									<span>User Id: {cropText(item.id, 14)}</span>
									<span>{item.comment}</span>
								</div>
								<span>{convertData(item.created_at)}</span>
							</div>
						))}
					</div>
				</div>
			)}
		</div>
	)
}
