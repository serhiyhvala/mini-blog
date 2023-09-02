import { Metadata } from 'next'

import UserPosts from '@/components/UserPosts'

import { joinTitle } from '@/utils/joinTitle'

export const metadata: Metadata = {
	title: joinTitle('My Posts')
}

export default function MyPosts() {
	return (
		<div className='flex flex-col gap-10 items-center'>
			<span className='text-3xl font-bold'>My Posts</span>
			<UserPosts />
		</div>
	)
}
