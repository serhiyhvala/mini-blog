import Image from 'next/image'
import Link from 'next/link'

import { convertData } from '@/utils/convertData'
import { cropText } from '@/utils/cropText'

import { Button } from '../ui/button'

import { Tables } from '@/types/database.types'

interface IPostCard extends Tables<'post'> {}

export default function PostCard({
	image,
	title,
	description,
	id,
	created_at
}: IPostCard) {
	return (
		<div className='flex bg-white rounded-xl shadow-lg flex-col max-w-[300px] w-full'>
			<Image
				src={image as string}
				alt={title as string}
				width={300}
				height={200}
				className='rounded-t-xl'
			/>
			<div className='flex flex-col gap-3 p-4'>
				<span>Title: {title}</span>
				<span>Description: {cropText(description as string, 14)}</span>
				<span>Created At: {convertData(created_at)}</span>
				<Button asChild>
					<Link href={`/posts/${id}`}>Read more</Link>
				</Button>
			</div>
		</div>
	)
}
