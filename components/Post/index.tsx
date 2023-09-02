'use client'

import { useQuery } from '@tanstack/react-query'
import { ChevronLeft } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

import { useUserProfile } from '@/hooks/useUserProfile'

import { PostService } from '@/services/post.service'

import { convertData } from '@/utils/convertData'

import CommentForm from '../CommentForm'
import Comments from '../Comments'
import { Button } from '../ui/button'
import { Loader } from '../ui/loader'

interface IPostProps {
	postId: string
}

export default function PostProps({ postId }: IPostProps) {
	const { data: user } = useUserProfile()
	const { data, isLoading } = useQuery(['post_page'], () =>
		PostService.getPostById(postId)
	)

	const router = useRouter()

	if (isLoading) {
		return <Loader />
	}
	return (
		<div className='flex flex-col gap-10'>
			<Button onClick={() => router.back()} className='self-start'>
				<ChevronLeft className='w-6 h-6' />
			</Button>
			<div className='flex flex-col gap-10 justify-center items-center'>
				<Image
					src={data?.image as string}
					alt={data?.title as string}
					width={300}
					height={300}
					className='rounded-xl'
				/>
				<div className='flex flex-col gap-5 justify-center items-center'>
					<span className='text-3xl font-bold'>{data?.title}</span>
					<span className='text-sm text-gray-500'>{data?.description}</span>
					<span className='text-sm text-gray-500'>
						{convertData(data?.created_at as string)}
					</span>
				</div>
			</div>
			<Comments postId={postId} />
			{user && !user.isWriter && (
				<div className='flex items-center justify-center flex-col gap-5'>
					<span className='text-3xl font-bold'>Write comment</span>
					<CommentForm postId={postId} userId={user.id} />
				</div>
			)}
		</div>
	)
}
