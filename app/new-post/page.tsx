import { Metadata } from 'next'

import NewFormPost from '@/components/NewPostForm'

import { joinTitle } from '@/utils/joinTitle'

export const metadata: Metadata = {
	title: joinTitle('New Post')
}

export default function NewPostPage() {
	return (
		<div className='flex flex-col items-center gap-10'>
			<span className='text-3xl font-bold'>Create new Post</span>
			<NewFormPost />
		</div>
	)
}
