'use client'

import { useQuery } from '@tanstack/react-query'
import { PenSquare } from 'lucide-react'
import Link from 'next/link'
import { redirect } from 'next/navigation'

import { useUserProfile } from '@/hooks/useUserProfile'

import { PostService } from '@/services/post.service'

import PostCard from '../PostCard'
import { Button } from '../ui/button'
import { Loader } from '../ui/loader'

export default function UserPosts() {
	const { data, isLoading } = useUserProfile()
	const { data: posts } = useQuery(
		['user_posts'],
		() => PostService.getUserPosts(data?.id as string),
		{
			enabled: !!data?.id
		}
	)

	if (isLoading) {
		return <Loader />
	}

	if (data && !data.isWriter) {
		redirect('/')
	}
	return posts?.length === 0 ? (
		<div className='flex flex-col gap-3'>
			<span>You don&apos;t have any posts yet</span>
			<Button asChild>
				<Link href='/new-post' className='flex items-center gap-3'>
					<PenSquare className='w-5 h-5' />
					<span>Write your first post</span>
				</Link>
			</Button>
		</div>
	) : (
		<div className='flex items-center gap-5 flex-wrap justify-center'>
			{posts?.map(item => <PostCard {...item} key={item.id} />)}
		</div>
	)
}
