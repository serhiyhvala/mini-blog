'use client'

import { PenSquare } from 'lucide-react'
import Link from 'next/link'

import { useUserProfile } from '@/hooks/useUserProfile'

import { Button } from '../ui/button'
import { Loader } from '../ui/loader'

export default function HomePage() {
	const { data, isLoading } = useUserProfile()
	return isLoading ? (
		<Loader />
	) : (
		<div className='flex flex-col gap-10'>
			{data?.isWriter && (
				<div className='flex items-center gap-5'>
					<Button asChild>
						<Link className='flex items-center gap-2' href='/new-post'>
							<PenSquare className='w-5 h-5' />
							<span>Write new post</span>
						</Link>
					</Button>
					<Button asChild>
						<Link href='/my-posts'>My posts</Link>
					</Button>
				</div>
			)}
		</div>
	)
}
