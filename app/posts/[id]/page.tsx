import { Metadata } from 'next'

import Post from '@/components/Post'

import { joinTitle } from '@/utils/joinTitle'

interface IPostPage {
	params: {
		id: string
	}
}

export const metadata: Metadata = {
	title: joinTitle('Post')
}

export default function PostPage({ params }: IPostPage) {
	const { id } = params
	return <Post postId={id} />
}
