'use client'

import Image from 'next/image'

import { useUserProfile } from '@/hooks/useUserProfile'

import ProfileForm from '../ProfileForm'
import { Loader } from '../ui/loader'

export default function UserProfile() {
	const { data, isLoading, refetch } = useUserProfile()
	return isLoading || !data ? (
		<Loader />
	) : (
		<div className='flex items-center flex-col gap-5'>
			<Image
				src={data.image as string}
				alt='User Avatar'
				width={100}
				height={100}
				className='rounded'
			/>
			<ProfileForm data={data} />
		</div>
	)
}
